"use client";

import { Select, Label, ListBox, Form, Button, TextArea, Input, toast } from "@heroui/react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";

const patterns = [
  "Plecak Dolores", "Torebka Halima", "Torebka Janett",
  "Torebka Makkaresh", "Torebka Margerita", "Torebka Myszka", "Torebka Myszka 2",
  "Torebka Vasanti",
];

const tyarns = [
  "Banan", "Biskupi", "Błękit", "Brudna mięta", "Brudny róż", "Chaber",
  "Chłodny beż", "Ciasteczko", "Cukierkowy róż", "Cynamon", "Cytryna",
  "Czarny", "Czekolada", "Czerwień", "Fuksja", "Grafit", "Granat", "Jagoda",
  "Jasny fiolet", "Jasny szary", "Jeans", "Jodła", "Kawa", "Khaki", "Koniak",
  "Krem", "Lawenda", "Limonka", "Łosoś", "Malina", "Mandarynka", "Miód",
  "Morski", "Musztarda", "Pastelowa mięta", "Petrol", "Różowy krem",
  "Słodki róż", "Suszone morele", "Szałwia", "Szary", "Śliwka", "Śmietanka",
  "Śnieżna biel", "Wanilia", "Wino", "Zieleń",
];

const cordColors = [
  "Banan", "Barbie", "Błękit", "Brudny róż", "Brzoskwinia", "Cegła",
  "Chaber", "Ciasteczko", "Ciemna zieleń", "Cukierkowy róż", "Cynamon",
  "Cytryna", "Czarny", "Czekolada", "Czerwień", "Fiołek", "Grafit", "Granat",
  "Jagoda", "Jasny szary 1", "Jasny szary 2", "Jeans", "Jodła", "Karmel",
  "Kawa", "Khaki", "Koralowy", "Krem", "Lawenda", "Lazur", "Len", "Limonka",
  "Lodowy", "Malina", "Mandarynka", "Miód", "Mleczna czekolada", "Morski",
  "Musztarda", "Oliwka", "Petrol", "Pistacja", "Popielaty", "Różowy krem",
  "Siwy", "Szałwia", "Szary", "Słodki róż", "Śliwka", "Śnieżna biel",
  "Ultrafiolet", "Wanilia", "Wino", "Wiśnia", "Wrzos", "Zieleń 1", "Zieleń 2",
];

const yarnImageMap: Record<string, string> = {
  "Banan": "/tyarn/Banan.png", "Biskupi": "/tyarn/Biskupi.png", "Błękit": "/tyarn/Blekit.png",
  "Brudna mięta": "/tyarn/Brudna_mieta.png", "Brudny róż": "/tyarn/Brudny_roz.png",
  "Chaber": "/tyarn/Chaber.png", "Chłodny beż": "/tyarn/Chlodny_bez.png",
  "Ciasteczko": "/tyarn/Ciasteczko.png", "Cukierkowy róż": "/tyarn/Cukierkowy_roz.png",
  "Cynamon": "/tyarn/Cynamon.png", "Cytryna": "/tyarn/Cytryna.png", "Czarny": "/tyarn/Czarny.png",
  "Czekolada": "/tyarn/Czekolada.png", "Czerwień": "/tyarn/Czerwien.png", "Fuksja": "/tyarn/Fuksja.png",
  "Grafit": "/tyarn/Grafit.png", "Granat": "/tyarn/Granat.png", "Jagoda": "/tyarn/Jagoda.png",
  "Jasny fiolet": "/tyarn/Jasny_fiolet.png", "Jasny szary": "/tyarn/Jasny_szary.png",
  "Jeans": "/tyarn/Jeans.png", "Jodła": "/tyarn/Jodla.png", "Kawa": "/tyarn/Kawa.png",
  "Khaki": "/tyarn/Khaki.png", "Koniak": "/tyarn/Koniak.png", "Krem": "/tyarn/Krem.png",
  "Lawenda": "/tyarn/Lawenda.png", "Limonka": "/tyarn/Limonka.png", "Łosoś": "/tyarn/Losos.png",
  "Malina": "/tyarn/Malina.png", "Mandarynka": "/tyarn/Mandarynka.png", "Miód": "/tyarn/Miod.png",
  "Morski": "/tyarn/Morski.png", "Musztarda": "/tyarn/Musztarda.png",
  "Pastelowa mięta": "/tyarn/Pastelowa_mieta.png", "Petrol": "/tyarn/Petrol.png",
  "Różowy krem": "/tyarn/Rozowy_krem.png", "Słodki róż": "/tyarn/Slodki_roz.png",
  "Suszone morele": "/tyarn/Suszone_morele.png", "Szałwia": "/tyarn/szalwia.png",
  "Szary": "/tyarn/Szary.png", "Śliwka": "/tyarn/Sliwka.png", "Śmietanka": "/tyarn/Smietanka.png",
  "Śnieżna biel": "/tyarn/Sniezna_biel.png", "Wanilia": "/tyarn/Wanilia.png",
  "Wino": "/tyarn/Wino.png", "Zieleń": "/tyarn/Zielen.png",
};

