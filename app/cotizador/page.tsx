import SiteShell from "@/app/components/SiteShell";
import QuoteWizard from "@/app/components/QuoteWizard";

export default function CotizadorPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Cotizador</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Configura tu proyecto y genera un presupuesto</h1>
          <p className="mt-4 text-lg text-slate-600">La experiencia del sitio anterior se adapta a un flujo moderno con cálculo de presupuestos para cada servicio.</p>
        </div>
        <QuoteWizard />
      </main>
    </SiteShell>
  );
}
