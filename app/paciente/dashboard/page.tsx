"use client";

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

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export default function PacienteDashboard() {
  const [activeTab, setActiveTab] = useState("mis-turnos");
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Stethoscope className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Mi Portal de Salud</h1>
              <p className="text-sm text-muted-foreground">
                Bienvenido, María García
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => (window.location.href = "/")}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        {/* 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Próximo Turno
                  </p>
                  <p className="text-lg font-bold">Mañana 10:30</p>
                  <p className="text-sm text-muted-foreground">Dr. López</p>
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
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Clock className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Estado
                  </p>
                  <p className="text-lg font-bold text-secondary">Al día</p>
                </div>
                <CheckCircle className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>
        </div>
        */}
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

          <TabsContent value="mis-turnos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mis Turnos Agendados</h2>
              <Button onClick={() => setActiveTab("buscar-turnos")}>
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Nuevo Turno
              </Button>
            </div>

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

            {/* Modal o sección para modificar turno */}
            {turnoAModificar && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                  <h3 className="text-xl font-bold mb-4">
                    Selecciona un nuevo turno para {turnoAModificar.medico} -{" "}
                    {turnoAModificar.especialidad}
                  </h3>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {turnosParaModificar.length === 0 && (
                      <p className="text-muted-foreground">
                        No hay turnos disponibles para este médico y
                        especialidad.
                      </p>
                    )}
                    {turnosParaModificar.map((turno) => (
                      <Card key={turno.id}>
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <p className="font-medium">
                              {turno.medico} - {turno.especialidad}
                            </p>
                            <p>
                              {turno.fecha} - {turno.hora}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => seleccionarNuevoTurno(turno)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Seleccionar
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    onClick={() => setTurnoAModificar(null)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="buscar-turnos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Agendar un turno nuevo.</h2>
            </div>

            {/* Search Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Filtros de Búsqueda</CardTitle>
                <CardDescription>
                  Selecciona primero la especialidad, luego el médico para ver
                  turnos disponibles.
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

            {/* Available Appointments */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Turnos Disponibles</h3>
              {mostrarResultados && turnosFiltrados.length === 0 && (
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
                          alert(
                            "Solicitud de ingreso a lista de espera enviada."
                          )
                        }
                      >
                        Solicitar ingreso a lista de espera
                      </Button>
                    </div>
                  )}
                </>
              )}
              {mostrarResultados &&
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
            </div>
            {/* Modal de pago */}
            {turnoAConfirmar && (
              <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                  <h3 className="text-xl font-bold mb-4">
                    Debe pagar el turno para confirmarlo
                  </h3>
                  <p className="mb-4">
                    Médico: <b>{turnoAConfirmar.medico}</b> <br />
                    Especialidad: <b>{turnoAConfirmar.especialidad}</b> <br />
                    Fecha: <b>{turnoAConfirmar.fecha}</b> - Hora:{" "}
                    <b>{turnoAConfirmar.hora}</b>
                  </p>
                  <Button
                    className="w-full mb-2"
                    onClick={pagarYConfirmarTurno}
                  >
                    Pagar turno
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setTurnoAConfirmar(null)}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="perfil" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Mi Perfil</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Nombre Completo
                    </label>
                    <p className="text-lg">María García</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      DNI
                    </label>
                    <p className="text-lg">12.345.678</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Fecha de Nacimiento
                    </label>
                    <p className="text-lg">15/03/1985</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                  <CardDescription>
                    Puedes modificar estos datos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {editandoContacto ? (
                    <>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Email
                        </label>
                        <input
                          className="w-full mt-1 p-2 border rounded-lg"
                          value={contactoTemp.email}
                          onChange={(e) =>
                            setContactoTemp({
                              ...contactoTemp,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Teléfono
                        </label>
                        <input
                          className="w-full mt-1 p-2 border rounded-lg"
                          value={contactoTemp.telefono}
                          onChange={(e) =>
                            setContactoTemp({
                              ...contactoTemp,
                              telefono: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Dirección
                        </label>
                        <input
                          className="w-full mt-1 p-2 border rounded-lg"
                          value={contactoTemp.direccion}
                          onChange={(e) =>
                            setContactoTemp({
                              ...contactoTemp,
                              direccion: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="w-full"
                          onClick={() => {
                            setContacto(contactoTemp);
                            setEditandoContacto(false);
                          }}
                        >
                          Guardar
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            setContactoTemp(contacto);
                            setEditandoContacto(false);
                          }}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Email
                        </label>
                        <p className="text-lg">{contacto.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Teléfono
                        </label>
                        <p className="text-lg">{contacto.telefono}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Dirección
                        </label>
                        <p className="text-lg">{contacto.direccion}</p>
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => setEditandoContacto(true)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Modificar Datos de Contacto
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
