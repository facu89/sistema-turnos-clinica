import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TabsContent } from "@/components/ui/tabs"
import { Clock } from "lucide-react"
import {turnosAgendados } from '@/app/data/Info'
import { pacientes } from '../../data/Info';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import FiltrosTurnos from './FiltrosTurnos';

export const TurnosTab = () => {
  return (
    <>
      

    <TabsContent value="turnos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Gestión de Turnos</h2>
            </div>
<FiltrosTurnos></FiltrosTurnos>
    <Table className="w-full text-sm">
      <TableHeader>
        <TableRow>
          <TableHead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">Paciente</TableHead>
          <TableHead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">Médico</TableHead>
          <TableHead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">Fecha</TableHead>
          <TableHead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">Hora</TableHead>
          <TableHead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">Consultorio</TableHead>
          <TableHead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"> Acciones</TableHead>
        
        </TableRow>
      </TableHeader>
      <TableBody>
        {turnosAgendados.map((turno) => (
          <TableRow key={turno.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <TableCell>{turno.paciente}</TableCell>
            <TableCell>{turno.medico}</TableCell>
            <TableCell>{turno.fecha}</TableCell>
            <TableCell>{turno.hora}</TableCell>
            <TableCell>{turno.direccion}</TableCell>
            <TableCell>  <Button
                          variant="outline"
                          size="sm"
                          onClick={() => (window.location.href = `/admin/turnos/${turno.id}`)}
                        >
                          Ver Detalle
                        </Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
          </TabsContent>
    </>

  )
}

