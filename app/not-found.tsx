import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="text-8xl mb-6">🧶</div>
      <h2 className="text-3xl font-semibold text-neutral-800 font-[Montserrat_Alternates]">Ups! Strona nie istnieje</h2>
      <p className="text-neutral-400 mt-3 mb-8">Wygląda na to, że ten wątek się zaplątał...</p>
      <Link
        href="/"
        className="px-6 py-3 rounded-full bg-gradient-to-r from-[var(--color-rose-gold)] to-[var(--color-rose-dark)] text-white font-medium hover:opacity-90 transition-opacity"
      >
        Wróć na stronę główną
      </Link>
    </div>
  );
}
