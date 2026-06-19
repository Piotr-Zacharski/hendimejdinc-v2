import "@/styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "./providers";
import { SiteNavbar } from "@/components/navbar";
import { SiteFooter } from "@/components/footer";

export const metadata: Metadata = {
  title: "HendiMejdi — Ręcznie robione torebki i plecaki",
  description: "Unikalne, ręcznie robione torebki i plecaki ze sznurka i przędzy t-shirt yarn.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat+Alternates:wght@300;400;500;600&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen font-[Poppins] antialiased text-neutral-800" suppressHydrationWarning>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <SiteNavbar />
            <main className="flex-1 container mx-auto max-w-7xl px-6 py-12">
              {children}
            </main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