const cordImageMap: Record<string, string> = {
  "Banan": "/cord/Banan.png", "Barbie": "/cord/Barbie.png", "Błękit": "/cord/Blekit.png",
  "Brudny róż": "/cord/Brudny_roz.png", "Brzoskwinia": "/cord/Brzoskwinia.png",
  "Cegła": "/cord/Cegla.png", "Chaber": "/cord/Chaber.png", "Ciasteczko": "/cord/Ciasteczko.png",
  "Ciemna zieleń": "/cord/Ciemna_zielen.png", "Cukierkowy róż": "/cord/Cukierkowy_roz.png",
  "Cynamon": "/cord/Cynamon.png", "Cytryna": "/cord/Cytryna.png", "Czarny": "/cord/Czarny.png",
  "Czekolada": "/cord/Czekolada.png", "Czerwień": "/cord/Czerwien.png", "Fiołek": "/cord/Fiolek.png",
  "Grafit": "/cord/Grafit.png", "Granat": "/cord/Granat.png", "Jagoda": "/cord/Jagoda.png",
  "Jasny szary 1": "/cord/Jasny_szary1.png", "Jasny szary 2": "/cord/Jasny_szary2.png",
  "Jeans": "/cord/Jeans.png", "Jodła": "/cord/Jodla.png", "Karmel": "/cord/Karmel.png",
  "Kawa": "/cord/Kawa.png", "Khaki": "/cord/Khaki.png", "Koralowy": "/cord/Koralowy.png",
  "Krem": "/cord/Krem.png", "Lawenda": "/cord/Lawenda.png", "Lazur": "/cord/Lazur.png",
  "Len": "/cord/Len.png", "Limonka": "/cord/Limonka.png", "Lodowy": "/cord/Lodowy.png",
  "Malina": "/cord/Malina.png", "Mandarynka": "/cord/Mandarynka.png", "Miód": "/cord/Miod.png",
  "Mleczna czekolada": "/cord/Mleczna_czekolada.png", "Morski": "/cord/Morski.png",
  "Musztarda": "/cord/Musztarda.png", "Oliwka": "/cord/Oliwka.png", "Petrol": "/cord/Petrol.png",
  "Pistacja": "/cord/Pistacja.png", "Popielaty": "/cord/Popielaty.png",
  "Różowy krem": "/cord/Rozowy_krem.png", "Siwy": "/cord/Siwy.png", "Szałwia": "/cord/szalwia.png",
  "Szary": "/cord/Szary.png", "Słodki róż": "/cord/Slodki_roz.png", "Śliwka": "/cord/Sliwka.png",
  "Śnieżna biel": "/cord/Sniezna_biel.png", "Ultrafiolet": "/cord/Ultrafiolet.png",
  "Wanilia": "/cord/Wanilia.png", "Wino": "/cord/Wino.png", "Wiśnia": "/cord/Wisnia.png",
  "Wrzos": "/cord/Wrzos.png", "Zieleń 1": "/cord/Zielen_1.png", "Zieleń 2": "/cord/Zielen_2.png",
};

type Selections = {
  name: string | null;
  color: string | null;
  type: string | null;
  length: string | null;
  yarn: string | null;
  cord: string | null;
};

function SummaryRow({ label, value, image }: { label: string; value: string | null; image?: string }) {
  if (!value) return null;
  return (
    <div className="flex justify-between items-center py-2 border-b border-rose-50 last:border-0 animate-[fadeIn_0.3s_ease-in]">
      <span className="text-sm text-neutral-400">{label}</span>
      <span className="flex items-center gap-2 text-sm font-medium text-neutral-700">
        {value}
        {image && <Image src={image} alt={value} width={24} height={24} className="w-6 h-6 rounded object-cover" />}
      </span>
    </div>
  );
}

