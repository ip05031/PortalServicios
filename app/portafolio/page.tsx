import SiteShell from "@/app/components/SiteShell";

const projects = [
  { title: "Parque Solar Metropolitano", category: "Solares", location: "Santiago, Chile" },
  { title: "Subestación Planta Industrial", category: "Eléctrica", location: "Concepción, Chile" },
  { title: "Sistema Central de Climatización", category: "Climatización", location: "Las Condes, RM" },
  { title: "Remodelación Oficinas Corporativas", category: "Remodelación", location: "Vitacura, RM" },
  { title: "Instalación Fotovoltaica Domiciliaria", category: "Solares", location: "Viña del Mar, Chile" },
  { title: "Centro de Datos Corporativo", category: "Eléctrica", location: "Quilicura, Chile" },
];

export default function PortafolioPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">Portafolio</p>
          <h1 className="mt-3 text-4xl font-semibold text-slate-900">Nuestro portafolio de proyectos</h1>
          <p className="mt-4 text-lg text-slate-600">Explora proyectos realizados de forma integral con enfoque técnico, estético y de eficiencia.</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.title} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="h-48 bg-gradient-to-br from-cyan-700 via-slate-800 to-slate-950" />
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">{project.category}</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{project.title}</h2>
                <p className="mt-2 text-sm text-slate-600">{project.location}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
