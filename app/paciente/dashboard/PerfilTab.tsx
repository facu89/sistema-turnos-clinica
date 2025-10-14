import React from "react";
import InfoPaciente from '../components/InfoPaciente';
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { pacientes } from "@/app/data/Info";


export const PerfilTab = ({ contactoPaciente }: any ) => { 
  //aca paciente esta para representar llo que traeria la bd, que seria datos de contacto del paciente como parametro .
  
  // Estado para los datos de contacto
  const [contacto, setContacto] = useState( //mock data
    pacientes[0]);
 

  return (
    <TabsContent value="perfil" className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mi Perfil</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Nombre Completo
              </label>
              <p className="text-lg">{contacto.nombre}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                DNI
              </label>
              <p className="text-lg">{contacto.dni}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Fecha de Nacimiento
              </label>
              <p className="text-lg">{contacto.fecha_nac}</p>
            </div>
          </CardContent>
        </Card>

        <InfoPaciente/>
      </div>
    </TabsContent>
  );
};
