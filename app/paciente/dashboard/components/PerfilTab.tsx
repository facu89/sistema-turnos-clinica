import React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PerfilTab = () => {
  // Estado para los datos de contacto
  const [contacto, setContacto] = useState({
    email: "maria.garcia@email.com",
    telefono: "+54 11 1234-5678",
    direccion: "Av. Corrientes 1234, CABA",
  });
  const [editandoContacto, setEditandoContacto] = useState(false);
  const [contactoTemp, setContactoTemp] = useState(contacto);

  return (
    <TabsContent value="perfil" className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mi Perfil</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Nombre Completo
              </label>
              <p className="text-lg">María García</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                DNI
              </label>
              <p className="text-lg">12.345.678</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Fecha de Nacimiento
              </label>
              <p className="text-lg">15/03/1985</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Información de Contacto</CardTitle>
            <CardDescription>Puedes modificar estos datos</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {editandoContacto ? (
              <>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <input
                    className="w-full mt-1 p-2 border rounded-lg"
                    value={contactoTemp.email}
                    onChange={(e) =>
                      setContactoTemp({
                        ...contactoTemp,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Teléfono
                  </label>
                  <input
                    className="w-full mt-1 p-2 border rounded-lg"
                    value={contactoTemp.telefono}
                    onChange={(e) =>
                      setContactoTemp({
                        ...contactoTemp,
                        telefono: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Dirección
                  </label>
                  <input
                    className="w-full mt-1 p-2 border rounded-lg"
                    value={contactoTemp.direccion}
                    onChange={(e) =>
                      setContactoTemp({
                        ...contactoTemp,
                        direccion: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    className="w-full"
                    onClick={() => {
                      setContacto(contactoTemp);
                      setEditandoContacto(false);
                    }}
                  >
                    Guardar
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setContactoTemp(contacto);
                      setEditandoContacto(false);
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <p className="text-lg">{contacto.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Teléfono
                  </label>
                  <p className="text-lg">{contacto.telefono}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Dirección
                  </label>
                  <p className="text-lg">{contacto.direccion}</p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => setEditandoContacto(true)}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Modificar Datos de Contacto
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
};
