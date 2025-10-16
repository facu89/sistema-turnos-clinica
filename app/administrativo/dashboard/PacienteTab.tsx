"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { Users } from "lucide-react";
// import { pacientes } from "@/app/data/Info"; //simula bd
import { useEffect, useState } from "react";

async function getPacientes() {
  try {
    const response = await fetch("/api/paciente", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Error al obtener pacientes");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
}

export default function PacienteTab() {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    const fetchPacientes = async () => {
      const data = await getPacientes();
      setPacientes(data);
    };

    fetchPacientes();
  }, []);

  return (
    <TabsContent value="pacientes" className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Pacientes</h2>
        <Button onClick={() => (window.location.href = "/admin/pacientes")}>
          <Users className="h-4 w-4 mr-2" />
          Buscar Paciente
          {/* aca habria que armar lafuncionalidad */}
        </Button>
      </div>

      <div className="grid gap-4">
        {pacientes.map((paciente: any) => (
          <Card key={paciente.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <Users className="h-4 w-4 text-secondary" />
                  </div>
                  <div>
                    <p className="font-medium">{paciente.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                      {paciente.email} • {paciente.telefono}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      paciente.ausencias > 1 ? "destructive" : "secondary"
                    }
                  >
                    {paciente.ausencias} ausencias
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      (window.location.href = `/admin/pacientes/${paciente.id}`)
                    }
                  >
                    Ver Historial
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </TabsContent>
  );
}
