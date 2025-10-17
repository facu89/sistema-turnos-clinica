import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText } from "lucide-react";

interface ObraSocial {
  id_obra: string;
  descripcion: string;
  telefono_contacto?: string;
  sitioweb?: string;
  fecha_cambio_estado: string;
  estado: string;
  created_at: string;
}

const getObrasSociales = async () => {
  try {
    const response = await fetch("/api/obraSocial", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    throw error;
  }
};

export const ObraSocialTab = () => {
  const [obras, setObras] = useState<ObraSocial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedObra, setSelectedObra] = useState<ObraSocial | null>(null);
  const [nuevaFecha, setNuevaFecha] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const loadObras = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getObrasSociales();
      setObras(data || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeshabilitar = async (id_obra: string, descripcion: string) => {
    try {
      setIsProcessing(true);
      console.log("Deshabilitando obra social:", id_obra, descripcion);
      const response = await fetch(`/api/obraSocial`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id_obra,
          estado: "Deshabilitado",
          fecha_vigencia: null,
          descripcion,
        }),
      });

      if (response.ok) {
        await loadObras();
      } else {
        setError("Error al deshabilitar obra social");
      }
    } catch (error) {
      setError("Error al deshabilitar obra social");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleHabilitar = (obra: ObraSocial) => {
    setSelectedObra(obra);
    setNuevaFecha("");
    setShowDialog(true);
  };

  const handleConfirmHabilitar = async () => {
    if (!selectedObra || !nuevaFecha) {
      setError("La fecha de vigencia es requerida");
      return;
    }

    const fechaSeleccionada = new Date(nuevaFecha);
    const hoy = new Date();
    fechaSeleccionada.setHours(0, 0, 0, 0);
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
      setError("La fecha de vigencia no puede ser anterior a hoy");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      const response = await fetch(`/api/obraSocial`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedObra.id_obra, // ✅ Usar id_obra
          fecha_vigencia: nuevaFecha,
        }),
      });

      if (response.ok) {
        setShowDialog(false);
        setSelectedObra(null);
        setNuevaFecha("");
        await loadObras();
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Error al programar habilitación");
      }
    } catch (error) {
      setError("Error al programar habilitación de obra social");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelDialog = () => {
    setShowDialog(false);
    setSelectedObra(null);
    setNuevaFecha("");
    setError(null);
  };

  useEffect(() => {
    loadObras();
  }, []);

  if (isLoading) {
    return (
      <TabsContent value="obras-sociales" className="space-y-6">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </TabsContent>
    );
  }

  return (
    <TabsContent value="obras-sociales" className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Obras Sociales</h2>
        <Button
          onClick={() =>
            (window.location.href = "/administrativo/obras-sociales/nueva-obra")
          }
        >
          <FileText className="h-4 w-4 mr-2" />
          Registrar Nueva Obra Social
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p className="text-sm">{error}</p>
          <Button
            variant="outline"
            size="sm"
            onClick={loadObras}
            className="mt-2"
          >
            Reintentar
          </Button>
        </div>
      )}

      <div className="grid gap-4">
        {obras.map((obra) => (
          <Card key={obra.id_obra}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{obra.descripcion}</p>
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">
                        Vigencia:{" "}
                        {new Date(
                          obra.fecha_cambio_estado
                        ).toLocaleDateString()}
                      </p>
                      {obra.telefono_contacto && (
                        <p className="text-sm text-muted-foreground">
                          Teléfono: {obra.telefono_contacto}
                        </p>
                      )}
                      {obra.sitioweb && (
                        <p className="text-sm text-muted-foreground">
                          Sitio: {obra.sitioweb}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      obra.estado === "Habilitado"
                        ? "default"
                        : obra.estado === "Pendiente"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {obra.estado}
                  </Badge>

                  {obra.estado === "Habilitado" ? (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() =>
                        handleDeshabilitar(obra.id_obra, obra.descripcion)
                      }
                      disabled={isProcessing}
                    >
                      Deshabilitar
                    </Button>
                  ) : (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleHabilitar(obra)}
                      disabled={isProcessing}
                    >
                      Programar Habilitación
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {obras.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay obras sociales registradas</p>
        </div>
      )}

      {/* Dialog para seleccionar fecha de vigencia */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Programar Habilitación</DialogTitle>
            <DialogDescription>
              Selecciona la fecha desde la cual la obra social
              <strong>
                {" "}
                {selectedObra?.descripcion}, {selectedObra?.id_obra}
              </strong>{" "}
              estará habilitada.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="fecha-vigencia">Fecha de Vigencia</Label>
              <Input
                id="fecha-vigencia"
                type="date"
                value={nuevaFecha}
                onChange={(e) => setNuevaFecha(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
              <p className="text-xs text-gray-500">
                La obra social cambiará automáticamente a "Habilitado" en esta
                fecha
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelDialog}
              disabled={isProcessing}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={handleConfirmHabilitar}
              disabled={!nuevaFecha || isProcessing}
            >
              {isProcessing ? "Programando..." : "Programar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </TabsContent>
  );
};
