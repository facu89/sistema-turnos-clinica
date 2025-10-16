"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { DeleteUserDialog } from "@/components/delete-user-dialog";
import { WideCard } from "@/components/ui/wide-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddAdminUserForm } from "../../components/add-admin-user-form";
interface AdminUser {
  id: string;
  dni_administrativo: string;
  telefono: string | null;
  fecha_nacimiento: string | null;
  tipo_usuario: string;
  created_at: string;
  nombre: string;
  apellido: string;
  // Quitar email de aquí
}

export function TableUsersAdmin() {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para el dialog de confirmación
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    userId: "",
    userName: "",
  });
  const [isDeleting, setIsDeleting] = useState(false);

  const supabase = createClient();

  // Función para abrir el dialog de confirmación
  const openDeleteDialog = (userId: string, userName: string) => {
    setDeleteDialog({
      open: true,
      userId,
      userName,
    });
  };

  // Función para cerrar el dialog
  const closeDeleteDialog = () => {
    setDeleteDialog({
      open: false,
      userId: "",
      userName: "",
    });
  };

  const deleteUserFromAuth = async (userId: string) => {
    try {
      console.log("Llamando a API delete-user con:", userId); // Debug

      const response = await fetch("/api/administrativo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      console.log("Response status:", response.status); // Debug

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error response:", errorText); // Debug
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      console.log("Success:", result); // Debug
      return result;
    } catch (error) {
      console.error("Error en deleteUserFromAuth:", error);
      throw error;
    }
  };

  const deleteAdminUser = async (userId: string) => {
    try {
      setIsDeleting(true);
      setError(null);

      // 1. PRIMERO eliminar de auth.users (esto puede activar CASCADE)
      await deleteUserFromAuth(userId);
      console.log("Usuario eliminado de auth.users:", userId);

      console.log("Usuario administrativo eliminado completamente:", userId);
      loadAdminUsers();
      closeDeleteDialog();
    } catch (error: unknown) {
      console.error("Error al eliminar usuario:", error);
      setError(error instanceof Error ? error.message : "Error inesperado");
    } finally {
      setIsDeleting(false);
    }
  };

  // Función para confirmar eliminación
  const handleConfirmDelete = () => {
    if (deleteDialog.userId) {
      deleteAdminUser(deleteDialog.userId);
    }
  };

  const loadAdminUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Solo consultar profiles_administrativos (sin JOIN a auth.users)
      const { data, error } = await supabase
        .from("profiles_administrativos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setAdminUsers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar usuarios");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAdminUsers();
  }, []);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
          <p>Cargando usuarios...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="w-full max-w-[150vw] mx-auto">
        {" "}
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Usuarios Administrativos</CardTitle>
              <CardDescription>
                Gestiona los usuarios con permisos administrativos del sistema
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <AddAdminUserForm onUserAdded={loadAdminUsers} />
        <CardContent className="p-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              <p className="text-sm">{error}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={loadAdminUsers}
                className="mt-2"
              >
                Reintentar
              </Button>
            </div>
          )}

          {adminUsers.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                No hay usuarios administrativos
              </h3>
              <p className="text-sm text-gray-500">
                Comienza agregando tu primer usuario administrativo
              </p>
            </div>
          ) : (
            <div className="w-full">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Nombre</th>
                      <th className="text-left p-3">DNI</th>
                      <th className="text-left p-3">Teléfono</th>
                      <th className="text-left p-3">Tipo</th>
                      <th className="text-left p-3">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-3">
                          {user.nombre} {user.apellido}
                        </td>
                        <td className="p-3">{user.dni_administrativo}</td>
                        <td className="p-3">{user.telefono || "N/A"}</td>
                        <td className="p-3">{user.tipo_usuario}</td>
                        <td className="p-3">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() =>
                              openDeleteDialog(
                                user.id,
                                `${user.nombre} ${user.apellido}`
                              )
                            }
                            disabled={isDeleting}
                          >
                            Eliminar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              {adminUsers.length} usuario{adminUsers.length !== 1 ? "s" : ""}{" "}
              administrativo{adminUsers.length !== 1 ? "s" : ""}
            </p>
            <Button variant="outline" onClick={loadAdminUsers}>
              Actualizar
            </Button>
          </div>
        </CardContent>
      </Card>
      {/* Dialog de confirmación */}
      <DeleteUserDialog
        open={deleteDialog.open}
        onOpenChange={(open) => !open && closeDeleteDialog()}
        onConfirm={handleConfirmDelete}
        userName={deleteDialog.userName}
        isLoading={isDeleting}
      />
    </>
  );
}
