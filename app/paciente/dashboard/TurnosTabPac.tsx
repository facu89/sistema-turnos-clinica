import React from "react";
import { ListarTurnosAgendados } from "../turnos/[id]/ListarTurnosAgendados";
import { TabsContent } from "@/components/ui/tabs";


export const TurnosTabPac = () => {
    


     return (
          <div>
               <TabsContent value="mis-turnos" className="space-y-6">
                    <div className="flex justify-between items-center">
                         <h2 className="text-2xl font-bold">Mis Turnos Agendados</h2>
                         
                    </div>

                    <ListarTurnosAgendados></ListarTurnosAgendados>

               </TabsContent>


          </div>
     )
}

