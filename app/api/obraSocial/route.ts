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

export async function POST(request: NextRequest) {
  try {
    const { data } = await request.json();

    console.log("API: Insertando obra social:", data);

    // Validar datos requeridos
    if (!data.descripcion) {
      return NextResponse.json(
        { error: "La descripción es requerida" },
        { status: 400 }
      );
    }

    // Insertar obra social
    const { data: insertedData, error } = await supabaseAdmin
      .from("obra_social")
      .insert({
        descripcion: data.descripcion,
        estado: "Habilitado",
        sitioweb: data.sitioweb || null,
      })
      .select()
      .single();

    if (error) {
      console.error("Error al insertar obra social:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Obra social insertada exitosamente:", insertedData);
    return NextResponse.json({
      success: true,
      data: insertedData,
    });
  } catch (error) {
    console.error("Error en API insert obra social:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
