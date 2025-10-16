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

export async function GET() {
  try {
    console.log("Iniciando GET de obras sociales");

    const hoy = new Date().toISOString().split("T")[0];

    const { data: updatedObras, error: updateError } = await supabaseAdmin
      .from("obra_social")
      .update({ estado: "Habilitado" })
      .eq("estado", "Pendiente")
      .lte("fecha_cambio_estado", hoy)
      .select();

    if (updateError) {
      console.error("Error actualizando estados:", updateError);
    }

    const { data: obrasSociales, error: selectError } = await supabaseAdmin
      .from("obra_social")
      .select("*")
      .order("created_at", { ascending: false });

    if (selectError) {
      console.error("Error en consulta:", selectError);
      throw new Error(`Error de base de datos: ${selectError.message}`);
    }

    console.log("Obras sociales obtenidas:", obrasSociales?.length || 0);

    return NextResponse.json({
      success: true,
      data: obrasSociales || [],
      metadata: {
        total: obrasSociales?.length || 0,
        lastUpdated: new Date().toISOString(),
        updatedCount: updatedObras?.length || 0,
      },
    });
  } catch (error) {
    console.error("Error completo en GET:", error);
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Error desconocido",
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Body recibido en POST:", body);

    const { data } = body;

    if (!data?.descripcion) {
      return NextResponse.json(
        { error: "La descripción es requerida" },
        { status: 400 }
      );
    }

    if (!data?.fecha_vigencia) {
      return NextResponse.json(
        { error: "La fecha de vigencia es requerida" },
        { status: 400 }
      );
    }

    const fechaVigencia = new Date(data.fecha_vigencia);
    const fechaActual = new Date();

    fechaVigencia.setHours(0, 0, 0, 0);
    fechaActual.setHours(0, 0, 0, 0);

    const estado = fechaVigencia <= fechaActual ? "Habilitado" : "Pendiente";

    const insertData = {
      descripcion: data.descripcion,
      telefono_contacto: data.telefono_contacto || null,
      sitioweb: data.sitioweb || null,
      fecha_cambio_estado: data.fecha_vigencia,
      estado: estado,
    };

    console.log("Datos a insertar:", insertData);

    const { data: insertedData, error } = await supabaseAdmin
      .from("obra_social")
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("Error insertando:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data: insertedData,
    });
  } catch (error) {
    console.error("Error en POST:", error);
    return NextResponse.json(
      {
        error: "Error interno del servidor",
        details: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, estado, fecha_vigencia } = body;

    if (!id) {
      return NextResponse.json({ error: "ID es requerido" }, { status: 400 });
    }

    let updateData: any = {};

    if (fecha_vigencia) {
      // Caso: Programar habilitación con nueva fecha
      updateData = {
        fecha_cambio_estado: fecha_vigencia,
        estado: "Pendiente",
      };
    } else if (estado) {
      // Caso: Cambio directo de estado (deshabilitar)
      updateData = { estado };
    } else {
      return NextResponse.json(
        { error: "Estado o fecha de vigencia son requeridos" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("obra_social")
      .update(updateData)
      .eq("id_obra", id);

    if (error) {
      console.error("Error en PUT:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error completo en PUT:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
