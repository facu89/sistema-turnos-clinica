import React from 'react'
import {  UserCheck, Calendar} from "lucide-react"


const AditionalFeatures = () => {
  return (
    <>
    {/* Features */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="space-y-2">
            <Calendar className="h-8 w-8 text-secondary mx-auto" />
            <p className="text-sm text-muted-foreground">Gestión de Turnos</p>
          </div>
          <div className="space-y-2">
            <UserCheck className="h-8 w-8 text-accent mx-auto" />
            <p className="text-sm text-muted-foreground">Control de Pacientes</p>
          </div>
        </div>
    </>
  )
}

export default AditionalFeatures
