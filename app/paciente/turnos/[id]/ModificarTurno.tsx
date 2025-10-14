import React from 'react'
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ModificarTurnoProps {
     turnoAModificar: any;
     setTurnoAModificar: React.Dispatch<React.SetStateAction<any>>;
     turnosParaModificar: any[];
     seleccionarNuevoTurno: (nuevoTurno: any) => void;
}

export const ModificarTurno = ({ turnoAModificar,turnosParaModificar,setTurnoAModificar,seleccionarNuevoTurno }: ModificarTurnoProps) => {


  return (
    <>
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
    </>
  )
}

