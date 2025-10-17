// lib/email-resend.ts
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTurnoPendientePagoNotification({
  pacienteEmail,
  pacienteNombre,
  fechaTurno,
  horaTurno,
  medicoNombre,
  especialidad,
  obraSocial,
  numeroTurno,
}: {
  pacienteEmail: string;
  pacienteNombre: string;
  fechaTurno: string;
  horaTurno: string;
  medicoNombre: string;
  especialidad: string;
  obraSocial?: string;
  numeroTurno?: string;
}) {
  try {
    console.log("LLEGUE A EMAIL-RESEND");
    const { data, error } = await resend.emails.send({
      from: "Clínica System <noreply@resend.dev>",
      to: [pacienteEmail],
      subject: `⏳ Turno Pendiente de Pago - ${fechaTurno}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin: 0;">🏥 Clínica System</h1>
            <p style="color: #64748b; margin: 5px 0;">Sistema de Turnos</p>
          </div>

          <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
            <h2 style="color: #92400e; margin-top: 0;">⏳ Turno Pendiente de Pago</h2>
            <p style="color: #92400e; margin-bottom: 0;">La clínica a dejado de trabajar momentaneamente con su obra social.
            Ahora su turno se encuentre pendiente de pago. Para asistir, deberá abonar en recepción.</p>
          </div>

          <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 30px;">
            <h3 style="color: #1e293b; margin-top: 0; margin-bottom: 20px;">📋 Detalles del Turno</h3>
            
            <div style="display: grid; gap: 15px;">
              <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                <span style="font-weight: bold; color: #475569;">Paciente:</span>
                <span style="color: #1e293b;">${pacienteNombre}</span>
              </div>
              
              <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                <span style="font-weight: bold; color: #475569;">Fecha:</span>
                <span style="color: #1e293b;">${fechaTurno}</span>
              </div>
              
              <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                <span style="font-weight: bold; color: #475569;">Hora:</span>
                <span style="color: #1e293b;">${horaTurno}</span>
              </div>
              
              <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                <span style="font-weight: bold; color: #475569;">Médico:</span>
                <span style="color: #1e293b;">${medicoNombre}</span>
              </div>
              
              <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                <span style="font-weight: bold; color: #475569;">Especialidad:</span>
                <span style="color: #1e293b;">${especialidad}</span>
              </div>
              
              ${
                obraSocial
                  ? `
                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0;">
                  <span style="font-weight: bold; color: #475569;">Obra Social:</span>
                  <span style="color: #1e293b;">${obraSocial}</span>
                </div>
              `
                  : ""
              }
              
              ${
                numeroTurno
                  ? `
                <div style="display: flex; justify-content: space-between; padding: 10px 0;">
                  <span style="font-weight: bold; color: #475569;">N° Turno:</span>
                  <span style="color: #1e293b;">${numeroTurno}</span>
                </div>
              `
                  : ""
              }
            </div>
          </div>

         
        

      
          <div style="text-align: center;">
            <p style="color: #64748b; font-size: 14px; margin: 10px 0;">
              📞 <strong>Consultas:</strong> +54 11 1234-5678
            </p>
            <p style="color: #64748b; font-size: 14px; margin: 10px 0;">
              📧 <strong>Email:</strong> consultas@clinica.com
            </p>
            <p style="color: #64748b; font-size: 12px; margin-top: 20px;">
              Este email fue enviado automáticamente por el Sistema de Turnos de la Clínica.<br>
              Por favor, no responda a este email.
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error enviando email de turno pendiente:", error);
      return { success: false, error };
    }

    console.log("Email de turno pendiente enviado exitosamente:", data);
    return { success: true, data };
  } catch (error) {
    console.error("Error en sendTurnoPendientePagoNotification:", error);
    return { success: false, error };
  }
}
