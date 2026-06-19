"use client";

import Image from "next/image";
import Link from "next/link";

export function ProductCard({ product }: { product: any }) {
  const { title, slug, price, thumbnail } = product.fields;

  return (
    <Link href={`/products/${slug}`} className="group">
      <div className="w-[300px] rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1">
        <div className="overflow-hidden">
          <Image
            src={`https:${thumbnail.fields.file.url}`}
            alt={title}
            width={300}
            height={320}
            className="object-cover w-full h-[320px] group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-medium text-neutral-800 group-hover:text-[var(--color-rose-gold)] transition-colors">{title}</h3>
          <p className="text-[var(--color-rose-gold)] font-semibold mt-1">{price},00 zł</p>
        </div>
      </div>
    </Link>
  );
}
