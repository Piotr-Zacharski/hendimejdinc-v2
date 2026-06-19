import { contentfulClient } from "@/lib/contentful";
import { ProductCard } from "@/components/product-card";

export const revalidate = 60;

export default async function HomePage() {
  const res = await contentfulClient.getEntries({ content_type: "product" });

  return (
    <div>
      {/* Hero */}
      <section className="text-center mb-16">
        <p className="text-lg text-neutral-500 w-full mx-auto">
          Ręcznie robione torebki i plecaki ze sznurka i przędzy
        </p>
        <div className="mt-6 w-16 h-0.5 bg-gradient-to-r from-[var(--color-rose-light)] to-[var(--color-rose-gold)] mx-auto rounded-full" />
      </section>

      {/* Products */}
      <section>
        <div className="flex flex-wrap justify-center gap-8">
          {res.items.map((product: any) => (
            <ProductCard key={product.sys.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