function ClearButton({ visible, onClear }: { visible: boolean; onClear: () => void }) {
  if (!visible) return null;
  return (
    <button
      type="button"
      onClick={onClear}
      className="absolute right-8 top-1/2 translate-y-1 text-neutral-400 hover:text-[var(--color-rose-gold)] transition-colors z-10"
      aria-label="Wyczyść"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

export default function MyBagPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sel, setSel] = useState<Selections>({ name: null, color: null, type: null, length: null, yarn: null, cord: null });
  const [showClear, setShowClear] = useState(false);
  const [productImages, setProductImages] = useState<Record<string, string>>({});
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    fetch(`https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/entries?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_KEY}&content_type=product&select=fields.title,fields.thumbnail&include=1`)
      .then((r) => r.json())
      .then((data) => {
        const assets = Object.fromEntries(
          (data.includes?.Asset || []).map((a: any) => [a.sys.id, `https:${a.fields.file.url}`])
        );
        const map: Record<string, string> = {};
        for (const item of data.items) {
          const title = item.fields.title;
          const assetId = item.fields.thumbnail?.sys?.id;
          if (title && assetId && assets[assetId]) map[title] = assets[assetId];
        }
        setProductImages(map);
      })
      .catch(() => {});
  }, []);

  const clearAll = () => {
    setSel({ name: null, color: null, type: null, length: null, yarn: null, cord: null });
    setRemarks("");
    formRef.current?.reset();
    setShowClear(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    try {
      await emailjs.sendForm("formularz", "template_cyejmfu", formRef.current, "e9aXqh1wWz7R1VjQi");
      formRef.current.reset();
      setSel({ name: null, color: null, type: null, length: null, yarn: null, cord: null });
      setRemarks("");
      toast.success("Twoje zamówienie zostało wysłane!");
    } catch {
      toast.danger("Nie udało się wysłać zamówienia.");
    }
  };

  const hasAny = Object.values(sel).some(Boolean);

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-2 font-[Montserrat_Alternates] text-neutral-800">Skomponuj swoją torebkę</h1>
      <p className="text-center text-neutral-400 mb-10">
        Ty decydujesz o kolorze, wzorze i rodzaju paska. Termin realizacji: 14-21 dni.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-md p-8">
          <Form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <ClearButton visible={!!sel.name} onClear={() => setSel((s) => ({ ...s, name: null }))} />
              <Select name="name" isRequired className="w-full" placeholder="Wybierz wzór..." value={sel.name} onSelectionChange={(v) => setSel((s) => ({ ...s, name: v as string | null }))}>
                <Label className="text-sm font-medium text-neutral-600">Wzór</Label>
                <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {patterns.map((p) => <ListBox.Item key={p} id={p} textValue={p}>{p}</ListBox.Item>)}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="relative">
              <ClearButton visible={!!sel.color} onClear={() => setSel((s) => ({ ...s, color: null }))} />
              <Select name="color" isRequired className="w-full" placeholder="Wybierz..." value={sel.color} onSelectionChange={(v) => setSel((s) => ({ ...s, color: v as string | null }))}>
                <Label className="text-sm font-medium text-neutral-600">Kolor okucia</Label>
                <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="złoty" textValue="złoty">złoty</ListBox.Item>
                    <ListBox.Item id="srebrny" textValue="srebrny">srebrny</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="relative">
              <ClearButton visible={!!sel.type} onClear={() => setSel((s) => ({ ...s, type: null }))} />
              <Select name="type" isRequired className="w-full" placeholder="Wybierz..." value={sel.type} onSelectionChange={(v) => setSel((s) => ({ ...s, type: v as string | null }))}>
                <Label className="text-sm font-medium text-neutral-600">Rodzaj paska</Label>
                <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="pleciony" textValue="pleciony">pleciony</ListBox.Item>
                    <ListBox.Item id="łańcuszek" textValue="łańcuszek">łańcuszek</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="relative">
              <ClearButton visible={!!sel.length} onClear={() => setSel((s) => ({ ...s, length: null }))} />
              <Select name="length" isRequired className="w-full" placeholder="Wybierz..." value={sel.length} onSelectionChange={(v) => setSel((s) => ({ ...s, length: v as string | null }))}>
                <Label className="text-sm font-medium text-neutral-600">Długość paska</Label>
                <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="100 cm" textValue="100 cm">100 cm</ListBox.Item>
                    <ListBox.Item id="120 cm" textValue="120 cm">120 cm</ListBox.Item>
                    <ListBox.Item id="inna" textValue="inna">inna (wpisz w uwagach)</ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <ClearButton visible={!!sel.yarn} onClear={() => setSel((s) => ({ ...s, yarn: null }))} />
                <Select name="yarn" className="w-full" placeholder="— opcjonalne —" isDisabled={!!sel.cord} value={sel.yarn} onSelectionChange={(v) => setSel((s) => ({ ...s, yarn: v as string | null }))}>
                  <Label className="text-sm font-medium text-neutral-600">Przędza T-shirt yarn</Label>
                  <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {tyarns.map((y) => <ListBox.Item key={y} id={y} textValue={y}>{y}</ListBox.Item>)}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <div className="relative">
                <ClearButton visible={!!sel.cord} onClear={() => setSel((s) => ({ ...s, cord: null }))} />
                <Select name="cord" className="w-full" placeholder="— opcjonalne —" isDisabled={!!sel.yarn} value={sel.cord} onSelectionChange={(v) => setSel((s) => ({ ...s, cord: v as string | null }))}>
                  <Label className="text-sm font-medium text-neutral-600">Sznurek</Label>
                  <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {cordColors.map((c) => <ListBox.Item key={c} id={c} textValue={c}>{c}</ListBox.Item>)}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium text-neutral-600 mb-1">Uwagi dodatkowe</Label>
              <TextArea name="userRemarks" placeholder="Np. inna długość paska, dodatkowe życzenia..." rows={3} className="w-full" onChange={(e) => setRemarks(e.target.value)} />
            </div>

            <div>
              <Label className="text-sm font-medium text-neutral-600 mb-1">Email</Label>
              <Input name="userEmail" type="email" required placeholder="twoj@email.pl" className="w-full" />
            </div>

            <div className="flex gap-3 mt-2">
              <Button type="submit" className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[var(--color-rose-gold)] to-[var(--color-rose-dark)] text-white font-medium hover:opacity-90 transition-opacity">
                Wyślij zamówienie
              </Button>
              {sel.name && sel.color && sel.type && sel.length && (sel.yarn || sel.cord) && (
                <Button type="button" onPress={() => setShowClear(true)} className="py-3 px-5 rounded-xl border-2 border-[var(--color-rose-gold)] text-[var(--color-rose-gold)] bg-transparent hover:bg-[var(--color-rose-gold)] hover:text-white transition-colors">
                  Wyczyść
                </Button>
              )}
            </div>
          </Form>
        </div>

        {/* Clear confirmation modal */}
        {showClear && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-in]" onClick={() => setShowClear(false)}>
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm mx-4 text-center" onClick={(e) => e.stopPropagation()}>
              <p className="text-lg font-medium text-neutral-800 mb-2">Wyczyścić formularz?</p>
              <p className="text-sm text-neutral-400 mb-6">Wszystkie wybrane opcje zostaną usunięte.</p>
              <div className="flex gap-3 justify-center">
                <Button onPress={() => setShowClear(false)} className="px-5 py-2 rounded-lg border-2 border-neutral-300 text-neutral-600 bg-transparent hover:bg-neutral-100 transition-colors">
                  Anuluj
                </Button>
                <Button onPress={clearAll} className="px-5 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
                  Wyczyść
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Live Preview */}
        <div className="lg:col-span-2">
          <div className="sticky top-28 bg-white rounded-2xl shadow-md p-6 transition-all duration-500">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-sm uppercase tracking-widest text-neutral-400 font-medium">Twój wybór</h3>
              {sel.name && productImages[sel.name] && (
                <Image src={productImages[sel.name]} alt={sel.name} width={56} height={56} className="w-14 h-14 rounded-lg object-cover" />
              )}
            </div>

            {hasAny ? (
              <div className="space-y-0">
                <SummaryRow label="Wzór" value={sel.name} />
                <SummaryRow label="Okucia" value={sel.color} />
                <SummaryRow label="Pasek" value={sel.type} />
                <SummaryRow label="Długość" value={sel.length} />
                <SummaryRow label="Przędza" value={sel.yarn} image={sel.yarn ? yarnImageMap[sel.yarn] : undefined} />
                <SummaryRow label="Sznurek" value={sel.cord} image={sel.cord ? cordImageMap[sel.cord] : undefined} />
              </div>
            ) : (
              <div className="text-center py-8 text-neutral-300">
                <div className="text-4xl mb-3">👜</div>
                <p className="text-sm">Wybierz opcje po lewej,<br />a podsumowanie pojawi się tutaj</p>
              </div>
            )}
          </div>

          {remarks && (
            <div className="mt-4 bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-3 font-medium">Uwagi</h3>
              <p className="text-sm text-neutral-700 whitespace-pre-wrap">{remarks}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
