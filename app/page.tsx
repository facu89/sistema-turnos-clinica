"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stethoscope, UserCheck, Calendar, Shield } from "lucide-react"

export default function LoginPage() {
  const [userType, setUserType] = useState<"paciente" | "administrativo">("paciente")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-primary/10 p-4 rounded-full">
              <Stethoscope className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-balance">ClinicaTurnos</h1>
            <p className="text-muted-foreground text-pretty">Sistema de gestión médica integral</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">Ingresa tus credenciales para acceder al sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={userType}
              onValueChange={(value) => setUserType(value as "paciente" | "administrativo")}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="paciente" className="flex items-center gap-2">
                  <UserCheck className="h-4 w-4" />
                  Paciente
                </TabsTrigger>
                <TabsTrigger value="administrativo" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Administrativo
                </TabsTrigger>
              </TabsList>

              <TabsContent value="paciente" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-paciente">Email</Label>
                  <Input id="email-paciente" type="email" placeholder="tu@email.com" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-paciente">Contraseña</Label>
                  <Input id="password-paciente" type="password" className="h-11" />
                </div>
                <Button className="w-full h-11" onClick={() => (window.location.href = "/paciente/dashboard")}>
                  Ingresar como Paciente
                </Button>
                <div className="text-center">
                  <Button variant="link" className="text-sm">
                    ¿No tienes cuenta? Regístrate aquí
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="administrativo" className="space-y-4">
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
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

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
      </div>
    </div>
  )
}
