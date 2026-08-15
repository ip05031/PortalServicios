"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Sparkles, SunMedium, Snowflake, PaintbrushVertical } from "lucide-react";
import { useMemo, useState } from "react";
import { calculateQuote, generateQuotePdf, type QuoteFormState, validateQuoteStep } from "@/app/lib/quote";

const serviceOptions = [
  { id: "solar", label: "Paneles solares", icon: SunMedium, description: "Cotización para instalación y ahorro energético." },
  { id: "air", label: "Aires acondicionados", icon: Snowflake, description: "Equipos LG inverter y montaje eléctrico." },
  { id: "remodelacion", label: "Remodelación", icon: PaintbrushVertical, description: "Obra básica de fachaleta, repello y materiales." },
] as const;

const initialForm: QuoteFormState = {
  serviceType: "solar",
  customerName: "",
  phone: "",
  email: "",
  address: "",
  notes: "",
  solarPanels: 20,
  airCapacity: "36k",
  airBrand: "LG",
  remodelArea: 18,
  remodelWalls: 1,
};

export default function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<QuoteFormState>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [summary, setSummary] = useState<ReturnType<typeof calculateQuote> | null>(null);

  const serviceMeta = useMemo(() => serviceOptions.find((option) => option.id === form.serviceType), [form.serviceType]);

  const handleChange = (field: keyof QuoteFormState, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const nextStep = () => {
    const validation = validateQuoteStep(step, form);
    if (!validation.success) {
      const fieldErrors = validation.error.flatten().fieldErrors;
      setErrors(Object.fromEntries(Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0] ?? ""])));
      return;
    }

    if (step < 2) {
      setStep((prev) => prev + 1);
    } else {
      const quote = calculateQuote(form);
      setSummary(quote);
    }
  };

  const restart = () => {
    setStep(0);
    setForm(initialForm);
    setSummary(null);
    setErrors({});
  };

  const renderStep = () => {
    if (step === 0) {
      return (
        <div className="space-y-5">
          <div className="grid gap-3 md:grid-cols-3">
            {serviceOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = form.serviceType === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleChange("serviceType", option.id)}
                  className={`rounded-2xl border p-4 text-left transition ${isSelected ? "border-cyan-500 bg-cyan-50" : "border-slate-200 bg-white"}`}
                >
                  <Icon className="mb-2 h-5 w-5 text-cyan-600" />
                  <p className="font-semibold text-slate-800">{option.label}</p>
                  <p className="mt-1 text-sm text-slate-500">{option.description}</p>
                </button>
              );
            })}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Nombre completo
              <input value={form.customerName} onChange={(e) => handleChange("customerName", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="Juan Pérez" />
              {errors.customerName ? <p className="text-sm text-red-500">{errors.customerName}</p> : null}
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Teléfono
              <input value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="999 111 222" />
              {errors.phone ? <p className="text-sm text-red-500">{errors.phone}</p> : null}
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Correo
              <input type="email" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="cliente@empresa.com" />
              {errors.email ? <p className="text-sm text-red-500">{errors.email}</p> : null}
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              Dirección
              <input value={form.address} onChange={(e) => handleChange("address", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="Av. Principal 123" />
              {errors.address ? <p className="text-sm text-red-500">{errors.address}</p> : null}
            </label>
          </div>
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            Observaciones
            <textarea value={form.notes} onChange={(e) => handleChange("notes", e.target.value)} className="min-h-24 w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="Detalles de la solicitud" />
          </label>
        </div>
      );
    }

    if (step === 1) {
      if (form.serviceType === "solar") {
        return (
          <div className="space-y-4">
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              Número de paneles
              <input type="number" min={20} value={form.solarPanels} onChange={(e) => handleChange("solarPanels", Number(e.target.value))} className="w-full rounded-xl border border-slate-300 px-3 py-2" />
              {errors.solarPanels ? <p className="text-sm text-red-500">{errors.solarPanels}</p> : null}
            </label>
            <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
              Se basa en el paquete de 20 paneles con ahorro estimado de $212/mes y un costo de instalación de $3,421.
            </div>
          </div>
        );
      }

      if (form.serviceType === "air") {
        return (
          <div className="space-y-4">
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              Capacidad del equipo
              <select value={form.airCapacity} onChange={(e) => handleChange("airCapacity", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2">
                <option value="36k">36k BTU</option>
                <option value="40k">40k BTU</option>
                <option value="48k">48k BTU</option>
                <option value="60k">60k BTU</option>
              </select>
            </label>
            <label className="block space-y-2 text-sm font-medium text-slate-700">
              Marca
              <select value={form.airBrand} onChange={(e) => handleChange("airBrand", e.target.value)} className="w-full rounded-xl border border-slate-300 px-3 py-2">
                <option value="LG">LG</option>
                <option value="Lennox">Lennox</option>
                <option value="Hisense">Hisense</option>
                <option value="Confort Start">Confort Start</option>
              </select>
            </label>
          </div>
        );
      }

      return (
        <div className="space-y-4">
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            Área aproximada (m²)
            <input type="number" min={10} value={form.remodelArea} onChange={(e) => handleChange("remodelArea", Number(e.target.value))} className="w-full rounded-xl border border-slate-300 px-3 py-2" />
            {errors.remodelArea ? <p className="text-sm text-red-500">{errors.remodelArea}</p> : null}
          </label>
          <label className="block space-y-2 text-sm font-medium text-slate-700">
            Número de muros
            <input type="number" min={1} value={form.remodelWalls} onChange={(e) => handleChange("remodelWalls", Number(e.target.value))} className="w-full rounded-xl border border-slate-300 px-3 py-2" />
            {errors.remodelWalls ? <p className="text-sm text-red-500">{errors.remodelWalls}</p> : null}
          </label>
        </div>
      );
    }

    return null;
  };

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
            <Sparkles className="h-4 w-4" /> Cotizador inteligente
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Solicita tu presupuesto en minutos</h2>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600">Paso {step + 1} de 2</div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between">
        <button type="button" onClick={restart} className="text-sm font-medium text-slate-500">Limpiar</button>
        <button type="button" onClick={nextStep} className="rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-cyan-700">
          {step < 1 ? "Siguiente" : summary ? "Descargar PDF" : "Ver presupuesto"}
        </button>
      </div>

      {summary ? (
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <div className="flex items-center gap-2 text-emerald-700">
            <CheckCircle2 className="h-5 w-5" />
            <p className="font-semibold">Presupuesto listo</p>
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">{summary.serviceLabel}</h3>
              <p className="mt-2 text-sm text-slate-600">{serviceMeta?.description}</p>
              <div className="mt-4 space-y-2 text-sm text-slate-600">
                {summary.items.map((item) => (
                  <div key={item.label} className="flex justify-between gap-2">
                    <span>{item.label}</span>
                    <span>$ {item.amount.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-500">Total con IVA</p>
              <p className="mt-1 text-3xl font-semibold text-slate-900">$ {summary.total.toFixed(2)}</p>
              <p className="mt-2 text-sm text-slate-500">Subtotal: $ {summary.subtotal.toFixed(2)}</p>
              <p className="mt-1 text-sm text-slate-500">IVA: $ {summary.iva.toFixed(2)}</p>
              <button onClick={() => generateQuotePdf(form, summary)} className="mt-4 w-full rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white">Descargar PDF</button>
            </div>
          </div>
          <div className="mt-6 space-y-2 text-sm text-slate-600">
            <p><span className="font-semibold">Garantía:</span> {summary.warranty}</p>
            <p><span className="font-semibold">Validez:</span> {summary.validity}</p>
            <p><span className="font-semibold">Tiempo:</span> {summary.deliveryTime}</p>
            {summary.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
