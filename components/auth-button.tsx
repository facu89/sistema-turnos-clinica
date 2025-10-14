import Link from "next/link";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // Función para obtener el rol del usuario y la URL del dashboard
  const getUserRoleAndDashboard = async (email: string) => {
    // Buscar en profiles (pacientes)
    const { data: profileData } = await supabase
      .from("profiles")
      .select("user_type")
      .eq("email", email)
      .single();

    if (profileData) {
      return profileData.user_type === "Administrador"
        ? "/adminsitrador/dashboard"
        : "/paciente/dashboard";
    }

    // Buscar en profiles_administrativos
    const { data: adminData } = await supabase
      .from("profiles_administrativos")
      .select("*")
      .eq("email", email)
      .single();

    if (adminData) {
      return "/adminsitrador/dashboard";
    }

    return "/paciente/dashboard";
  };

  // Si hay usuario, redirigir automáticamente
  if (user?.email) {
    const dashboardUrl = await getUserRoleAndDashboard(user.email);
    redirect(dashboardUrl);
  }

  // Solo mostrar botones de login/signup si no hay usuario
  return (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/auth/login">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/auth/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
