"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, User, Phone, Mail, MapPin, Edit, UserX, RotateCcw } from "lucide-react"
import { TurnosAcciones } from "./TurnosAcciones"
import { QuickStats } from "./QuickStats"
import { InfoMedico } from "./InfoMedico"


interface MedicoProps {
  medico?: {
    id: number
    nombre: string
    especialidad: string
    estado: "activo" | "inactivo"
    agenda: boolean
  }
}


export default function TurnoDetalle( { medico }: MedicoProps) {
  // Mock data - en una app real vendría de la API
  const turno = {
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
  }
   
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </Button>
            <div>
              <h1 className="text-xl font-bold">Detalle del Turno #{turno.id}</h1>
              <p className="text-sm text-muted-foreground">
                {turno.fecha} - {turno.hora}
              </p>
                   
          </div>
        </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Turno Info */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Información del Turno
                  </CardTitle>
                  <Badge
                    variant={
                      turno.estado === "confirmado"
                        ? "default"
                        : turno.estado === "pendiente de pago"
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {turno.estado}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Fecha</p>
                      <p className="font-medium">{turno.fecha}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Hora</p>
                      <p className="font-medium">
                        {turno.hora} ({turno.duracion})
                      </p>
                    </div>
                    <div>
                     <p className="text-sm text-muted-foreground">Obra Social</p>
                    <p className="font-medium">{turno.paciente.obraSocial}</p>
            </div>
                  </div>
                </div>


                    
                {/* <div>
                  <p className="text-sm text-muted-foreground">Motivo de la consulta</p>
                  <p className="font-medium">{turno.motivo}</p>
                </div> */}


                {/* {turno.observaciones && (
                  <div>
                    <p className="text-sm text-muted-foreground">Observaciones</p>
                    <p className="font-medium">{turno.observaciones}</p>
                  </div>
                )} */}
              </CardContent>
            </Card>

            {/* Paciente Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Información del Paciente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Nombre completo</p>
                    <p className="font-medium">{turno.paciente.nombre}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">DNI</p>
                    <p className="font-medium">{turno.paciente.dni}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{turno.paciente.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Teléfono</p>
                      <p className="font-medium">{turno.paciente.telefono}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Dirección</p>
                      <p className="font-medium">{turno.paciente.direccion}</p>
                    </div>
                  </div>
                  
                </div>
              </CardContent>
            </Card>

            {/* Medico Info */}
            <InfoMedico
            turno={ turno }
            > </InfoMedico>
          </div>

          {/* Actions Sidebar */}
          <div className="space-y-6">
            <TurnosAcciones></TurnosAcciones>

            {/* Quick Stats */}
            {/* <QuickStats
            turno={ turno }
            ></QuickStats> */}
          </div>
        </div>
      </div>
    </div>
  )
}
