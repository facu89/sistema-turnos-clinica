
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {User, Phone, Mail, MapPin } from "lucide-react"

// import InfoPaciente from "./InfoPaciente"

const InfoPaciente = ({ turno }: any) => {
     return (
          <>
               <Card>
                    <CardHeader>
                         <CardTitle className="flex items-center gap-2">
                              <User className="h-5 w-5" />
                              Información del Paciente
                         </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                   <p className="text-sm text-muted-foreground">Nombre completo</p>
                                   <p className="font-medium">{turno.paciente.nombre}</p>
                              </div>
                              <div>
                                   <p className="text-sm text-muted-foreground">DNI</p>
                                   <p className="font-medium">{turno.paciente.dni}</p>
                              </div>
                              <div className="flex items-center gap-2">
                                   <Mail className="h-4 w-4 text-muted-foreground" />
                                   <div>
                                        <p className="text-sm text-muted-foreground">Email</p>
                                        <p className="font-medium">{turno.paciente.email}</p>
                                   </div>
                              </div>
                              <div className="flex items-center gap-2">
                                   <Phone className="h-4 w-4 text-muted-foreground" />
                                   <div>
                                        <p className="text-sm text-muted-foreground">Teléfono</p>
                                        <p className="font-medium">{turno.paciente.telefono}</p>
                                   </div>
                              </div>
                              <div className="flex items-center gap-2">
                                   <MapPin className="h-4 w-4 text-muted-foreground" />
                                   <div>
                                        <p className="text-sm text-muted-foreground">Dirección</p>
                                        <p className="font-medium">{turno.paciente.direccion}</p>
                                   </div>
                              </div>

                         </div>
                    </CardContent>
               </Card>

          </>
     )
}

export default InfoPaciente
