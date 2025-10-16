"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TabsContent } from "@/components/ui/tabs";
import { Users } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Input } from '@/components/ui/input'

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
  const [allPacientes, setAllPacientes] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchPacientes = async () => {
      const data = await getPacientes();
      setAllPacientes(Array.isArray(data) ? data : []);
    };

    fetchPacientes();
  }, []);

  const pacientes = useMemo(() => {
    if (!search) return allPacientes;
    const q = search.toLowerCase();
    return allPacientes.filter((p: any) =>
      (p.nombre || "").toLowerCase().includes(q) ||
      (p.email || "").toLowerCase().includes(q) ||
      String(p.dni || "").toLowerCase().includes(q) ||
      String(p.telefono || "").toLowerCase().includes(q)
    );
  }, [search, allPacientes]);

  return (
    <TabsContent value="pacientes" className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestión de Pacientes</h2>
        <section className='flex gap-2'>
          <Input
            type="text"
            placeholder="Buscar paciente..."
            className="w-45"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          
        </section>
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
                  <Badge variant={paciente.ausencias > 1 ? "destructive" : "secondary"}>
                    {paciente.ausencias} ausencias
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => (window.location.href = `/admin/pacientes/${paciente.id}`)}
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
