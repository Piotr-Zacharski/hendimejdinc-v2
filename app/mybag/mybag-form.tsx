"use client";

import { Form, Button, TextArea, Input, Label, toast } from "@heroui/react";
import { useRef, useState } from "react";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import { yarnNames, cordNames, yarnImageMap, cordImageMap } from "@/lib/colors";
import { FormSelect } from "@/components/form-select";

const patterns = [
  "Plecak Dolores", "Torebka Halima", "Torebka Janett",
  "Torebka Makkaresh", "Torebka Margerita", "Torebka Myszka", "Torebka Myszka 2",
  "Torebka Vasanti",
];

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

export function MyBagForm({ productImages }: { productImages: Record<string, string> }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [sel, setSel] = useState<Selections>({ name: null, color: null, type: null, length: null, yarn: null, cord: null });
  const [showClear, setShowClear] = useState(false);
  const [remarks, setRemarks] = useState("");

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

  const set = (key: keyof Selections) => (v: string | null) => setSel((s) => ({ ...s, [key]: v }));
  const hasAny = Object.values(sel).some(Boolean);

  return (
    <div className="max-w-5xl mx-auto">
      <p className="text-center text-neutral-400 mb-10">
        Ty decydujesz o kolorze, wzorze i rodzaju paska. Termin realizacji: 14-21 dni.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-md p-8">
          <Form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
            <FormSelect name="name" label="Wzór" placeholder="Wybierz wzór..." options={patterns} value={sel.name} onChange={set("name")} onClear={() => set("name")(null)} isRequired />
            <FormSelect name="color" label="Kolor okucia" options={["złoty", "srebrny"]} value={sel.color} onChange={set("color")} onClear={() => set("color")(null)} isRequired />
            <FormSelect name="type" label="Rodzaj paska" options={["pleciony", "łańcuszek"]} value={sel.type} onChange={set("type")} onClear={() => set("type")(null)} isRequired />
            <FormSelect name="length" label="Długość paska" options={[{ id: "100 cm", label: "100 cm" }, { id: "120 cm", label: "120 cm" }, { id: "inna", label: "inna (wpisz w uwagach)" }]} value={sel.length} onChange={set("length")} onClear={() => set("length")(null)} isRequired />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect name="yarn" label="Przędza T-shirt yarn" placeholder="— opcjonalne —" options={yarnNames} value={sel.yarn} onChange={set("yarn")} onClear={() => set("yarn")(null)} isDisabled={!!sel.cord} />
              <FormSelect name="cord" label="Sznurek" placeholder="— opcjonalne —" options={cordNames} value={sel.cord} onChange={set("cord")} onClear={() => set("cord")(null)} isDisabled={!!sel.yarn} />
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
                <p className="text-sm">Skomponuj swój produkt,<br />a podsumowanie pojawi się tutaj</p>
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
