import React from 'react'
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User, Phone, Mail, MapPin, Edit, UserX, RotateCcw } from "lucide-react"
import { TurnosAcciones } from "./TurnosAcciones"
import InfoTurno from './InfoTurno';
import { turnoPaciente } from "@/app/data/Info"

const HeaderTurno = ({ turno }: any) => {
     return (
          <>
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

          </>
     )
}

export default HeaderTurno
