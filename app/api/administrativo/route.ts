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

    // 1. PRIMERO eliminar de auth.users
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(
      userId
    );

    if (authError) {
      console.error("Error Supabase admin:", authError);
      return NextResponse.json({ error: authError.message }, { status: 500 });
    }

    console.log(" Usuario eliminado de auth.users:", userId);

    // 2. DESPUÉS eliminar de profiles_administrativos (por si acaso CASCADE no funcionó)
    const { error: profileError } = await supabaseAdmin
      .from("profiles_administrativos")
      .delete()
      .eq("id", userId);

    if (profileError) {
      console.error(
        " Error eliminando perfil (puede ser normal si ya se eliminó por CASCADE):",
        profileError
      );
      // No retornar error aquí, porque el usuario principal ya se eliminó exitosamente
    } else {
      console.log(" Usuario eliminado de profiles_administrativos:", userId);
    }

    console.log(" Usuario eliminado completamente");
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(" Error en API delete-user:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    console.log(" API: Iniciando creación de usuario administrativo");
    const body = await request.json();
    console.log(" Body completo recibido:", JSON.stringify(body, null, 2));
    const data = body;
    console.log(" Datos extraídos:", {
      email: data.email,
      dni: data.dni,
      firstName: data.firstName,
      lastName: data.lastName,
      hasPassword: !!data.password,
    });

    if (
      !data.email ||
      !data.password ||
      !data.dni ||
      !data.firstName ||
      !data.lastName
    ) {
      console.log(" Validación fallida - campos faltantes:", {
        email: !!data.email,
        password: !!data.password,
        dni: !!data.dni,
        firstName: !!data.firstName,
        lastName: !!data.lastName,
      });
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }
    console.log(" Validaciones pasadas, creando usuario en auth...");

    const { data: authData, error: authError } =
      await supabaseAdmin.auth.signUp({
        email: data.email.trim().toLowerCase(),
        password: data.password,
        options: {
          emailRedirectTo: undefined,
        },
      });

    if (authError) {
      console.error(" Error al crear usuario auth:", authError);
      return NextResponse.json(
        { error: "Error al crear usuario: " + authError.message },
        { status: 500 }
      );
    }

    if (!authData.user) {
      console.error(" authData.user es null");
      return NextResponse.json(
        { error: "No se pudo crear el usuario" },
        { status: 500 }
      );
    }

    console.log(" Usuario creado en auth.users:", authData.user.id);

    const profilePayload = {
      id: authData.user.id,
      email: data.email.trim().toLowerCase(),
      legajo_administrativo: "00" + data.dni,
      nombre: data.firstName,
      apellido: data.lastName,
      dni_administrativo: data.dni,
      telefono: data.phone || null,
      fecha_nacimiento: data.birthDate || null,
      tipo_usuario: "Administrativo",
    };

    console.log(" Payload del perfil:", profilePayload);

    const { data: profileData, error: profileError } = await supabaseAdmin
      .from("profiles_administrativos")
      .insert(profilePayload)
      .select()
      .single();

    if (profileError) {
      console.error(" Error al crear perfil:", profileError);

      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);

      if (profileError.code === "23505") {
        return NextResponse.json(
          { error: "El DNI ya está registrado en el sistema" },
          { status: 409 }
        );
      } else {
        return NextResponse.json(
          { error: `Error al crear perfil: ${profileError.message}` },
          { status: 500 }
        );
      }
    }

    console.log(" Usuario administrativo creado exitosamente");
    return NextResponse.json({
      success: true,
      data: {
        userId: authData.user.id,
        profile: profileData,
      },
    });
  } catch (error) {
    console.error(" Error crítico en API:", error);
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
export async function UPDATE() {}
