import React from 'react'
import { turnosAgendados } from '@/app/data/Info'

interface Filters {
     medico?: string;
     fechaInicio?: string;
     fechaFin?: string;
}

interface Props {
     filters: Filters;
     onChange: (next: Filters) => void;
}

const FiltrosTurnos: React.FC<Props> = ({ filters, onChange }) => {
     const medicos = Array.from(new Set(turnosAgendados.map(t => t.medico)));

     return (
          <>
               <p className="text-lg font-semibold mb-2">Filtrar por:</p>
               <div className="flex flex-row gap-6" >
                    <div>
                         <label htmlFor="medico" className="block text-sm font-medium text-gray-700 mb-1">Médico</label>
                         <select
                              id="medico"
                              name="medico"
                              className="border rounded px-2 py-1 w-full"
                              value={filters.medico || ""}
                              onChange={(e) => onChange({ ...filters, medico: e.target.value || undefined })}>
                              <option value="">Todos</option>
                              {medicos.map((medico) => (
                                   <option key={medico} value={medico}>{medico}</option>
                              ))}
                         </select>
                    </div>

                    <div>
                         <label htmlFor="fechaInicio" className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio</label>
                         <input
                              type="date"
                              id="fechaInicio"
                              name="fechaInicio"
                              className="border rounded px-2 py-1 w-full"
                              value={filters.fechaInicio || ""}
                              onChange={(e) => onChange({ ...filters, fechaInicio: e.target.value || undefined })}
                         />
                    </div>

                    <div>
                         <label htmlFor="fechaFin" className="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
                         <input
                              type="date"
                              id="fechaFin"
                              name="fechaFin"
                              className="border rounded px-2 py-1 w-full"
                              value={filters.fechaFin || ""}
                              onChange={(e) => onChange({ ...filters, fechaFin: e.target.value || undefined })}
                         />
                    </div>
               </div>
          </>
     )
}

export default FiltrosTurnos
