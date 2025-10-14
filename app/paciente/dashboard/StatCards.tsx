import React from 'react'
import {Card,CardContent,} from "@/components/ui/card";
import {Calendar,Clock,} from "lucide-react";
import { turnosAgendados } from '@/app/data/Info';

export const StatCards = ({turnos,paciente}: any) => {//asumimos que la query manda solo lo des del paciente
    const turno=turnos[0];//el turno mas proximo
  return (
         <>
          <div className="grid grid-cols-2 gap-6 mb-8">
               <Card>
               <CardContent className="p-6">
               <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-muted-foreground">
                         Próximo Turno
                    </p>
                    { turno?(
                         <>
                         <p className="text-lg font-bold">Tu proximo turno es el</p>
                         <p className="text-lg font-bold">
                         {turno.fecha} </p>
                         <p className="text-lg font-bold"> {turno.hora}< span> hs </span> </p>
                         
                    <p className="text-sm text-muted-foreground"> 
                    con {turno.medico}
                    </p>
                    </>
                    ) : (
                         <p className="text-lg font-bold">No hay turnos proximos</p> 
                         
                    )}

                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
               </div>
               </CardContent>
               </Card>
               <Card>
               <CardContent className="p-6">
               <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-muted-foreground">
                         Turnos Este Mes
                    </p>
                    <p className="text-2xl font-bold"> {/*numero*/}
                         {turnos.filter((t: any) => {
                              const fecha = new Date(t.fecha);
                              const ahora = new Date();
                              return (
                                   fecha.getMonth() === ahora.getMonth() &&
                                   fecha.getFullYear() === ahora.getFullYear()
                              );
                         }).length}</p>
                    </div>
                    <Clock className="h-8 w-8 text-secondary" />
               </div>
               </CardContent>
               </Card>
               
          </div>
          </>
)
}

