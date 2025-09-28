import React from "react";

interface ObraSocial {
  id: number;
  nombre: string;
  codigo: string;
  activa: boolean;
}


interface ObrasSocialesMedicoProps {
  obrasSociales: ObraSocial[] | undefined;
}

const ObrasSocialesMedico = ({ obrasSociales }: ObrasSocialesMedicoProps) => {
  return (
//      <>
//      { obrasSociales?.length === 0 && (<p className="mb-2">El médico solo atiende particular .</p>
//      )}
//      <label htmlFor="obrasSocialesMedico" className="block mb-1 font-medium">
//       Obras Sociales del Médico:
//     </label>
//     <select
//       id="obrasSocialesMedico"
//       name="obrasSocialesMedico"
//       className="w-full mb-2 p-2 border border-gray-300 rounded"
//     >
//       {obrasSociales?.map((obraSocial) => (
//         <option key={obraSocial.id} value={obraSocial.id}>
//           {obraSocial.nombre} 
//         </option>
//       ))}
//     </select>
//     </>
<>
  <label htmlFor="obrasSocialesMedico" className="block mb-1 font-medium">
       Obras Sociales del Médico:
     </label>
     <select
       id="obrasSocialesMedico"
       name="obrasSocialesMedico"
       className="w-full mb-2 p-2 border border-gray-300 rounded"
     >
    <option > OSDE</option> 
     <option > Swiss Medical</option>
     <option > Galeno</option>
     <option> Particular </option>
    </select>
    </>
  );
};

export default ObrasSocialesMedico;
