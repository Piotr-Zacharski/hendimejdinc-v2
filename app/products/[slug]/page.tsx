import { contentfulClient } from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  const res = await contentfulClient.getEntries({ content_type: "product" });
  return res.items.map((item: any) => ({ slug: item.fields.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { items } = await contentfulClient.getEntries({
    content_type: "product",
    "fields.slug": slug,
  } as any);

  if (!items.length) notFound();

  const { featuredImage, title, price, description } = items[0].fields as any;

  return (
    <div className="max-w-5xl mx-auto">
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-neutral-400 hover:text-[var(--color-rose-gold)] transition-colors mb-8">
        ← Wróć do produktów
      </Link>

      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[var(--color-rose-gold)] to-[var(--color-rose-dark)] px-8 py-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-white font-[Montserrat_Alternates]">{title}</h1>
          <p className="text-rose-100 mt-1 text-lg">{price},00 zł</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src={`https:${featuredImage.fields.file.url}`}
              alt={title}
              width={featuredImage.fields.file.details.image.width}
              height={featuredImage.fields.file.details.image.height}
              className="rounded-2xl w-full h-auto"
            />
          </div>
          <div className="prose prose-neutral max-w-none">
            {documentToReactComponents(description)}
            <Link href="/gallery" className="inline-block mt-6 px-5 py-2.5 rounded-full bg-[var(--color-rose-gold)] text-white text-sm font-medium hover:bg-[var(--color-rose-dark)] transition-colors no-underline">
              Wybierz swój kolor →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
