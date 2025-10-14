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


export const PerfilTab = () => {
  // Estado para los datos de contacto
  const [contacto, setContacto] = useState({ //mock data
    email: "maria.garcia@email.com",
    telefono: "+54 11 1234-5678",
    direccion: "Av. Corrientes 1234, CABA",
  });
 

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
              <p className="text-lg">María García</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                DNI
              </label>
              <p className="text-lg">12.345.678</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Fecha de Nacimiento
              </label>
              <p className="text-lg">15/03/1985</p>
            </div>
          </CardContent>
        </Card>

        <InfoPaciente/>
      </div>
    </TabsContent>
  );
};
