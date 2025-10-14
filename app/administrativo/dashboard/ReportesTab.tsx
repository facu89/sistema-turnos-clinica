import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { FileText } from "lucide-react";
import { medico } from "@/app/data/Info";//simula bd

export const ReportesTab = () => {
  return (
    <TabsContent value="reportes" className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Reportes</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Generar Reporte de Turnos</CardTitle>
          <CardDescription>
            Genera un reporte detallado de turnos por fecha y médico
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Fecha Inicio</label>
              <input
                type="date"
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Fecha Fin</label>
              <input
                type="date"
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Médico</label>
              <select className="w-full mt-1 p-2 border rounded-lg">
                <option>Todos los médicos</option>
                {medico
                  .filter((m) => m.activo)//solo muestra los activos
                  .map((m) => (
                    <option key={m.nombre} value={m.nombre}>
                      {/* deberia ir el legajo pero no esta en la mock data */}
                      {m.nombre} - {m.especialidad}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <Button className="w-full">
            <FileText className="h-4 w-4 mr-2" />
            Generar Reporte
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};
