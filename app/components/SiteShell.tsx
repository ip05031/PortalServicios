"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portafolio", label: "Portafolio" },
  { href: "/cotizador", label: "Cotizador" },
];

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-lg font-semibold text-slate-900">
            Portal de Servicios
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className={`text-sm font-medium transition ${isActive ? "text-cyan-700" : "text-slate-600 hover:text-cyan-700"}`}>
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/cotizador" className="hidden rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-700 md:inline-flex">
              Cotizar ahora
            </Link>
            <button onClick={() => setMenuOpen((prev) => !prev)} className="rounded-full border border-slate-200 p-2 md:hidden">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className="text-sm font-medium text-slate-700">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        ) : null}
      </header>
      {children}
    </div>
  );
}
