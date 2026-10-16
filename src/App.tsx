import { useEffect, useState, type FormEvent } from "react";
import { BarChart3, Table2, Zap, Wallet, Truck, Boxes, MessageCircle, Mail, X, Menu, Send, Loader2, CheckCircle2, ZoomIn, Instagram } from "lucide-react";

const WHATSAPP = "5493743410899";
const EMAIL = "rives183@gmail.com";
const INSTAGRAM = "https://www.instagram.com/deniis.ri";
const MODE = (import.meta.env.VITE_CONTACT_MODE ?? "email") as "email" | "whatsapp" | "both";

const services = [
  { icon: BarChart3, title: "Dashboards en Power BI", problem: "Los datos están dispersos y cuesta ver qué pasa.", result: "Un reporte visual con filtros, gráficos y mapas." },
  { icon: Table2, title: "Planillas Excel", problem: "Planillas desordenadas, difíciles de mantener.", result: "Datos estructurados y listos para analizar." },
  { icon: Zap, title: "Automatización de Excel y reportes", problem: "Tareas repetitivas que consumen horas.", result: "Reportes que se actualizan con menos trabajo manual." },
  { icon: Wallet, title: "Análisis de gastos y costos", problem: "No se sabe en qué, quién ni dónde se gasta.", result: "Gasto por responsable, categoría, localidad y fecha." },
  { icon: Truck, title: "Gestión de flota", problem: "Combustible, kilómetros y reparaciones sin control.", result: "Seguimiento por vehículo y por período." },
  { icon: Boxes, title: "Stock e inventario", problem: "No hay visibilidad de existencias y consumos.", result: "Control de materiales y herramientas." },
];

const projects = [
  { img: "01-viaticos", title: "Viáticos con análisis geográfico", need: "Saber cuánto se gasta por técnico y por localidad.", solution: "Reporte mensual con gráficos comparativos y mapa.", tools: "Power BI · Excel" },
  { img: "02-combustible", title: "Control de combustible", need: "Controlar el consumo por móvil y por fecha.", solution: "Reporte con filtros por fecha y móvil/técnico.", tools: "Power BI · Excel" },
  { img: "03-gastos-vehiculos", title: "Gastos por vehículo", need: "Ordenar reparaciones, servicios y materiales por móvil.", solution: "Reporte con detalle, filtros y ubicación del destino.", tools: "Power BI · Excel" },
  { img: "04-taller", title: "Gasto de taller", need: "Clasificar los gastos de taller por categoría y destino.", solution: "Reporte con totales, categorías y evolución diaria.", tools: "Power BI · Excel" },
  { img: "05-ferreteria", title: "Compras de materiales y herramientas", need: "Ver qué se compra, dónde y por qué importe.", solution: "Reporte por categoría y localidad.", tools: "Power BI · Excel" },
  { img: "06-km-recorridos", title: "Kilómetros recorridos", need: "Comparar el uso de cada vehículo en el mes.", solution: "Reporte de km por vehículo, con filtros.", tools: "Power BI · Excel" },
  { img: "07-excel-pagos-combustible", title: "Planilla de pagos de combustible", need: "Registrar pagos por móvil y estación.", solution: "Planilla ordenada por fecha y período de pago.", tools: "Excel" },
  { img: "08-excel-viaticos", title: "Planilla de viáticos", need: "Registrar viáticos por técnico y localidad.", solution: "Planilla estructurada, base del reporte de Power BI.", tools: "Excel" },
];

const nav = [["servicios", "Servicios"], ["proyectos", "Proyectos"], ["sobre", "Sobre mí"], ["contacto", "Contacto"]];
const btn = "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky";

function Heading({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return (
    <div className="mb-12 max-w-2xl">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand">{kicker}</p>
      <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-mute">{text}</p>}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#inicio" className="text-lg font-extrabold">DataControl <span className="text-sky">BI</span></a>
        <nav aria-label="Principal" className="hidden gap-8 text-sm text-mute md:flex">
          {nav.map(([id, l]) => <a key={id} href={`#${id}`} className="hover:text-ink">{l}</a>)}
        </nav>
        <a href="#contacto" className={`${btn} hidden bg-brand py-2 text-sm md:inline-flex`}>Hablemos</a>
        <button className="md:hidden" aria-label="Abrir menú" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav aria-label="Móvil" className="flex flex-col gap-4 border-t border-line px-5 py-4 md:hidden">
          {nav.map(([id, l]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{l}</a>)}
        </nav>
      )}
    </header>
  );
}

