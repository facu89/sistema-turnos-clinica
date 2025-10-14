import React from "react";
import { Stethoscope, LogOut } from "lucide-react";
import { LogoutButton } from "@/components/logout-button";
import { useState } from "react";
import {
  turnosAgendados,
  turnosDisponibles,
  medicos,
} from "../../../data/Info";

const HeaderPaciente = () => {
  const [turnos, setTurnos] = useState(turnosAgendados);
  const [disponibles, setDisponibles] = useState(turnosDisponibles);
  return (
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
          <LogoutButton />
        </div>
      </div>
    </header>
  );
};

export default HeaderPaciente;
