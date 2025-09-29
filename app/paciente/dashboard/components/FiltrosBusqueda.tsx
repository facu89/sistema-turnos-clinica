import React from "react";
import { useState } from "react";
import { turnosAgendados, turnosDisponibles, medicos } from "../../../data/Info";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardDescription, CardTitle, } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {TurnosDisponibles}from "./TurnosDisponibles";

const FiltrosBusqueda = () => {

     const [activeTab, setActiveTab] = useState("mis-turnos");
     const [filtroMedico, setFiltroMedico] = useState("");
     const [filtroEspecialidad, setFiltroEspecialidad] = useState("");
     const [mostrarResultados, setMostrarResultados] = useState(false);
     const [turnos, setTurnosAgendados] = useState(turnosAgendados);
     const [disponibles, setTurnosDisponibles] = useState(turnosDisponibles);
     const [turnoAModificar, setTurnoAModificar] = useState<any>(null);
     const [turnoAConfirmar, setTurnoAConfirmar] = useState<any>(null);

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


     return (
          <>
          <Card>
               <CardHeader>
                    <CardTitle>Filtros de Búsqueda</CardTitle>
                    <CardDescription>
                         Selecciona primero la especialidad, luego el médico para ver turnos
                         disponibles.
                    </CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                              <label className="text-sm font-medium">Especialidad</label>
                              <select
                                   className="w-full mt-1 p-2 border rounded-lg"
                                   value={filtroEspecialidad}
                                   onChange={(e) => {
                                        setFiltroEspecialidad(e.target.value);
                                        setFiltroMedico(""); // Reinicia el médico al cambiar especialidad
                                   }}
                              >
                                   <option value="">Seleccionar especialidad</option>
                                   <option>Cardiología</option>
                                   <option>Pediatría</option>
                                   <option>Traumatología</option>
                              </select>
                         </div>
                         <div>
                              <label className="text-sm font-medium">Médico</label>
                              <select
                                   className="w-full mt-1 p-2 border rounded-lg"
                                   value={filtroMedico}
                                   onChange={(e) => setFiltroMedico(e.target.value)}
                                   disabled={!filtroEspecialidad}
                              >
                                   <option value="">Seleccionar médico</option>
                                   {medicosFiltrados.map((medico) => (
                                        <option key={medico.nombre}>{medico.nombre}</option>
                                   ))}
                              </select>
                         </div>
                    </div>
                    <Button
                         className="w-full"
                         onClick={() => setMostrarResultados(true)}
                         disabled={!filtroEspecialidad}
                    >
                         <Search className="h-4 w-4 mr-2" />
                         Buscar Turnos Disponibles
                    </Button>
               </CardContent>
          </Card>
          
     { mostrarResultados &&
     <TurnosDisponibles
          filtroEspecialidad={filtroEspecialidad}
          filtroMedico={filtroMedico}
          setTurnosAgendados={setTurnosAgendados}
     ></TurnosDisponibles>}
          </>
     )
}

export default FiltrosBusqueda
