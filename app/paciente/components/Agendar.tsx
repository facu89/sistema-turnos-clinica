import React from 'react'
import { Button } from "@/components/ui/button";
import ObrasSocialesMedico from './ObrasSocialesMedico';


interface AgendarProps {
     turnoAConfirmar: any;
     setTurnoAConfirmar: React.Dispatch<React.SetStateAction<any>>;
     setTurnosAgendados: React.Dispatch<React.SetStateAction<any[]>>;
     setTurnosDisponibles: React.Dispatch<React.SetStateAction<any[]>>;
}

const Agendar = ({ turnoAConfirmar, setTurnoAConfirmar, setTurnosAgendados, setTurnosDisponibles }: AgendarProps) => {

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
          <>

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

                         <ObrasSocialesMedico
                              obrasSociales={turnoAConfirmar.medico.obrasSociales}
                         ></ObrasSocialesMedico>

                         {/* que aparezca pagar solo si eligio particular */}
                         <Button className="w-full mb-2" onClick={pagarYConfirmarTurno}>
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

          </>
     )
}

export default Agendar
