export const turnosAgendados = [
  {
    id: 1,
    medico: "Dr. Carlos López",
    especialidad: "Cardiología",
    fecha: "2024-01-15",
    hora: "10:30",
    direccion: "Consultorio 201",
    paciente: "María García",
  },
  {
    id: 2,
    medico: "Dra. Ana Martínez",
    especialidad: "Pediatría",
    fecha: "2024-01-22",
    hora: "14:00",
    direccion: "Consultorio 105",
    paciente: "Juan Pérez",
  },
  {
    id: 3,
    medico: "Dr. Luis Rodríguez",
    especialidad: "Traumatología",
    fecha: "2024-01-28",
    hora: "09:15",
    direccion: "Consultorio 302",
    paciente: "Ana Silva",
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

export const medico = [
  {
    nombre: "Dr. Carlos López",
    especialidad: "Cardiología",
    activo: true,
    obrasSociales: [
      { id: 1, nombre: "OSDE", codigo: "OSDE001", activa: true },
      { id: 2, nombre: "Swiss Medical", codigo: "SWISS001", activa: true },
      { id: 3, nombre: "Galeno", codigo: "GAL001", activa: false },
    ],
  },
  { nombre: "Dr. Maria Ross", especialidad: "Cardiología", activo: true, obrasSociales: [] },
  { nombre: "Dr. Martin Guerrero", especialidad: "Cardiología", activo: false, obrasSociales: [] },
  { nombre: "Dra. Ana Martínez", especialidad: "Pediatría", activo: true, obrasSociales: [] },
  { nombre: "Dra. Perez Lopez", especialidad: "Pediatría", activo: false, obrasSociales: [] },
  { nombre: "Dra. Jose Armando", especialidad: "Pediatría", activo: true, obrasSociales: [] },
  { nombre: "Dr. Luis Rodríguez", especialidad: "Traumatología", activo: true, obrasSociales: [] },
  { nombre: "Dr. Marcos Lucas", especialidad: "Traumatología", activo: false, obrasSociales: [] },
  { nombre: "Dr. Rodrigo Alfonso", especialidad: "Traumatología", activo: true, obrasSociales: [] },
];

export const turnoPaciente=  {
    id: 1,
    paciente: {
      nombre: "María García",
      dni: "12.345.678",
      email: "maria.garcia@email.com",
      telefono: "+54 11 1234-5678",
      direccion: "Av. Corrientes 1234, CABA",
      obraSocial: "OSDE",
    },
    medico: {
      nombre: "Dr. Carlos López",
      especialidad: "Cardiología",
      consultorio: "201",
    },
    fecha: "2024-01-15",
    hora: "10:30",
    duracion: "30 min",
    estado: "confirmado",
    motivo: "Control cardiológico de rutina",
    observaciones: "Paciente con antecedentes de hipertensión",
  }

export const obrasSociales = [
                { id: 1, nombre: "OSDE", codigo: "OSDE001", activa: true },
                { id: 2, nombre: "Swiss Medical", codigo: "SWISS001", activa: true },
                { id: 3, nombre: "Galeno", codigo: "GAL001", activa: false },
              ]


              export const pacientes= [
                { id: 1, nombre: "María García", email: "maria@email.com", telefono: "+54 11 1234-5678", ausencias: 0 },
                { id: 2, nombre: "Juan Pérez", email: "juan@email.com", telefono: "+54 11 8765-4321", ausencias: 2 },
                { id: 3, nombre: "Ana Silva", email: "ana@email.com", telefono: "+54 11 5555-5555", ausencias: 1 },
              ]