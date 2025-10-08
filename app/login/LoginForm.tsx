"use client"
import React from 'react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs } from "@/components/ui/tabs"

const LoginForm = () => {
     const [userType, setUserType] = useState<"paciente" | "administrativo">("paciente")

     return (
          <>

               {/* Login Form */}
               <Card className="border-2">
                    <CardHeader className="space-y-1">
                         <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
                         <CardDescription className="text-center">Ingresa tus datos para acceder al sistema</CardDescription>
                    </CardHeader>

                    <CardContent>
                         <Tabs
                              value={userType}
                              onValueChange={(value) => setUserType(value as "paciente" | "administrativo")}
                              className="w-full"
                         >
                              {/* <TabsList className="grid w-full grid-cols-2 mb-6"> */}
                                   {/* <TabsTrigger value="paciente" className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Paciente
                </TabsTrigger>
                <TabsTrigger value="administrativo" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Administrativo
                </TabsTrigger> */}
                              {/* </TabsList> */}

                              {/* <TabsContent value="user" className="space-y-4"> */}
                                   <div className="space-y-2">
                                        <Label htmlFor="email-user">Email</Label>
                                        <Input id="email-user" type="email" placeholder="tu@email.com" className="h-11" />
                                   </div>
                                   <div className="space-y-2">
                                        <Label htmlFor="password-user">Contraseña</Label>
                                        <Input id="password-user" type="password" className="h-11" />
                                   </div>
                                   {/* BOTONES PROVISORIOS */}
                                   <Button className="w-full h-11" onClick={() => (window.location.href = "../paciente/dashboard")}>
                                        {/* este va directo a paciente hasta que hagamos la conexion a bd */}
                                        Ingresar a paciente
                                   </Button>

                                   <Button className="w-full h-11" onClick={() => (window.location.href = "../adminsitrador/dashboard")}>
                                        Ingresar como Administrativo
                                   </Button>

                                   {/* FIN BP */}

                                   <div className="text-center">
                                        <Button variant="link" className="text-sm">
                                             ¿No tienes cuenta? Regístrate aquí
                                        </Button>
                                   </div>
                              {/* </TabsContent> */}

                              {/* <TabsContent value="administrativo" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-admin">Email Administrativo</Label>
                  <Input id="email-admin" type="email" placeholder="admin@clinica.com" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-admin">Contraseña</Label>
                  <Input id="password-admin" type="password" className="h-11" />
                </div>
                <Button className="w-full h-11" onClick={() => (window.location.href = "/admin/dashboard")}>
                  Ingresar como Administrativo
                </Button>
              </TabsContent> */}
                         </Tabs>
                    </CardContent>
               </Card>
          </>
     )
}

export default LoginForm
