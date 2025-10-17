import React, { useEffect, useState } from 'react'
import {Card,CardContent,} from "@/components/ui/card";
import {Calendar,Clock,} from "lucide-react";

async function getTurnosPaciente(dniPaciente: string) {
  try {
    const response = await fetch(`/api/turnos?dni_paciente=${dniPaciente}`, {
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Error al obtener turnos");
    const data = await response.json();
    return Array.isArray(data) ? data.sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime()) : [];
  } catch (error) {
    console.error("Error: ", error);
    return [];
  }
}

export const StatCards = ({ paciente }: { paciente: any }) => {
  const [turnos, setTurnos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadTurnos = async () => {
      setIsLoading(true);
      if (paciente?.dni_paciente) {
        const data = await getTurnosPaciente(paciente.dni_paciente);
        setTurnos(data);
      }
      setIsLoading(false);
    };
    loadTurnos();
  }, [paciente?.dni_paciente]);

  const turno = turnos[0]; // el turno más próximo (ya ordenado por fecha)
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
                    {isLoading ? (
                         <p className="text-lg">Cargando...</p>
                    ) : turno ? (
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
                         <p className="text-lg font-bold">No hay turnos próximos</p> 
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
                    <p className="text-2xl font-bold">
                         {isLoading ? (
                              "..."
                         ) : turnos.filter((t: any) => {
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

