"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/", showOnlyAway: true },
  { label: "Kolory", href: "/gallery" },
  { label: "Twoja torebka", href: "/mybag" },
  { label: "Kontakt", href: "/contact" },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const visibleItems = navItems.filter((item) => !item.showOnlyAway || !isHome);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-rose-100/50 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
      {/* Logo centered */}
      <div className="flex items-center justify-center py-6 relative">
        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute left-6 sm:hidden p-1 text-neutral-500"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>

        <Link href="/" className="text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-[var(--color-rose-gold)] to-[var(--color-rose-light)] bg-clip-text text-transparent font-[Montserrat_Alternates] leading-relaxed">
          HendiMejdi
        </Link>
      </div>

      {/* Desktop nav */}
      <nav className="hidden sm:flex justify-center gap-8 pb-4">
        {visibleItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`text-sm uppercase tracking-widest transition-colors relative pb-1 ${
              pathname === item.href
                ? "text-[var(--color-rose-gold)] font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[var(--color-rose-gold)] after:rounded-full"
                : "text-neutral-500 hover:text-[var(--color-rose-gold)]"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile nav */}
      {menuOpen && (
        <nav className="sm:hidden flex flex-col items-center gap-4 pb-5 border-t border-rose-50">
          {visibleItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm uppercase tracking-widest ${
                pathname === item.href ? "text-[var(--color-rose-gold)] font-medium" : "text-neutral-500"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
