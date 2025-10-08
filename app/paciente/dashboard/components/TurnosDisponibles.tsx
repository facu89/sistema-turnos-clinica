import React from 'react'
import { useState } from "react";
import {turnosAgendados,turnosDisponibles,medicos} from "../../../data/Info";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Search, Edit, X, CheckCircle } from "lucide-react";
import {Card,CardContent,CardHeader,CardDescription,CardTitle,} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Agendar from "./Agendar";


interface TurnosDisponiblesProps {
  filtroEspecialidad: string;
  filtroMedico: string;
  setTurnosAgendados: React.Dispatch<React.SetStateAction<any[]>>;
}



export const TurnosDisponibles = ({ filtroEspecialidad, filtroMedico,setTurnosAgendados}: TurnosDisponiblesProps) => { 
          const [activeTab, setActiveTab] = useState("mis-turnos");
          const [mostrarResultados, setMostrarResultados] = useState(false);
          // const [turnos, setTurnosAgendados] = useState(turnosAgendados);
          const [disponibles, setTurnosDisponibles] = useState(turnosDisponibles);
          const [turnoAModificar, setTurnoAModificar] = useState<any>(null);
          const [turnoAConfirmar, setTurnoAConfirmar] = useState<any>(null);

          const seleccionarNuevoTurno = (nuevoTurno: any) => {
               setTurnosAgendados((prev) =>
                    prev.map((t) =>
                         t.id === turnoAModificar.id
                              ? { ...t, fecha: nuevoTurno.fecha, hora: nuevoTurno.hora }
                              : t
                    )
               );
               setTurnoAModificar(null);
          };
     
          // Función para agendar un turno (ahora solo abre el modal de pago)
          const agendarTurno = (turno: any) => {
               setTurnoAConfirmar(turno);
          };
     
          

          const medicosFiltrados = filtroEspecialidad
                    ? medicos.filter((m) => m.especialidad === filtroEspecialidad)
                    : [];
          
               const turnosFiltrados = turnosDisponibles.filter((turno) => {
                    const coincideMedico =
                         !filtroMedico ||
                         filtroMedico === "Seleccionar médico" ||
                         turno.medico === filtroMedico;
                    const coincideEspecialidad =
                         !filtroEspecialidad ||
                         filtroEspecialidad === "Todas las especialidades" ||
                         turno.especialidad === filtroEspecialidad;
                    return (
                         coincideMedico && coincideEspecialidad && turno.estado === "disponible"
                    );
               });
          
console.log("Turnos Filtrados:", turnosFiltrados);
                    console.log(turnosFiltrados.length);

return (
               <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Turnos Disponibles</h3>
                    
                    {turnosFiltrados.length === 0  && (
                         <>
                              <p className="text-muted-foreground">
                                   No hay turnos disponibles con esos filtros.
                              </p>
                              {filtroEspecialidad && filtroEspecialidad !== "" && (
                                   <div className="flex justify-center">
                                        <Button
                                             variant="outline"
                                             className="mt-2"
                                             onClick={() =>
                                                  alert("Solicitud de ingreso a lista de espera enviada.")
                                             }
                                        >
                                             Solicitar ingreso a lista de espera
                                        </Button>
                                   </div>
                              )}
                         </>
                    )}
                    {
                         turnosFiltrados.map((turno) => (
                              <Card key={turno.id}>
                                   <CardContent className="p-4">
                                        <div className="flex items-center justify-between">
                                             <div className="flex items-center gap-4">
                                                  <div className="bg-secondary/10 p-2 rounded-lg">
                                                       <Clock className="h-4 w-4 text-secondary" />
                                                  </div>
                                                  <div>
                                                       <p className="font-medium">{turno.medico}</p>
                                                       <p className="text-sm text-muted-foreground">
                                                            {turno.especialidad}
                                                       </p>
                                                       <p className="text-sm font-medium">
                                                            {turno.fecha} - {turno.hora}
                                                       </p>
                                                  </div>
                                             </div>
                                             <div className="flex gap-2">
                                                  <Button size="sm" onClick={() => agendarTurno(turno)}>
                                                       <CheckCircle className="h-4 w-4 mr-1" />
                                                       Agendar
                                                  </Button>
                                             </div>
                                        </div>
                                   </CardContent>
                              </Card>
                         ))}
                         {turnoAConfirmar && 
                         <Agendar
                         turnoAConfirmar={turnoAConfirmar}
                         setTurnoAConfirmar={setTurnoAConfirmar}
                         setTurnosAgendados={setTurnosAgendados}
                         setTurnosDisponibles={setTurnosDisponibles}
                         ></Agendar> }
               </div>
     )
}