export default function App() {
  const [zoom, setZoom] = useState<(typeof projects)[number] | null>(null);
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  return (
    <>
      <Header />
      <main>
        <section id="inicio" className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 lg:grid-cols-2">
          <div className="rise">
            <p className="mb-5 inline-block rounded-full border border-line bg-card px-3 py-1 text-xs font-bold uppercase tracking-wider text-sky">Inteligencia de negocios para operaciones</p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">Convertí tus datos en <span className="text-sky">decisiones claras.</span></h1>
            <p className="mt-6 max-w-lg text-lg text-mute">Dashboards en Power BI, Excel automatizado y controles operativos. Menos tiempo buscando datos, más claridad para gestionar.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contacto" className={`${btn} bg-brand hover:bg-brand/80`}>Solicitar una consulta</a>
              <a href="#servicios" className={`${btn} border border-line hover:bg-card`}>Ver servicios</a>
            </div>
          </div>
          <figure className="rise rounded-2xl border border-line bg-card p-3 shadow-2xl shadow-brand/10">
            <img src="/capturas/01-viaticos.webp" alt="Reporte de viáticos en Power BI con datos ocultos" width={1400} height={791} className="rounded-xl" />
            <figcaption className="px-2 pt-3 text-xs text-mute">Trabajo real · Power BI · datos sensibles ocultos</figcaption>
          </figure>
        </section>

        <section id="servicios" className="mx-auto max-w-6xl px-5 py-20">
          <Heading kicker="Servicios" title="Herramientas para tener el negocio bajo control" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, problem, result }) => (
              <article key={title} className="rounded-2xl border border-line bg-card p-6 transition hover:-translate-y-1 hover:border-brand/60">
                <Icon className="mb-4 text-sky" aria-hidden />
                <h3 className="mb-3 text-lg font-bold">{title}</h3>
                <p className="text-sm text-mute"><b className="text-ink">Problema:</b> {problem}</p>
                <p className="mt-2 text-sm text-mute"><b className="text-ink">Resultado:</b> {result}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="proyectos" className="mx-auto max-w-6xl px-5 py-20">
          <Heading kicker="Proyectos" title="Trabajos realizados" text="Capturas de reportes y planillas reales. Los nombres, patentes, montos y comercios están ocultos." />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article key={p.img} className="overflow-hidden rounded-2xl border border-line bg-card">
                <button onClick={() => setZoom(p)} className="group relative block w-full" aria-label={`Ampliar: ${p.title}`}>
                  <img src={`/capturas/${p.img}.webp`} alt={`Vista previa: ${p.title}`} loading="lazy" className="aspect-video w-full object-cover object-top" />
                  <span className="absolute right-3 top-3 rounded-full bg-bg/80 p-2 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100"><ZoomIn size={16} /></span>
                </button>
                <div className="p-5">
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-mute"><b className="text-ink">Necesidad:</b> {p.need}</p>
                  <p className="mt-1 text-sm text-mute"><b className="text-ink">Solución:</b> {p.solution}</p>
                  <p className="mt-3 text-xs font-semibold text-sky">{p.tools}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="sobre" className="mx-auto max-w-6xl px-5 py-20">
          <Heading kicker="Sobre mí" title="Quién está detrás de DataControl BI" />
          <div className="max-w-2xl space-y-4 rounded-2xl border border-line bg-card p-6 text-mute">
            <p>Detrás de DataControl BI hay una propuesta clara: ayudar a las empresas a comprender mejor sus números, optimizar el control de sus operaciones y detectar oportunidades de mejora a través de Power BI.</p>
            <p>Desarrollo dashboards e informes interactivos que convierten datos dispersos en información clara, visual y útil para la toma de decisiones.</p>
          </div>
        </section>

        <Contact />
      </main>

      <footer className="border-t border-line px-5 py-8 text-sm text-mute">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <span>© {new Date().getFullYear()} DataControl BI</span>
          <a className="hover:text-ink" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <a className="inline-flex items-center gap-2 hover:text-ink" href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram de DataControl BI (se abre en una pestaña nueva)">
            <Instagram size={18} aria-hidden /> @deniis.ri
          </a>
        </div>
      </footer>

      {(MODE === "whatsapp" || MODE === "both") && (
        <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" aria-label="Escribir por WhatsApp" className="fixed bottom-5 right-5 z-40 rounded-full bg-emerald-500 p-4 shadow-lg"><MessageCircle /></a>
      )}

      {zoom && (
        <div role="dialog" aria-modal="true" aria-label={zoom.title} className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4" onClick={() => setZoom(null)}>
          <button className="absolute right-4 top-4 rounded-full bg-card p-2" aria-label="Cerrar" onClick={() => setZoom(null)}><X /></button>
          <img src={`/capturas/${zoom.img}.webp`} alt={zoom.title} className="max-h-full max-w-full rounded-lg" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
}

type Status = "idle" | "sending" | "ok" | "error";

function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [msg, setMsg] = useState("");
  const [t0] = useState(() => Date.now());
  const [wa, setWa] = useState("");
  const input = "w-full rounded-lg border border-line bg-bg px-4 py-3 outline-none focus:border-brand";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const err: Record<string, string> = {};
    if (!f.nombre?.trim()) err.nombre = "Ingresá tu nombre y apellido.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email ?? "")) err.email = "Ingresá un correo válido.";
    if (!f.mensaje?.trim() || f.mensaje.trim().length < 10) err.mensaje = "Contanos un poco más (mínimo 10 caracteres).";
    if (!f.privacidad) err.privacidad = "Tenés que aceptar para continuar.";
    setErrors(err);
    if (Object.keys(err).length) return;

    const text = `Hola, soy ${f.nombre}${f.empresa ? ` (${f.empresa})` : ""}. Consulta sobre: ${f.servicio}. ${f.mensaje}`;
    const link = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
    setStatus("sending");
    try {
      if (MODE !== "whatsapp") {
        const r = await fetch("/.netlify/functions/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...f, elapsed: Date.now() - t0 }),
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(data.error || "No se pudo enviar.");
      }
      setWa(MODE === "email" ? "" : link);
      setStatus("ok");
    } catch (ex) {
      setMsg(ex instanceof Error ? ex.message : "Error inesperado.");
      setStatus("error");
    }
  }

  return (
    <section id="contacto" className="mx-auto max-w-3xl px-5 py-20">
      <Heading kicker="Contacto" title="¿Qué necesitás medir o mejorar?" text="Contanos qué información manejás y qué reporte te gustaría tener." />
      {status === "ok" ? (
        <div role="status" className="rounded-2xl border border-line bg-card p-8 text-center">
          <CheckCircle2 className="mx-auto mb-3 text-emerald-400" size={40} />
          <p className="text-lg font-bold">{MODE === "whatsapp" ? "Tu mensaje está listo" : "¡Consulta enviada!"}</p>
          <p className="mt-2 text-mute">{MODE === "whatsapp" ? "Continuá la conversación por WhatsApp." : "Te vamos a responder a la brevedad."}</p>
          {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className={`${btn} mt-5 bg-emerald-500`}><MessageCircle size={18} /> {MODE === "whatsapp" ? "Abrir WhatsApp" : "También por WhatsApp"}</a>}
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-2xl border border-line bg-card p-6 sm:grid-cols-2">
          <div className="hidden" aria-hidden><label>No completar<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <Field label="Nombre y apellido *" error={errors.nombre}><input name="nombre" className={input} autoComplete="name" /></Field>
          <Field label="Empresa (opcional)"><input name="empresa" className={input} autoComplete="organization" /></Field>
          <Field label="Correo electrónico *" error={errors.email}><input name="email" type="email" className={input} autoComplete="email" /></Field>
          <Field label="Teléfono (opcional)"><input name="telefono" type="tel" className={input} autoComplete="tel" /></Field>
          <div className="sm:col-span-2"><Field label="Servicio de interés">
            <select name="servicio" className={input}>{[...services.map((s) => s.title), "Otro"].map((s) => <option key={s}>{s}</option>)}</select>
          </Field></div>
          <div className="sm:col-span-2"><Field label="Descripción de la consulta *" error={errors.mensaje}><textarea name="mensaje" rows={5} className={input} /></Field></div>
          <div className="sm:col-span-2">
            <label className="flex items-start gap-3 text-sm text-mute"><input type="checkbox" name="privacidad" className="mt-1" /> Acepto que usen mis datos solo para responder esta consulta.</label>
            {errors.privacidad && <p role="alert" className="mt-1 text-sm text-red-400">{errors.privacidad}</p>}
          </div>
          {status === "error" && <p role="alert" className="text-sm text-red-400 sm:col-span-2">{msg} Probá de nuevo o escribinos a {EMAIL}.</p>}
          <button disabled={status === "sending"} className={`${btn} bg-brand hover:bg-brand/80 disabled:opacity-60 sm:col-span-2`}>
            {status === "sending" ? <><Loader2 className="animate-spin" size={18} /> Enviando…</> : <><Send size={18} /> {MODE === "whatsapp" ? "Continuar por WhatsApp" : "Enviar solicitud"}</>}
          </button>
        </form>
      )}
      <p className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-mute">
        <span className="inline-flex items-center gap-2"><Mail size={16} aria-hidden /> {EMAIL}</span>
        <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-ink"><Instagram size={16} aria-hidden /> @deniis.ri</a>
      </p>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium">
      <span className="mb-2 block">{label}</span>
      {children}
      {error && <span role="alert" className="mt-1 block text-red-400">{error}</span>}
    </label>
  );
}
