"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Calendar,
  UserPlus,
  Stethoscope,
  FileText,
  Heart,
  Clock,
  AlertCircle,
  Settings,
  LogOut,
} from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("turnos")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Stethoscope className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Panel Administrativo</h1>
              <p className="text-sm text-muted-foreground">ClinicaTurnos</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configuración
            </Button>
            <Button variant="outline" size="sm" onClick={() => (window.location.href = "/")}>
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Turnos Hoy</p>
                  <p className="text-2xl font-bold">24</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pacientes</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <Users className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Médicos</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <UserPlus className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Ausencias</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="turnos">Turnos</TabsTrigger>
            <TabsTrigger value="pacientes">Pacientes</TabsTrigger>
            <TabsTrigger value="medicos">Médicos</TabsTrigger>
            <TabsTrigger value="obras-sociales">Obras Sociales</TabsTrigger>
            <TabsTrigger value="reportes">Reportes</TabsTrigger>
          </TabsList>

          <TabsContent value="turnos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestión de Turnos</h2>
              <Button onClick={() => (window.location.href = "/admin/turnos/nuevo")}>
                <Calendar className="h-4 w-4 mr-2" />
                Nuevo Turno
              </Button>
            </div>

            <div className="grid gap-4">
              {[
                { id: 1, paciente: "María García", medico: "Dr. López", hora: "09:00", estado: "confirmado" },
                { id: 2, paciente: "Juan Pérez", medico: "Dra. Martínez", hora: "10:30", estado: "pendiente" },
                { id: 3, paciente: "Ana Silva", medico: "Dr. Rodríguez", hora: "11:00", estado: "ausente" },
              ].map((turno) => (
                <Card key={turno.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <Clock className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{turno.paciente}</p>
                          <p className="text-sm text-muted-foreground">
                            {turno.medico} - {turno.hora}
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
                          onClick={() => (window.location.href = `/admin/turnos/${turno.id}`)}
                        >
                          Ver Detalle
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pacientes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestión de Pacientes</h2>
              <Button onClick={() => (window.location.href = "/admin/pacientes")}>
                <Users className="h-4 w-4 mr-2" />
                Ver Todos los Pacientes
              </Button>
            </div>

            <div className="grid gap-4">
              {[
                { id: 1, nombre: "María García", email: "maria@email.com", telefono: "+54 11 1234-5678", ausencias: 0 },
                { id: 2, nombre: "Juan Pérez", email: "juan@email.com", telefono: "+54 11 8765-4321", ausencias: 2 },
                { id: 3, nombre: "Ana Silva", email: "ana@email.com", telefono: "+54 11 5555-5555", ausencias: 1 },
              ].map((paciente) => (
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

          <TabsContent value="medicos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestión de Médicos</h2>
              <Button onClick={() => (window.location.href = "/admin/medicos/nuevo")}>
                <UserPlus className="h-4 w-4 mr-2" />
                Registrar Médico
              </Button>
            </div>

            <div className="grid gap-4">
              {[
                { id: 1, nombre: "Dr. Carlos López", especialidad: "Cardiología", estado: "activo", agenda: true },
                { id: 2, nombre: "Dra. Ana Martínez", especialidad: "Pediatría", estado: "activo", agenda: true },
                {
                  id: 3,
                  nombre: "Dr. Luis Rodríguez",
                  especialidad: "Traumatología",
                  estado: "inactivo",
                  agenda: false,
                },
              ].map((medico) => (
                <Card key={medico.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-accent/10 p-2 rounded-lg">
                          <Heart className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium">{medico.nombre}</p>
                          <p className="text-sm text-muted-foreground">{medico.especialidad}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={medico.estado === "activo" ? "default" : "secondary"}>{medico.estado}</Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => (window.location.href = `/admin/medicos/${medico.id}/agenda`)}
                        >
                          {medico.agenda ? "Ver Agenda" : "Crear Agenda"}
                        </Button>
                        <Button variant={medico.estado === "activo" ? "destructive" : "default"} size="sm">
                          {medico.estado === "activo" ? "Inhabilitar" : "Habilitar"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="obras-sociales" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Obras Sociales</h2>
              <Button onClick={() => (window.location.href = "/admin/obras-sociales/nueva")}>
                <FileText className="h-4 w-4 mr-2" />
                Nueva Obra Social
              </Button>
            </div>

            <div className="grid gap-4">
              {[
                { id: 1, nombre: "OSDE", codigo: "OSDE001", activa: true },
                { id: 2, nombre: "Swiss Medical", codigo: "SWISS001", activa: true },
                { id: 3, nombre: "Galeno", codigo: "GAL001", activa: false },
              ].map((obra) => (
                <Card key={obra.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-2 rounded-lg">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{obra.nombre}</p>
                          <p className="text-sm text-muted-foreground">Código: {obra.codigo}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={obra.activa ? "default" : "secondary"}>
                          {obra.activa ? "Activa" : "Inactiva"}
                        </Badge>
                        <Button variant="destructive" size="sm">
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reportes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Reportes</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Generar Reporte de Turnos</CardTitle>
                <CardDescription>Genera un reporte detallado de turnos por fecha y médico</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Fecha Inicio</label>
                    <input type="date" className="w-full mt-1 p-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Fecha Fin</label>
                    <input type="date" className="w-full mt-1 p-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Médico</label>
                    <select className="w-full mt-1 p-2 border rounded-lg">
                      <option>Todos los médicos</option>
                      <option>Dr. Carlos López</option>
                      <option>Dra. Ana Martínez</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Generar Reporte
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
