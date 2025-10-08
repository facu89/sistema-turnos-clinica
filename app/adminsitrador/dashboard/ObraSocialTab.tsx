import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TabsContent } from "@/components/ui/tabs"
import {FileText} from "lucide-react"

export const ObraSocialTab = () => {
  return (
    <TabsContent value="obras-sociales" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Obras Sociales</h2>
              <Button onClick={() => (window.location.href = "/admin/obras-sociales/nueva")}>
                <FileText className="h-4 w-4 mr-2" />
                Registrar Nueva Obra Social
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
                        <Button variant={obra.activa ? "destructive" : "secondary"}>
                          {obra.activa ? "Desactivar" : "Activar"}
                        </Button>
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

  )
}

