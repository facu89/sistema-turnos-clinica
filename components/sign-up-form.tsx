"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
//import { createClient as createServerClient } from "@/lib/supabase/server";
export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [name, setName] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [dni, setDni] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    // const supabaseAdmin = createServerClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Iniciando registro con email:", email); // Para debug

      // 1. Verificar si el email ya existe en profiles
      const { data: existingEmail, error: emailCheckError } = await supabase
        .from("profiles")
        .select("email")
        .eq("email", email.trim().toLowerCase())
        .maybeSingle();

      if (emailCheckError) {
        console.error("Error al verificar email:", emailCheckError);
        throw new Error("Error al verificar email: " + emailCheckError.message);
      }

      if (existingEmail) {
        setError("Este email ya está registrado en el sistema.");
        setIsLoading(false);
        return;
      }

      console.log("Email disponible, verificando DNI..."); // Para debug

      // 2. Verificar si el DNI ya existe
      const { data: existingProfile, error: dniCheckError } = await supabase
        .from("profiles")
        .select("dni")
        .eq("dni", dni)
        .maybeSingle();

      // Solo es error si hay un problema real con la consulta, no si no encuentra nada
      if (dniCheckError) {
        console.error("Error al verificar DNI:", dniCheckError);
        throw new Error("Error al verificar DNI: " + dniCheckError.message);
      }

      // Si existingProfile tiene datos, significa que el DNI ya existe
      if (existingProfile) {
        console.log("DNI ya existe:", existingProfile);
        setError("El DNI ingresado ya está registrado en el sistema.");
        setIsLoading(false);
        return;
      }

      console.log("DNI disponible, verificaciones completadas"); // Para debug
      console.log("Verificaciones pasadas, creando usuario..."); // Para debug

      // 3. Crear el usuario
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
      });

      console.log("Resultado de signUp:", { authData, authError }); // Para debug

      if (authError) {
        console.error("Error de auth:", authError); // Para debug
        throw authError;
      }

      // 4. Verificar que el usuario se creó
      if (!authData.user) {
        setError("No se pudo crear el usuario. Intenta con otro email.");
        setIsLoading(false);
        return;
      }

      console.log("Usuario creado exitosamente:", authData.user.id);
      console.log("Insertando perfil con datos:", {
        id: authData.user.id,
        email: email.trim().toLowerCase(),
        first_name: name,
        last_name: apellido,
        dni: dni,
        phone: telefono,
        birth_date: fechaNacimiento,
        user_type: "Paciente",
      });

      // 5. Crear el perfil
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: authData.user.id,
          email: email.trim().toLowerCase(),
          first_name: name,
          last_name: apellido,
          dni: dni,
          phone: telefono,
          birth_date: fechaNacimiento,
          user_type: "Paciente",
        });

      console.log("Resultado insert perfil:", { profileData, profileError });

      if (profileError) {
        console.error("Error detallado de perfil:", profileError);

        if (profileError.code === "23505") {
          setError("El DNI ya está registrado en el sistema.");
        } else if (profileError.code === "42501") {
          setError("Error de permisos al crear el perfil.");
        } else {
          setError(`Error al crear perfil: ${profileError.message}`);
        }
        setIsLoading(false);
        return;
      }

      console.log("Registro exitoso!"); // Para debug
      router.push("../paciente");
    } catch (error: unknown) {
      console.error("Error en catch:", error); // Para debug
      setError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error inesperado al crear la cuenta"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>Create a new account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="repeat-password">Repeat Password</Label>
                </div>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="name">Nombre</Label>
                </div>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="apellido">Apellido</Label>
                </div>
                <Input
                  id="apellido"
                  type="text"
                  required
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="telefono"> Telefono </Label>
                </div>
                <Input
                  id="telefono"
                  type="text"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                />
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="dni">DNI</Label>
                  </div>
                  <Input
                    id="dni"
                    type="text"
                    required
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="fechaNacimiento">Fecha de nacimiento</Label>
                </div>
                <Input
                  id="fechaNacimiento"
                  type="date"
                  required
                  value={fechaNacimiento}
                  onChange={(e) => setFechaNacimiento(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating an account..." : "Sign up"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
