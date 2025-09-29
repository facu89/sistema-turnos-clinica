import React from 'react'
import {Card,CardContent,} from "@/components/ui/card";
import {Calendar,Clock,} from "lucide-react";

export const StatCards = () => {
  return (
         <>
          <div className="grid grid-cols-2 gap-6 mb-8">
               <Card>
               <CardContent className="p-6">
               <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-muted-foreground">
                         Próximo Turno
                    </p>
                    <p className="text-lg font-bold">Mañana 10:30</p>
                    <p className="text-sm text-muted-foreground">Dr. López</p>
                    </div>
                    <Calendar className="h-8 w-8 text-primary" />
               </div>
               </CardContent>
               </Card>
               <Card>
               <CardContent className="p-6">
               <div className="flex items-center justify-between">
                    <div>
                    <p className="text-sm font-medium text-muted-foreground">
                         Turnos Este Mes
                    </p>
                    <p className="text-2xl font-bold">3</p>
                    </div>
                    <Clock className="h-8 w-8 text-secondary" />
               </div>
               </CardContent>
               </Card>
               
          </div>
          </>
)
}

