"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Calendar, Clock, Save, Plus, Trash2 } from "lucide-react"

export default function MedicoAgenda() {
  const [agenda, setAgenda] = useState({
    duracionTurno: 30,
    fechaVigencia: "2024-12-31",
    horarios: [      // aca ira db
      { dia: "lunes", activo: true, horaInicio: "09:00", horaFin: "17:00" },
      { dia: "martes", activo: true, horaInicio: "09:00", horaFin: "17:00" },
      { dia: "miercoles", activo: false, horaInicio: "09:00", horaFin: "17:00" },
      { dia: "jueves", activo: true, horaInicio: "09:00", horaFin: "17:00" },
      { dia: "viernes", activo: true, horaInicio: "09:00", horaFin: "13:00" },
      { dia: "sabado", activo: false, horaInicio: "09:00", horaFin: "13:00" },
      { dia: "domingo", activo: false, horaInicio: "09:00", horaFin: "13:00" },
    ],
  })

  const medico = {
    nombre: "Dr. Carlos López",
    especialidad: "Cardiología",
    estado: "activo",
  }

  const diasSemana = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"]

  const handleHorarioChange = (dia: string, campo: string, valor: any) => {
    setAgenda((prev) => ({
      ...prev,
      horarios: prev.horarios.map((h) => (h.dia === dia ? { ...h, [campo]: valor } : h)),
    }))
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
              <h1 className="text-xl font-bold">Agenda de {medico.nombre}</h1>
              <p className="text-sm text-muted-foreground">
                {medico.especialidad} • {medico.estado}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Configuración General */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Configuración General
                </CardTitle>
                <CardDescription>Configura los parámetros generales de la agenda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duracion">Duración de cada turno (minutos)</Label>
                    <Input
                      id="duracion"
                      type="number"
                      value={agenda.duracionTurno}
                      onChange={(e) =>
                        setAgenda((prev) => ({ ...prev, duracionTurno: Number.parseInt(e.target.value) }))
                      }
                      min="15"
                      max="120"
                      step="15"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vigencia">Fecha de vigencia</Label>
                    <Input
                      id="vigencia"
                      type="date"
                      value={agenda.fechaVigencia}
                      onChange={(e) => setAgenda((prev) => ({ ...prev, fechaVigencia: e.target.value }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Horarios por Día */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Horarios de Atención
                </CardTitle>
                <CardDescription>Configura los días y horarios de atención</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {agenda.horarios.map((horario, index) => (
                  <div key={horario.dia} className="flex items-center gap-4 p-4 border rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={horario.dia}
                        checked={horario.activo}
                        onCheckedChange={(checked) => handleHorarioChange(horario.dia, "activo", checked)}
                      />
                      <Label htmlFor={horario.dia} className="text-sm font-medium capitalize min-w-[80px]">
                        {diasSemana[index]}
                      </Label>
                    </div>

                    <div className="flex items-center gap-2 flex-1">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Desde</Label>
                        <Input
                          type="time"
                          value={horario.horaInicio}
                          onChange={(e) => handleHorarioChange(horario.dia, "horaInicio", e.target.value)}
                          disabled={!horario.activo}
                          className="w-24"
                        />
                      </div>
                      <span className="text-muted-foreground">hasta</span>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Hasta</Label>
                        <Input
                          type="time"
                          value={horario.horaFin}
                          onChange={(e) => handleHorarioChange(horario.dia, "horaFin", e.target.value)}
                          disabled={!horario.activo}
                          className="w-24"
                        />
                      </div>
                    </div>

                    {horario.activo && (
                      <Badge variant="secondary">
                        {Math.floor(
                          (new Date(`2000-01-01T${horario.horaFin}`) - new Date(`2000-01-01T${horario.horaInicio}`)) /
                            (1000 * 60 * agenda.duracionTurno),
                        )}{" "}
                        turnos
                      </Badge>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Acciones</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  <Save className="h-4 w-4 mr-2" />
                  Guardar Agenda
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Agregar Excepción
                </Button>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar Agenda
                </Button>
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Resumen</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Días activos:</span>
                    <span className="font-medium">{agenda.horarios.filter((h) => h.activo).length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Duración turno:</span>
                    <span className="font-medium">{agenda.duracionTurno} min</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Vigencia:</span>
                    <span className="font-medium">{agenda.fechaVigencia}</span>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <p className="text-sm font-medium mb-2">Turnos por semana:</p>
                  <p className="text-2xl font-bold text-primary">
                    {agenda.horarios
                      .filter((h) => h.activo)
                      .reduce((total, h) => {
                        const duracion =
                          (new Date(`2000-01-01T${h.horaFin}`) - new Date(`2000-01-01T${h.horaInicio}`)) / (1000 * 60)
                        return total + Math.floor(duracion / agenda.duracionTurno)
                      }, 0)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
