import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-rose-100/50 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col items-center gap-4">
        <Link href="/" className="text-2xl font-semibold bg-gradient-to-r from-[var(--color-rose-gold)] to-[var(--color-rose-light)] bg-clip-text text-transparent font-[Montserrat_Alternates]">
          HendiMejdi
        </Link>
        <p className="text-sm text-neutral-400">Ręcznie robione z miłością ♥</p>
        <p className="text-xs text-neutral-300 mt-2">© {new Date().getFullYear()} HendiMejdi. Wszelkie prawa zastrzeżone.</p>
      </div>
    </footer>
  );
}
