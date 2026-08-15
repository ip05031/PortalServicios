import { z } from "zod";
import { jsPDF } from "jspdf";

export type ServiceType = "solar" | "air" | "remodelacion";

export type QuoteFormState = {
  serviceType: ServiceType;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  notes: string;
  solarPanels: number;
  airCapacity: string;
  airBrand: string;
  remodelArea: number;
  remodelWalls: number;
};

export type QuoteBreakdownItem = {
  label: string;
  amount: number;
};

export type QuoteSummary = {
  serviceLabel: string;
  subtotal: number;
  iva: number;
  total: number;
  items: QuoteBreakdownItem[];
  warranty: string;
  validity: string;
  deliveryTime: string;
  notes: string[];
};

const baseSchema = z.object({
  customerName: z.string().min(2, "Ingresa tu nombre"),
  phone: z.string().min(7, "Ingresa un teléfono válido"),
  email: z.string().email("Ingresa un correo válido"),
  address: z.string().min(5, "Ingresa la dirección"),
  notes: z.string().optional(),
});

export const quoteSchemas = {
  solar: baseSchema.extend({
    serviceType: z.literal("solar"),
    solarPanels: z.coerce.number().min(20, "Mínimo 20 paneles"),
  }),
  air: baseSchema.extend({
    serviceType: z.literal("air"),
    airCapacity: z.string().min(1, "Selecciona una capacidad"),
    airBrand: z.string().min(1, "Selecciona una marca"),
  }),
  remodelacion: baseSchema.extend({
    serviceType: z.literal("remodelacion"),
    remodelArea: z.coerce.number().min(10, "Ingresa un área mayor"),
    remodelWalls: z.coerce.number().min(1, "Ingresa el número de muros"),
  }),
};

export function validateQuoteStep(step: number, data: QuoteFormState) {
  if (step === 0) {
    return { success: true as const, data };
  }

  if (step === 1) {
    const schema = baseSchema.safeParse(data);
    return schema;
  }

  if (step === 2) {
    if (data.serviceType === "solar") {
      return quoteSchemas.solar.safeParse(data);
    }
    if (data.serviceType === "air") {
      return quoteSchemas.air.safeParse(data);
    }
    return quoteSchemas.remodelacion.safeParse(data);
  }

  return { success: true as const, data };
}

