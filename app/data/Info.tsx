export const turnosAgendados = [
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
];

export const turnosDisponibles = [
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
];

export const medicos = [
  {
    nombre: "Dr. Carlos López",
    especialidad: "Cardiología",
    obrasSociales: [
      { id: 1, nombre: "OSDE", codigo: "OSDE001", activa: true },
      { id: 2, nombre: "Swiss Medical", codigo: "SWISS001", activa: true },
      { id: 3, nombre: "Galeno", codigo: "GAL001", activa: false },
    ],
  },
  { nombre: "Dr. Maria Ross ", especialidad: "Cardiología", obrasSociales: [] },
  { nombre: "Dr. Martin Guerrero", especialidad: "Cardiología", obrasSociales: [] },
  { nombre: "Dra. Ana Martínez", especialidad: "Pediatría", obrasSociales: [] },
  { nombre: "Dra. Perez Lopez", especialidad: "Pediatría", obrasSociales: [] },
  { nombre: "Dra. Jose Armando", especialidad: "Pediatría", obrasSociales: [] },
  { nombre: "Dr. Luis Rodríguez", especialidad: "Traumatología", obrasSociales: [] },
  { nombre: "Dr. Marcos Lucas", especialidad: "Traumatología", obrasSociales: [] },
  { nombre: "Dr. Rodrigo Alfonso", especialidad: "Traumatología", obrasSociales: [] },
];
