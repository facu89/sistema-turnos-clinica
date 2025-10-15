import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await request.json();

    console.log("API: Eliminando usuario completo:", userId);

    // 1. Eliminar de profiles_administrativos PRIMERO
    const { error: profileError } = await supabaseAdmin
      .from("profiles_administrativos")
      .delete()
      .eq("id", userId);

    if (profileError) {
      console.error("Error eliminando perfil:", profileError);
      // No falla si no existe el perfil
    }

    // 2. Luego eliminar de auth.users
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(
      userId
    );

    if (authError) {
      console.error("Error Supabase admin:", authError);
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    console.log("Usuario eliminado completamente");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en API delete-user:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
