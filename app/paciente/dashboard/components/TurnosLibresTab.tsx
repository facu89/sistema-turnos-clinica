import React from "react";
import { useState } from "react";
import {turnosAgendados,turnosDisponibles,medicos} from "../../../data/Info";
import ObrasSocialesMedico from "./ObrasSocialesMedico";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Search, Edit, X, CheckCircle } from "lucide-react";
import {Card,CardContent,CardHeader,CardDescription,CardTitle,} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import FiltrosBusqueda from "./FiltrosBusqueda";

const TurnosLibres = () => {
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

     // Función para confirmar el pago y agendar el turno
     const pagarYConfirmarTurno = () => {
          if (!turnoAConfirmar) return;
          setTurnosAgendados((prev) => [
               ...prev,
               {
                    ...turnoAConfirmar,
                    direccion: "A confirmar",
               },
          ]);
          setTurnosDisponibles((prev) =>
               prev.map((t) =>
                    t.id === turnoAConfirmar.id ? { ...t, estado: "ocupado" } : t
               )
          );
          setTurnoAConfirmar(null);
     };

     return (
          <TabsContent value="buscar-turnos" className="space-y-6">
               <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Agendar un turno nuevo.</h2>
               </div>
               <FiltrosBusqueda></FiltrosBusqueda> 
          </TabsContent>
     );
};

export default TurnosLibres;
