import React from 'react'
import { turnosAgendados } from '@/app/data/Info'

const FiltrosTurnos = () => {
     return (
          <>
               <p className="text-lg font-semibold mb-2">Filtrar por:</p>
               <div className="flex flex-row gap-6" >
                    <div>
                         <label htmlFor="medico" className="block text-sm font-medium text-gray-700 mb-1">Médico</label>
                         <select id="medico" name="medico" className="border rounded px-2 py-1 w-full">
                              <option value="">Todos</option>
                              {Array.from(new Set(turnosAgendados.map(t => t.medico))).map((medico) => (
                                   <option key={medico} value={medico}>{medico}</option>
                              ))}
                         </select>
                    </div>
                    <div>
                         <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
                         <input type="date" id="fechaInicio" name="fechaInicio" className="border rounded px-2 py-1 w-full" />
                    </div>
                    {/* Fecha fin */}
                    <div>
                         <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
                         <input type="date" id="fechaFin" name="fechaFin" className="border rounded px-2 py-1 w-full" />
                    </div>
               </div>
          </>
     )
}

export default FiltrosTurnos
