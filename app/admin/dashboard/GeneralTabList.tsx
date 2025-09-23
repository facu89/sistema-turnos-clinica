import React from 'react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Users,
  Calendar,
  UserPlus,
  FileText,
  Heart,
  Clock,
} from "lucide-react"
import { TurnosTab } from './TurnosTab'
import PacienteTab from './PacienteTab'
import { MedicoTab } from './MedicoTab'
import { ObraSocialTab } from './ObraSocialTab'
import { ReportesTab } from './ReportesTab'


export const GeneralTabList = () => {
  const [activeTab, setActiveTab] = useState("turnos")

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="turnos">Turnos</TabsTrigger>
            <TabsTrigger value="pacientes">Pacientes</TabsTrigger>
            <TabsTrigger value="medicos">Médicos</TabsTrigger>
            <TabsTrigger value="obras-sociales">Obras Sociales</TabsTrigger>
            <TabsTrigger value="reportes">Reportes</TabsTrigger>
          </TabsList>

              <TurnosTab></TurnosTab>
              <PacienteTab></PacienteTab>
            <MedicoTab></MedicoTab>
          <ObraSocialTab></ObraSocialTab>
          <ReportesTab></ReportesTab>
          
        </Tabs>

  )
}

