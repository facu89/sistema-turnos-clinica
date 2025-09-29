import React from 'react'
import { useState } from "react";
import { turnosAgendados, turnosDisponibles, medicos } from "../../../data/Info";
import { Calendar, Edit, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModificarTurno } from './ModificarTurno';

export const ListarTurnosAgendados = () => {
     const [filtroMedico, setFiltroMedico] = useState("");
     const [filtroEspecialidad, setFiltroEspecialidad] = useState("");
     const [turnoAModificar, setTurnoAModificar] = useState<any>(null);
     const [turnos, setTurnosAgendados] = useState(turnosAgendados);

     // Filtrar turnos según los filtros seleccionados y que estén disponibles
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

     // Turnos disponibles para modificar (solo los que coinciden con el médico y especialidad del turno a modificar,
     // y que también aparecen en la lista filtrada de turnos disponibles)
     const turnosParaModificar = turnoAModificar
          ? turnosFiltrados.filter(
               (t) =>
                    t.medico === turnoAModificar.medico &&
                    t.especialidad === turnoAModificar.especialidad
          )
          : [];

     // Función para cancelar turno
     const cancelarTurno = (id: number) => {
          setTurnosAgendados((prev) => prev.filter((turno) => turno.id !== id));
     };

     // Función para seleccionar un turno disponible y modificar el turno agendado
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



     if (turnoAModificar) {
          return (
               <ModificarTurno
                    turnoAModificar={turnoAModificar}
                    setTurnoAModificar={setTurnoAModificar}
                    turnosParaModificar={turnosParaModificar}
                    seleccionarNuevoTurno={seleccionarNuevoTurno}
               />
          );
     }

     return (
          <div className="grid gap-4">
               {turnosAgendados.map((turno) => (
                    <Card key={turno.id}>
                         <CardContent className="p-6">
                              <div className="flex items-center justify-between">
                                   <div className="flex items-center gap-4">
                                        <div className="bg-primary/10 p-3 rounded-lg">
                                             <Calendar className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                             <p className="font-semibold text-lg">
                                                  {turno.medico}
                                             </p>
                                             <p className="text-muted-foreground">
                                                  {turno.especialidad}
                                             </p>
                                             <p className="text-sm font-medium">
                                                  {turno.fecha} a las {turno.hora}
                                             </p>
                                             <p className="text-sm text-muted-foreground">
                                                  {turno.direccion}
                                             </p>
                                        </div>
                                   </div>
                                   <div className="flex flex-col items-end gap-2">
                                        <div className="flex gap-2">
                                             <Button
                                                  variant="outline"
                                                  size="sm"
                                                  onClick={() => setTurnoAModificar(turno)}
                                             >
                                                  <Edit className="h-4 w-4 mr-1" />
                                                  Modificar
                                             </Button>
                                             <Button
                                                  variant="destructive"
                                                  size="sm"
                                                  onClick={() => cancelarTurno(turno.id)}
                                             >
                                                  <X className="h-4 w-4 mr-1" />
                                                  Cancelar
                                             </Button>
                                        </div>
                                   </div>
                              </div>
                         </CardContent>
                    </Card>
               ))}
               {turnosAgendados.length === 0 && (
                    <p className="text-muted-foreground text-center">
                         No tienes turnos agendados.
                    </p>
               )}
          </div>

     )
}

