"use client";
import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs } from "@/components/ui/tabs";

import { z } from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .trim(),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

const LoginForm = () => {
  const [userType, setUserType] = useState<"paciente" | "administrativo">(
    "paciente"
  );

  // Estados para los inputs - MOVIDOS DENTRO DEL COMPONENTE
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getEmailInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const getPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      {/* Login Form */}
      <Card className="border-2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
          <CardDescription className="text-center">
            Ingresa tus datos para acceder al sistema
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs
            value={userType}
            onValueChange={(value) =>
              setUserType(value as "paciente" | "administrativo")
            }
            className="w-full"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-user">Email</Label>
                <Input
                  id="email-user"
                  type="email"
                  placeholder="tu@email.com"
                  className="h-11"
                  value={email}
                  onChange={getEmailInput}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password-user">Contraseña</Label>
                <Input
                  id="password-user"
                  type="password"
                  className="h-11"
                  value={password}
                  onChange={getPasswordInput}
                />
              </div>

              {/* BOTONES PROVISORIOS */}
              <Button
                className="w-full h-11"
                onClick={() => {
                  const formData = {
                    email: email,
                    password: password,
                  };
                  const result = SignupFormSchema.safeParse(formData);
                  if (!result.success) {
                    console.log(result.error.format()); // muestra los mensajes de error
                  } else {
                    console.log("✅ Datos válidos:", result.data);
                  }
                  window.location.href = "../paciente/dashboard";
                }}
              >
                Ingresar a paciente
              </Button>

              <Button
                className="w-full h-11"
                onClick={() =>
                  (window.location.href = "../adminsitrador/dashboard")
                }
              >
                Ingresar como Administrativo
              </Button>

              {/* FIN BP */}

              <div className="text-center">
                <Button variant="link" className="text-sm">
                  ¿No tienes cuenta? Regístrate aquí
                </Button>
              </div>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};

export default LoginForm;
