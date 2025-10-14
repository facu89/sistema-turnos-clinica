import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TabsContent } from "@/components/ui/tabs"
import { Clock } from "lucide-react"
import {turnosAgendados } from '@/app/data/Info'

export const TurnosTab = () => {
  return (
    <TabsContent value="turnos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestión de Turnos</h2>
              
            </div>

            <div className="grid gap-4">
              {turnosAgendados.map((turno) => (
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

