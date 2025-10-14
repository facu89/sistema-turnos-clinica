import React from "react";
import { useState } from "react";
import {
  turnosAgendados,
  turnosDisponibles,
  medico,
} from "../../data/Info";
import {  TabsContent } from "@/components/ui/tabs";
import FiltrosBusqueda from "../components/FiltrosBusqueda";

export const TurnosLibres = () => {
  const [activeTab, setActiveTab] = useState("mis-turnos");
  const [filtroMedico, setFiltroMedico] = useState("");
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [turnos, setTurnosAgendados] = useState(turnosAgendados);
  const [disponibles, setTurnosDisponibles] = useState(turnosDisponibles);
  const [turnoAModificar, setTurnoAModificar] = useState<any>(null);
  const [turnoAConfirmar, setTurnoAConfirmar] = useState<any>(null);

  const medicosFiltrados = filtroEspecialidad
    ? medico.filter((m) => m.especialidad === filtroEspecialidad)
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
