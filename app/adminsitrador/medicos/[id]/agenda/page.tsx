"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Calendar, Clock, Save, Trash2 } from "lucide-react"
import  SideBar  from "./SideBar"
import { medico} from "@/app/data/Info"
import HeaderAgenda from "./HeaderAgenda"
import GeneralConfig from "./GeneralConfig"
import Timetables from "./Timetables"

// interface agendaProps{
//      duracionTurno: number;
//      fechaVigencia: string;
//      horarios: {
//           dia: string;
//           activo: boolean; 
//           horaInicio: string; 
//           horaFin: string }[];

// }

export default function MedicoAgenda() {
  const [agenda, setAgenda] = useState({
    duracionTurno: 30,
    fechaVigencia: "2024-12-31",
    horarios: [      // aca ira db
      { dia: "lunes", activo: true, horaInicio: "09:00", horaFin: "17:00" },
      { dia: "martes", activo: true, horaInicio: "09:00", horaFin: "17:00" },
      { dia: "miercoles", activo: false, horaInicio: "09:00", horaFin: "17:00" },
      { dia: "jueves", activo: true, horaInicio: "09:00", horaFin: "17:00" },
      { dia: "viernes", activo: true, horaInicio: "09:00", horaFin: "13:00" },
      { dia: "sabado", activo: false, horaInicio: "09:00", horaFin: "13:00" },
      { dia: "domingo", activo: false, horaInicio: "09:00", horaFin: "13:00" },
    ],
  })

  const medicoData = medico;

// fin de datos

  
  return (
    <div className="min-h-screen bg-background">


      {/* Header */}
      <HeaderAgenda medico={ medicoData }></HeaderAgenda>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 space-y-6">

            {/* Configuración General */}
            <GeneralConfig setAgenda= { setAgenda } agenda={agenda }></GeneralConfig>

            {/* Horarios por Día */}
            <Timetables setAgenda= { setAgenda } agenda={agenda} ></Timetables>

          </div>
<SideBar agenda={agenda} ></SideBar>
        </div>
      </div>
    </div>
  )
}
