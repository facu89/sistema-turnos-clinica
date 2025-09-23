"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  User,
  Clock,
  Search,
  Edit,
  X,
  CheckCircle,
  AlertCircle,
  Stethoscope,
  LogOut,
  Settings,
} from "lucide-react"

export default function PacienteDashboard() {
  const [activeTab, setActiveTab] = useState("mis-turnos")

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
              <h1 className="text-xl font-bold">Mi Portal de Salud</h1>
              <p className="text-sm text-muted-foreground">Bienvenido, María García</p>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Próximo Turno</p>
                  <p className="text-lg font-bold">Mañana 10:30</p>
                  <p className="text-sm text-muted-foreground">Dr. López</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Turnos Este Mes</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Clock className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Estado</p>
                  <p className="text-lg font-bold text-secondary">Al día</p>
                </div>
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mis-turnos">Mis Turnos</TabsTrigger>
            <TabsTrigger value="buscar-turnos">Buscar Turnos</TabsTrigger>
            <TabsTrigger value="perfil">Mi Perfil</TabsTrigger>
            <TabsTrigger value="historial">Historial</TabsTrigger>
          </TabsList>

          <TabsContent value="mis-turnos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mis Turnos Agendados</h2>
              <Button onClick={() => setActiveTab("buscar-turnos")}>
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Nuevo Turno
              </Button>
            </div>

            <div className="grid gap-4">
              {[
                {
                  id: 1,
                  medico: "Dr. Carlos López",
                  especialidad: "Cardiología",
                  fecha: "2024-01-15",
                  hora: "10:30",
                  estado: "confirmado",
                  direccion: "Consultorio 201",
                },
                {
                  id: 2,
                  medico: "Dra. Ana Martínez",
                  especialidad: "Pediatría",
                  fecha: "2024-01-22",
                  hora: "14:00",
                  estado: "pendiente",
                  direccion: "Consultorio 105",
                },
                {
                  id: 3,
                  medico: "Dr. Luis Rodríguez",
                  especialidad: "Traumatología",
                  fecha: "2024-01-28",
                  hora: "09:15",
                  estado: "confirmado",
                  direccion: "Consultorio 302",
                },
              ].map((turno) => (
                <Card key={turno.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          <Calendar className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">{turno.medico}</p>
                          <p className="text-muted-foreground">{turno.especialidad}</p>
                          <p className="text-sm font-medium">
                            {turno.fecha} a las {turno.hora}
                          </p>
                          <p className="text-sm text-muted-foreground">{turno.direccion}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={turno.estado === "confirmado" ? "default" : "secondary"}>{turno.estado}</Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Modificar
                          </Button>
                          <Button variant="destructive" size="sm">
                            <X className="h-4 w-4 mr-1" />
                            Cancelar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="buscar-turnos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Buscar Turnos Disponibles</h2>
            </div>

            {/* Search Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filtros de Búsqueda</CardTitle>
                <CardDescription>Selecciona el médico y especialidad para ver turnos disponibles</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Médico</label>
                    <select className="w-full mt-1 p-2 border rounded-lg">
                      <option>Seleccionar médico</option>
                      <option>Dr. Carlos López</option>
                      <option>Dra. Ana Martínez</option>
                      <option>Dr. Luis Rodríguez</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Especialidad</label>
                    <select className="w-full mt-1 p-2 border rounded-lg">
                      <option>Todas las especialidades</option>
                      <option>Cardiología</option>
                      <option>Pediatría</option>
                      <option>Traumatología</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Buscar Turnos Disponibles
                </Button>
              </CardContent>
            </Card>

            {/* Available Appointments */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Turnos Disponibles</h3>
              {[
                { id: 1, medico: "Dr. Carlos López", especialidad: "Cardiología", fecha: "2024-01-16", hora: "11:00" },
                { id: 2, medico: "Dr. Carlos López", especialidad: "Cardiología", fecha: "2024-01-16", hora: "15:30" },
                { id: 3, medico: "Dra. Ana Martínez", especialidad: "Pediatría", fecha: "2024-01-17", hora: "09:00" },
              ].map((turno) => (
                <Card key={turno.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-secondary/10 p-2 rounded-lg">
                          <Clock className="h-4 w-4 text-secondary" />
                        </div>
                        <div>
                          <p className="font-medium">{turno.medico}</p>
                          <p className="text-sm text-muted-foreground">{turno.especialidad}</p>
                          <p className="text-sm font-medium">
                            {turno.fecha} - {turno.hora}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Agendar
                        </Button>
                        <Button variant="outline" size="sm">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          Lista de Espera
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="perfil" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mi Perfil</h2>
              <Button>
                <Edit className="h-4 w-4 mr-2" />
                Editar Perfil
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Nombre Completo</label>
                    <p className="text-lg">María García</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">DNI</label>
                    <p className="text-lg">12.345.678</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Fecha de Nacimiento</label>
                    <p className="text-lg">15/03/1985</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Obra Social</label>
                    <p className="text-lg">OSDE</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                  <CardDescription>Puedes modificar estos datos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-lg">maria.garcia@email.com</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Teléfono</label>
                    <p className="text-lg">+54 11 1234-5678</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Dirección</label>
                    <p className="text-lg">Av. Corrientes 1234, CABA</p>
                  </div>
                  <Button className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Modificar Datos de Contacto
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="historial" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Historial Médico</h2>
            </div>

            <div className="grid gap-4">
              {[
                {
                  id: 1,
                  fecha: "2023-12-15",
                  medico: "Dr. Carlos López",
                  especialidad: "Cardiología",
                  tipo: "Consulta",
                  estado: "completado",
                },
                {
                  id: 2,
                  fecha: "2023-11-20",
                  medico: "Dra. Ana Martínez",
                  especialidad: "Pediatría",
                  tipo: "Control",
                  estado: "completado",
                },
                {
                  id: 3,
                  fecha: "2023-10-10",
                  medico: "Dr. Luis Rodríguez",
                  especialidad: "Traumatología",
                  tipo: "Consulta",
                  estado: "ausente",
                },
              ].map((consulta) => (
                <Card key={consulta.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-accent/10 p-2 rounded-lg">
                          <User className="h-4 w-4 text-accent" />
                        </div>
                        <div>
                          <p className="font-medium">{consulta.medico}</p>
                          <p className="text-sm text-muted-foreground">
                            {consulta.especialidad} • {consulta.tipo}
                          </p>
                          <p className="text-sm font-medium">{consulta.fecha}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={consulta.estado === "completado" ? "default" : "destructive"}>
                          {consulta.estado}
                        </Badge>
                        {consulta.estado === "completado" && (
                          <Button variant="outline" size="sm">
                            Ver Detalle
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
