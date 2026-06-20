export function SiteFooter() {
  return (
    <footer className="border-t border-rose-100/50 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 flex justify-center">
        <p className="text-xs text-neutral-400">
          © {new Date().getFullYear()}{" "}
          <span className="bg-gradient-to-r from-[var(--color-rose-gold)] to-[var(--color-rose-light)] bg-clip-text text-transparent font-semibold font-[Montserrat_Alternates]">
            HendiMejdi
          </span>
          . Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  );
}
