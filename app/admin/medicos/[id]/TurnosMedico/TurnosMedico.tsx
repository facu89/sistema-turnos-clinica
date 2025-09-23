'use client'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"

export const TurnosMedico = () => {
  const turnos = [
    {
      id: 1,
      paciente: {
        nombre: "María García",
        dni: "12.345.678",
        email: "maria.garcia@email.com",
        telefono: "+54 11 1234-5678",
        direccion: "Av. Corrientes 1234, CABA",
        obraSocial: "OSDE",
      },
      medico: {
        nombre: "Dr. Carlos López",
        especialidad: "Cardiología",
        consultorio: "201",
      },
      fecha: "2024-01-15",
      hora: "10:30",
      duracion: "30 min",
      estado: "confirmado",
      motivo: "Control cardiológico de rutina",
      observaciones: "Paciente con antecedentes de hipertensión",
    },
  ];

  // si más adelante querés filtrar por médico, pasalo como prop
  const turnosFiltrados = turnos; 

  return (
    <>
      {turnosFiltrados.map((turno) => (
        <Card key={turno.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{turno.paciente.nombre}</p>
                  <p className="text-sm text-muted-foreground">
                    {turno.medico.nombre} - {turno.hora}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    turno.estado === "confirmado"
                      ? "default"
                      : turno.estado === "pendiente"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {turno.estado}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    (window.location.href = `../../turnos/${turno.id}`)
                  }
                >
                  Ver Detalle
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
