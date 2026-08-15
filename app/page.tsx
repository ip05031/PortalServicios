import Link from "next/link";
import SiteShell from "@/app/components/SiteShell";
import QuoteWizard from "@/app/components/QuoteWizard";
import { ArrowRight, ShieldCheck, Sparkles, Wrench, Zap } from "lucide-react";

const services = [
  {
    title: "Servicios solares",
    description: "Instalación, mantenimiento y asesoría para paneles fotovoltaicos.",
    icon: Zap,
  },
  {
    title: "Aires acondicionados",
    description: "Equipos residenciales e industriales con instalación profesional.",
    icon: ShieldCheck,
  },
  {
    title: "Remodelación",
    description: "Mejoras y acabados con presupuesto claro y tiempos definidos.",
    icon: Wrench,
  },
];

export default function Home() {
  return (
    <SiteShell>
      <main className="min-h-screen bg-slate-50 text-slate-900">
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-900 px-6 py-20 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(245,158,11,0.2),_transparent_35%)]" />
          <div className="relative mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium">Portal de Servicios · Cotizador inteligente</p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">Soluciones integrales que pasan de la idea al presupuesto profesional.</h1>
              <p className="mt-4 text-lg text-slate-300">Tomamos el diseño del sitio anterior y lo convertimos en una experiencia moderna de Next.js con foco en servicios, portafolio y cotización automática.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/cotizador" className="inline-flex items-center gap-2 rounded-full bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-400">Cotizar ahora <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/servicios" className="rounded-full border border-white/20 px-5 py-3 font-semibold text-white/90 transition hover:bg-white/10">Ver servicios</Link>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-200">Incluye</p>
              <ul className="mt-3 space-y-3 text-sm text-slate-200">
                <li>• Cálculo de costos y desglose</li>
                <li>• PDF con IVA, garantías y tiempos</li>
                <li>• Flujo paso a paso con validación</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="servicios" className="mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Nuestros servicios</p>
            <h2 className="mt-2 text-3xl font-semibold text-slate-900">Soluciones integrales para clientes y negocios</h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <Icon className="h-8 w-8 text-cyan-600" />
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Experiencia previa</p>
              <h2 className="mt-1 text-3xl font-semibold text-slate-900">Diseño y estructura heredada del portal anterior</h2>
            </div>
            <Link href="/portafolio" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-700">
              Ver portafolio <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-5">
              <Sparkles className="h-8 w-8 text-cyan-600" />
              <h3 className="mt-3 text-lg font-semibold text-slate-900">Hero institucional</h3>
              <p className="mt-2 text-sm text-slate-600">Se conservó el enfoque visual del sitio original con una identidad más moderna y profesional.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <Wrench className="h-8 w-8 text-cyan-600" />
              <h3 className="mt-3 text-lg font-semibold text-slate-900">Secciones de servicio</h3>
              <p className="mt-2 text-sm text-slate-600">Se reorganizaron como páginas dedicadas para mejor navegación en Next.js.</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <ShieldCheck className="h-8 w-8 text-cyan-600" />
              <h3 className="mt-3 text-lg font-semibold text-slate-900">Cotizador funcional</h3>
              <p className="mt-2 text-sm text-slate-600">El flujo paso a paso queda listo para generar presupuestos y exportarlos a PDF.</p>
            </div>
          </div>
        </section>

        <section id="cotizador" className="mx-auto max-w-7xl px-6 pb-20">
          <QuoteWizard />
        </section>
      </main>
    </SiteShell>
  );
}
