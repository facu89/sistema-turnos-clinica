"use client";
<<<<<<< HEAD

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  User,
  Clock,
  Search,
  Edit,
  X,
  CheckCircle,
  AlertCircle,
  Stethoscope,
  LogOut,
  Settings,
} from "lucide-react";
=======
import { useState } from "react";
import { Tabs ,TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderPaciente from "./components/HeaderPaciente";
import { turnosAgendados, turnosDisponibles, medicos } from "../../data/Info";
import {StatCards} from './StatCards';
import { TurnosTabPac } from "./components/TurnosTabPac";
import PerfilTab from "./components/PerfilTab";
import TurnosLibresTab from "./components/TurnosLibresTab";

>>>>>>> e3683f1ea9dac1d226c1f883c1f3740001edbaf2

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export default function PacienteDashboard() {
  const [activeTab, setActiveTab] = useState("mis-turnos");
<<<<<<< HEAD
  const [filtroMedico, setFiltroMedico] = useState("");
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("");
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Estado para los turnos agendados
  const [turnosAgendados, setTurnosAgendados] = useState([
    {
      id: 1,
      medico: "Dr. Carlos López",
      especialidad: "Cardiología",
      fecha: "2024-01-15",
      hora: "10:30",
      direccion: "Consultorio 201",
    },
    {
      id: 2,
      medico: "Dra. Ana Martínez",
      especialidad: "Pediatría",
      fecha: "2024-01-22",
      hora: "14:00",
      direccion: "Consultorio 105",
    },
    {
      id: 3,
      medico: "Dr. Luis Rodríguez",
      especialidad: "Traumatología",
      fecha: "2024-01-28",
      hora: "09:15",
      direccion: "Consultorio 302",
    },
  ]);

  // Estado para modificar turno
  const [turnoAModificar, setTurnoAModificar] = useState<any>(null);
  const [turnoAConfirmar, setTurnoAConfirmar] = useState<any>(null);

  // Estado para los turnos disponibles, ahora con estado
  const [turnosDisponibles, setTurnosDisponibles] = useState([
    {
      id: 1,
      medico: "Dr. Carlos López",
      especialidad: "Cardiología",
      fecha: "2024-01-16",
      hora: "11:00",
      estado: "disponible",
    },
    {
      id: 2,
      medico: "Dr. Carlos López",
      especialidad: "Cardiología",
      fecha: "2024-01-16",
      hora: "15:30",
      estado: "disponible",
    },
    {
      id: 3,
      medico: "Dra. Ana Martínez",
      especialidad: "Pediatría",
      fecha: "2024-01-17",
      hora: "09:00",
      estado: "disponible",
    },
  ]);

  // Lista de médicos con especialidad
  const medicos = [
    { nombre: "Dr. Carlos López", especialidad: "Cardiología" },
    { nombre: "Dr. Maria Ross ", especialidad: "Cardiología" },
    { nombre: "Dr. Martin Guerrero", especialidad: "Cardiología" },
    { nombre: "Dra. Ana Martínez", especialidad: "Pediatría" },
    { nombre: "Dra. Perez Lopez", especialidad: "Pediatría" },
    { nombre: "Dra. Jose Armando", especialidad: "Pediatría" },
    { nombre: "Dr. Luis Rodríguez", especialidad: "Traumatología" },
    { nombre: "Dr. Marcos Lucas", especialidad: "Traumatología" },
    { nombre: "Dr. Rodrigo Alfonso", especialidad: "Traumatología" },
  ];

  // Filtrar médicos según la especialidad seleccionada
  const medicosFiltrados = filtroEspecialidad
    ? medicos.filter((m) => m.especialidad === filtroEspecialidad)
    : [];

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

  // Función para agendar un turno (ahora solo abre el modal de pago)
  const agendarTurno = (turno: any) => {
    setTurnoAConfirmar(turno);
  };

  const [mp, setMp] = useState<any>(null);

  useEffect(() => {
    // Cargar el SDK de MercadoPago
    const script = document.createElement("script");
    script.src = "https://sdk.mercadopago.com/js/v2";
    script.onload = () => {
      const mercadopago = new window.MercadoPago(
        process.env.NEXT_PUBLIC_MP_PUBLIC_KEY || "TEST-your-public-key"
      );
      setMp(mercadopago);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Función para crear la preferencia de pago
  const crearPreferenciaPago = async (turno: any) => {
    try {
      const response = await fetch("/api/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: `Turno médico - ${turno.medico}`,
          quantity: 1,
          unit_price: 1000,
          description: `Turno de la clínica XXX - ${turno.especialidad}`,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      // Redirigir a MercadoPago
      if (result.sandbox_init_point) {
        window.open(result.sandbox_init_point, "_blank");
      } else if (result.init_point) {
        window.open(result.init_point, "_blank");
      }
    } catch (error) {
      console.error("Error al crear la preferencia:", error);
      // alert("Error al procesar el pago: " + error.message);
    }
  };

  // Función modificada para pagar y confirmar turno
  const pagarYConfirmarTurno = async () => {
    if (!turnoAConfirmar) return;

    await crearPreferenciaPago(turnoAConfirmar);

    // Por ahora, simulamos que el pago fue exitoso
    // En una implementación real, esto se haría en el webhook de MercadoPago
    setTimeout(() => {
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
    }, 3000);
  };

  // Estado para los datos de contacto
  const [contacto, setContacto] = useState({
    email: "maria.garcia@email.com",
    telefono: "+54 11 1234-5678",
    direccion: "Av. Corrientes 1234, CABA",
  });
  const [editandoContacto, setEditandoContacto] = useState(false);
  const [contactoTemp, setContactoTemp] = useState(contacto);
=======
>>>>>>> e3683f1ea9dac1d226c1f883c1f3740001edbaf2

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <HeaderPaciente></HeaderPaciente>
      <div className="container mx-auto px-4 py-6">
        <StatCards></StatCards>
        {/* Main Content */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="mis-turnos">Mis Turnos</TabsTrigger>
            <TabsTrigger value="buscar-turnos">Turnos disponibles</TabsTrigger>
            <TabsTrigger value="perfil">Mi Perfil</TabsTrigger>
            {/* <TabsTrigger value="historial">Historial</TabsTrigger> */}
          </TabsList>

          <TurnosTabPac></TurnosTabPac>
          <TurnosLibresTab></TurnosLibresTab>
          <PerfilTab></PerfilTab>
        </Tabs>
      </div>
    </div>
  );
}
