import React from "react";
import { Button } from "@/components/ui/button";

interface NoMatchesProps {
  filtroEspecialidad: string;
}

const NoMatches: React.FC<NoMatchesProps> = ({ filtroEspecialidad }) => (
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
            alert("Solicitud de ingreso a lista de espera enviada.")
          }
        >
          Solicitar ingreso a lista de espera
        </Button>
      </div>
    )}
  </>
);

export default NoMatches;