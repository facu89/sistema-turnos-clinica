import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TabsContent } from "@/components/ui/tabs"
import { Clock } from "lucide-react"

export const TurnosTab = () => {
  return (
    <TabsContent value="turnos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestión de Turnos</h2>
              {/* <Button onClick={() => (window.location.href = "/admin/turnos/nuevo")}>
                <Calendar className="h-4 w-4 mr-2" />
                Nuevo Turno
              </Button> */}
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

  )
}

