import React from 'react'
import { useState } from "react";
import {
     Card,
     CardContent,
     CardDescription,
     CardHeader,
     CardTitle,
} from "@/components/ui/card";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditarContacto from "./EditarContacto";

const InfoPaciente = () => {

     // Estado para los datos de contacto
     const [contacto, setContacto] = useState({ //mpck data
          email: "maria.garcia@email.com",
          telefono: "+54 11 1234-5678",
          direccion: "Av. Corrientes 1234, CABA",
     });
     const [editandoContacto, setEditandoContacto] = useState(false);
     const [contactoTemp, setContactoTemp] = useState(contacto);



     return (
          <Card>
               <CardHeader>
                    <CardTitle>Información de Contacto</CardTitle>
                    <CardDescription>Puedes modificar estos datos</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                    {editandoContacto ? (
                         <EditarContacto
                              contactoTemp={contactoTemp}
                              setContactoTemp={setContactoTemp}
                              setContacto={setContacto}
                              setEditandoContacto={setEditandoContacto}
                              contacto={contacto}
                         />
                    ) : (
                         <>
                              <div>
                                   <label className="text-sm font-medium text-muted-foreground">
                                        Email
                                   </label>
                                   <p className="text-lg">{contacto.email}</p>
                              </div>
                              <div>
                                   <label className="text-sm font-medium text-muted-foreground">
                                        Teléfono
                                   </label>
                                   <p className="text-lg">{contacto.telefono}</p>
                              </div>
                              <div>
                                   <label className="text-sm font-medium text-muted-foreground">
                                        Dirección
                                   </label>
                                   <p className="text-lg">{contacto.direccion}</p>
                              </div>
                              <Button
                                   className="w-full"
                                   onClick={() => setEditandoContacto(true)}
                              >
                                   <Edit className="h-4 w-4 mr-2" />
                                   Modificar Datos de Contacto
                              </Button>
                         </>
                    )}
               </CardContent>
          </Card>
     )
}

export default InfoPaciente
