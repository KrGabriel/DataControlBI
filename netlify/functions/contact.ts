// Función serverless de Netlify: valida el formulario y envía el correo con Resend.
// Variables requeridas (solo en Netlify, nunca en el frontend):
// RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

// Límite de envíos por IP: 5 por hora.
// Limitación: la memoria no se comparte entre instancias de la función, así que es una
// protección básica ("mejor esfuerzo"), no un límite estricto.
const hits = new Map<string, number[]>();
const WINDOW_MS = 60 * 60 * 1000;
const MAX_HITS = 5;
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_HITS;
}

export default async (req: Request): Promise<Response> => {
  if (req.method !== "POST") return json(405, { error: "Método no permitido." });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!key || !to || !from) return json(500, { error: "El envío de correo todavía no está configurado." });

  const ip = req.headers.get("x-nf-client-connection-ip") ?? req.headers.get("x-forwarded-for") ?? "desconocida";
  if (limited(ip)) return json(429, { error: "Demasiados envíos. Probá de nuevo más tarde." });

  let d: Record<string, unknown>;
  try { d = await req.json(); } catch { return json(400, { error: "Solicitud inválida." }); }
  const s = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);

  // Anti-spam: campo trampa y envío demasiado rápido para un humano
  if (s(d.website, 100) || Number(d.elapsed) < 3000) return json(200, { ok: true });

  const nombre = s(d.nombre, 120), email = s(d.email, 200), mensaje = s(d.mensaje, 4000);
  if (!nombre || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || mensaje.length < 10 || !d.privacidad)
    return json(400, { error: "Revisá los datos del formulario." });

  const text = [
    `Nombre: ${nombre}`, `Empresa: ${s(d.empresa, 120) || "-"}`, `Correo: ${email}`,
    `Teléfono: ${s(d.telefono, 40) || "-"}`, `Servicio: ${s(d.servicio, 120)}`, "", mensaje,
  ].join("\n");

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: email, subject: `Nueva consulta web: ${s(d.servicio, 80)}`, text }),
  });
  if (!r.ok) return json(502, { error: "No se pudo enviar el correo." });
  return json(200, { ok: true });
};
