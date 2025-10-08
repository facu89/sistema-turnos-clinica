import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Datos recibidos:", body);
    console.log(
      "MP_ACCESS_TOKEN:",
      process.env.MP_ACCESS_TOKEN ? "Existe" : "No existe"
    );

    // Intentemos importar MercadoPago dinámicamente
    const { MercadoPagoConfig, Preference } = await import("mercadopago");

    const client = new MercadoPagoConfig({
      accessToken: process.env.MP_ACCESS_TOKEN!,
    });

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: [
          {
            id: "1234",
            title: body.title,
            quantity: body.quantity,
            unit_price: body.unit_price,
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/paciente/dashboard?payment=success`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/paciente/dashboard?payment=failure`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/paciente/dashboard?payment=pending`,
        },
        auto_return: "approved",
      },
    });

    return NextResponse.json({
      id: result.id,
      init_point: result.init_point,
      sandbox_init_point: result.sandbox_init_point,
    });
  } catch (error) {
    console.error("Error completo:", error);
    console.error(
      "Error message:",
      error instanceof Error ? error.message : "Unknown error"
    );
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack"
    );

    return NextResponse.json(
      {
        error: "Error creating preference",
        details: error instanceof Error ? error.message : "Unknown error",
        fullError: JSON.stringify(error, null, 2),
      },
      { status: 500 }
    );
  }
}
