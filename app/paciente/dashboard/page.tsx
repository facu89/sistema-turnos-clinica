"use client";
import { useState } from "react";
import { Tabs ,TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeaderPaciente from "./components/HeaderPaciente";
import { turnosAgendados, turnosDisponibles, medicos } from "../../data/Info";
import {StatCards} from './StatCards';
import { TurnosTabPac } from "./components/TurnosTabPac";
import PerfilTab from "./components/PerfilTab";
import TurnosLibresTab from "./components/TurnosLibresTab";


export default function PacienteDashboard() {
  const [activeTab, setActiveTab] = useState("mis-turnos");

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
