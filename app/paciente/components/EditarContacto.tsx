import React from "react";
import { Button } from "@/components/ui/button";

interface EditarContactoProps {
  contactoTemp: {
    email: string;
    telefono: string;
    direccion: string;
  };
  setContactoTemp: React.Dispatch<React.SetStateAction<any>>;
  setContacto: React.Dispatch<React.SetStateAction<any>>;
  setEditandoContacto: React.Dispatch<React.SetStateAction<boolean>>;
  contacto: {
    email: string;
    telefono: string;
    direccion: string;
  };
}

const EditarContacto: React.FC<EditarContactoProps> = ({
  contactoTemp,
  setContactoTemp,
  setContacto,
  setEditandoContacto,
  contacto,
}) => (
  <>
    <div>
      <label className="text-sm font-medium text-muted-foreground">
        Email
      </label>
      <input
        className="w-full mt-1 p-2 border rounded-lg"
        value={contactoTemp.email}
        onChange={(e) =>
          setContactoTemp({
            ...contactoTemp,
            email: e.target.value,
          })
        }
      />
    </div>
    <div>
      <label className="text-sm font-medium text-muted-foreground">
        Teléfono
      </label>
      <input
        className="w-full mt-1 p-2 border rounded-lg"
        value={contactoTemp.telefono}
        onChange={(e) =>
          setContactoTemp({
            ...contactoTemp,
            telefono: e.target.value,
          })
        }
      />
    </div>
    <div>
      <label className="text-sm font-medium text-muted-foreground">
        Dirección
      </label>
      <input
        className="w-full mt-1 p-2 border rounded-lg"
        value={contactoTemp.direccion}
        onChange={(e) =>
          setContactoTemp({
            ...contactoTemp,
            direccion: e.target.value,
          })
        }
      />
    </div>
    <div className="flex gap-2">
      <Button
        className="w-full"
        onClick={() => {
          setContacto(contactoTemp);
          setEditandoContacto(false);
        }}
      >
        Guardar
      </Button>
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setContactoTemp(contacto);
          setEditandoContacto(false);
        }}
      >
        Cancelar
      </Button>
    </div>
  </>
);

export default EditarContacto;