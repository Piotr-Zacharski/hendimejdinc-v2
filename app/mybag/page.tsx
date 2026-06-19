import { contentfulClient } from "@/lib/contentful";
import { MyBagForm } from "./mybag-form";

export const revalidate = 60;

export default async function MyBagPage() {
  const res = await contentfulClient.getEntries({ content_type: "product", select: ["fields.title", "fields.thumbnail"] } as any);

  const productImages: Record<string, string> = {};
  for (const item of res.items) {
    const { title, thumbnail } = item.fields as any;
    if (title && thumbnail?.fields?.file?.url) {
      productImages[title] = `https:${thumbnail.fields.file.url}`;
    }
  }

  return <MyBagForm productImages={productImages} />;
}
