"use client";

import { Tabs } from "@heroui/react";
import Image from "next/image";
import { tyarns, cords, type ColorItem } from "@/lib/colors";

function ColorGrid({ items }: { items: ColorItem[] }) {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 gap-4 mt-8">
      {items.map((item) => (
        <div key={item.name} className="group rounded-xl bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 p-2 flex flex-col items-center">
          <div className="rounded-lg overflow-hidden">
            <Image src={item.url} alt={item.name} width={90} height={90} className="rounded-lg group-hover:scale-110 transition-transform duration-300" />
          </div>
          <p className="text-[9px] font-medium text-neutral-500 text-center mt-2 leading-tight tracking-wide">{item.name.toUpperCase()}</p>
        </div>
      ))}
    </div>
  );
}

export default function GalleryPage() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold text-center mb-2 font-[Montserrat_Alternates] text-neutral-800">Karta kolorów</h1>
      <p className="text-center text-neutral-400 mb-8">Wybierz kolor dla swojej torebki lub plecaka</p>
      <Tabs variant="secondary" defaultSelectedKey="cord" className="w-full">
        <Tabs.ListContainer className="flex justify-center">
          <Tabs.List aria-label="Kolory">
            <Tabs.Tab id="cord">SZNUREK</Tabs.Tab>
            <Tabs.Tab id="tyarn">T-SHIRT YARN</Tabs.Tab>
          </Tabs.List>
        </Tabs.ListContainer>
        <Tabs.Panel id="cord">
          <ColorGrid items={cords} />
        </Tabs.Panel>
        <Tabs.Panel id="tyarn">
          <ColorGrid items={tyarns} />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