export function calculateQuote(data: QuoteFormState): QuoteSummary {
  const additionalCosts = [
    { label: "Factibilidad", amount: 28.47 },
    { label: "Puesta en operación", amount: 108.8 },
    { label: "Cambio de medidor", amount: 123.17 },
  ];

  const roundMoney = (value: number) => Math.round(value * 100) / 100;

  if (data.serviceType === "solar") {
    const panels = Number(data.solarPanels) || 20;
    const panelCost = panels * 78;
    const inverterCost = 1459;
    const installationCost = 3421 * (panels / 20);
    const monthlyGeneration = 991 * (panels / 20);
    const monthlySaving = 212 * (panels / 20);
    const items = [
      { label: `Paneles JA Solar (${panels} unidades)`, amount: panelCost },
      { label: "Inversor Huawei 10kW", amount: inverterCost },
      { label: "Instalación y materiales", amount: installationCost },
      ...additionalCosts,
    ];
    const subtotal = roundMoney(items.reduce((sum, item) => sum + item.amount, 0));
    const iva = roundMoney(subtotal * 0.16);
    return {
      serviceLabel: "Sistema solar fotovoltaico",
      subtotal,
      iva,
      total: roundMoney(subtotal + iva),
      items,
      warranty: "12 años en paneles JA Solar",
      validity: "Oferta válida por 15 días",
      deliveryTime: "Entrega estimada de 5 a 7 días hábiles",
      notes: [
        "El sistema no funciona como planta de emergencia.",
        `Generación estimada: ${monthlyGeneration.toFixed(0)} kWh/mes`,
        `Ahorro estimado: $${monthlySaving.toFixed(0)}/mes`,
      ],
    };
  }

  if (data.serviceType === "air") {
    const capacityPriceMap: Record<string, number> = {
      "36k": 2200,
      "40k": 2500,
      "48k": 2850,
      "60k": 3200,
    };
    const brandMarkupMap: Record<string, number> = {
      Lennox: 200,
      Hisense: 150,
      "Confort Start": 120,
      LG: 0,
    };
    const equipmentCost = capacityPriceMap[data.airCapacity] ?? 2500;
    const brandMarkup = brandMarkupMap[data.airBrand] ?? 0;
    const installationCost = 220.4;
    const items = [
      { label: `Equipo ${data.airCapacity} ${data.airBrand}`, amount: equipmentCost + brandMarkup },
      { label: "Instalación eléctrica", amount: installationCost },
      ...additionalCosts,
    ];
    const subtotal = roundMoney(items.reduce((sum, item) => sum + item.amount, 0));
    const iva = roundMoney(subtotal * 0.16);
    return {
      serviceLabel: "Aire acondicionado",
      subtotal,
      iva,
      total: roundMoney(subtotal + iva),
      items,
      warranty: "1 año en instalación",
      validity: "Oferta válida por 2 días",
      deliveryTime: "Entrega estimada en 2 días",
      notes: [
        `Marca seleccionada: ${data.airBrand}`,
        `Capacidad: ${data.airCapacity}`,
        "Incluye instalación eléctrica básica y revisión inicial.",
      ],
    };
  }

  const area = Number(data.remodelArea) || 18;
  const walls = Number(data.remodelWalls) || 1;
  const fachaletaCost = 240 * Math.ceil(area / 18);
  const repelloCost = 75 * Math.ceil(area / 18);
  const decoblockBags = Math.ceil(area / 18);
  const multibondBags = Math.ceil(area / 12);
  const separators = Math.max(1, Math.ceil(walls / 2));
  const boquilla = 1;
  const cañuela = Math.max(1, Math.ceil(walls / 2));

  const items = [
    { label: `Fachaleta (${area} m²)`, amount: fachaletaCost },
    { label: `Repello doble capa (${area} m²)`, amount: repelloCost },
    { label: `${decoblockBags} bolsas de Decoblock 20kg`, amount: decoblockBags * 34.5 },
    { label: `${multibondBags} bolsas de Multibond 20kg`, amount: multibondBags * 71.2 },
    { label: `${separators} separador(es)`, amount: separators * 12 },
    { label: `${boquilla} boquilla`, amount: 18 },
    { label: `${cañuela} cañuela(s)`, amount: cañuela * 9 },
    ...additionalCosts,
  ];

  const subtotal = roundMoney(items.reduce((sum, item) => sum + item.amount, 0));
  const iva = roundMoney(subtotal * 0.16);
  return {
    serviceLabel: "Remodelación",
    subtotal,
    iva,
    total: roundMoney(subtotal + iva),
    items,
    warranty: "1 mes en remodelación",
    validity: "Oferta válida por 15 días",
    deliveryTime: "Entrega estimada en 5 a 7 días hábiles",
    notes: [
      `Área estimada: ${area} m²`,
      `Muros a intervenir: ${walls}`,
      "Incluye materiales básicos para una primera fase de obra.",
    ],
  };
}

export function generateQuotePdf(data: QuoteFormState, summary: QuoteSummary) {
  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Portal de Servicios - Presupuesto", 14, 20);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Cliente: ${data.customerName}`, 14, 32);
  doc.text(`Dirección: ${data.address}`, 14, 40);
  doc.text(`Correo: ${data.email}`, 14, 48);
  doc.text(`Teléfono: ${data.phone}`, 14, 56);
  doc.text(`Servicio: ${summary.serviceLabel}`, 14, 68);

  let y = 82;
  summary.items.forEach((item) => {
    doc.text(`• ${item.label}`, 14, y);
    doc.text(`$${item.amount.toFixed(2)}`, 170, y, { align: "right" });
    y += 7;
  });

  y += 6;
  doc.setFont("helvetica", "bold");
  doc.text("Subtotal", 14, y);
  doc.text(`$${summary.subtotal.toFixed(2)}`, 170, y, { align: "right" });
  y += 7;
  doc.text("IVA 16%", 14, y);
  doc.text(`$${summary.iva.toFixed(2)}`, 170, y, { align: "right" });
  y += 7;
  doc.text("Total", 14, y);
  doc.text(`$${summary.total.toFixed(2)}`, 170, y, { align: "right" });

  y += 14;
  doc.setFont("helvetica", "normal");
  doc.text(`Garantía: ${summary.warranty}`, 14, y);
  y += 7;
  doc.text(`Validez: ${summary.validity}`, 14, y);
  y += 7;
  doc.text(`Tiempo: ${summary.deliveryTime}`, 14, y);

  doc.save(`presupuesto-${data.customerName.toLowerCase().replace(/\s+/g, "-")}.pdf`);
}
