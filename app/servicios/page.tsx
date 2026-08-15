import SiteShell from "@/app/components/SiteShell";
import { ArrowRight, ShieldCheck, Sparkles, Wrench, Zap } from "lucide-react";

const services = [
  {
    title: "Ingeniería eléctrica",
    description: "Instalación y mantenimiento de tableros industriales y cableado estructural.",
    icon: ShieldCheck,
  },
  {
    title: "Sistemas solares",
    description: "Dimensionamiento e integración de paneles fotovoltaicos para ahorro energético.",
    icon: Zap,
  },
  {
    title: "Aires acondicionados",
    description: "Sistemas HVAC industriales y residenciales con control térmico y eficiencia.",
    icon: Sparkles,
  },
  {
    title: "Remodelación",
    description: "Transformación estructural y acabados modernos con foco en funcionalidad y estética.",
    icon: Wrench,
  },
];

export default function ServiciosPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Servicios</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Nuestros servicios especializados</h1>
          <p className="mt-4 text-lg text-slate-600">Creamos soluciones integrales con foco en ingeniería, energía, climatización y remodelación.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <Icon className="h-8 w-8 text-cyan-600" />
                <h2 className="mt-4 text-xl font-semibold text-slate-900">{service.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.description}</p>
                <a href="/cotizador" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700">
                  Solicitar cotización <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            );
          })}
        </div>
      </main>
    </SiteShell>
  );
}
