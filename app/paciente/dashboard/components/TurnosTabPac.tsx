import { useState } from "react";
import React from "react";
import { turnosAgendados, turnosDisponibles, medicos } from "../../../data/Info";
import ObrasSocialesMedico from "./ObrasSocialesMedico";
import { ListarTurnosAgendados } from "./ListarTurnosAgendados";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Search, Edit, X, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const TurnosTabPac = () => {
     const [activeTab, setActiveTab] = useState("mis-turnos");
    


     return (
          <div>
               <TabsContent value="mis-turnos" className="space-y-6">
                    <div className="flex justify-between items-center">
                         <h2 className="text-2xl font-bold">Mis Turnos Agendados</h2>
                         <Button onClick={() => setActiveTab("buscar-turnos")}>
                              <Calendar className="h-4 w-4 mr-2" />
                              Agendar Nuevo Turno
                         </Button>
                    </div>

                    <ListarTurnosAgendados></ListarTurnosAgendados>

               </TabsContent>


          </div>
     )
}

