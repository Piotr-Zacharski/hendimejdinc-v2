"use client";

import { Select, Label, ListBox, Form, Button, TextArea, Input, toast } from "@heroui/react";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const patterns = [
  "Plecak Dolores", "Torebka Halszka", "Torebka Janette",
  "Torebka Makkaresh", "Torebka Margerita", "Torebka Myszka", "Torebka Myszka 2",
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

type Selections = {
  name: string | null;
  color: string | null;
  type: string | null;
  length: string | null;
  yarn: string | null;
  cord: string | null;
};

function SummaryRow({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="flex justify-between items-center py-2 border-b border-rose-50 last:border-0 animate-[fadeIn_0.3s_ease-in]">
      <span className="text-sm text-neutral-400">{label}</span>
      <span className="text-sm font-medium text-neutral-700">{value}</span>
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

  const clearAll = () => {
    setSel({ name: null, color: null, type: null, length: null, yarn: null, cord: null });
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
              <Select name="name" isRequired className="w-full" value={sel.name} onSelectionChange={(v) => setSel((s) => ({ ...s, name: v as string | null }))}>
                <Label className="text-sm font-medium text-neutral-600">Wzór</Label>
                <Select.Trigger><Select.Value placeholder="Wybierz wzór..." /><Select.Indicator /></Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    {patterns.map((p) => <ListBox.Item key={p} id={p} textValue={p}>{p}</ListBox.Item>)}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            <div className="relative">
              <ClearButton visible={!!sel.color} onClear={() => setSel((s) => ({ ...s, color: null }))} />
              <Select name="color" isRequired className="w-full" value={sel.color} onSelectionChange={(v) => setSel((s) => ({ ...s, color: v as string | null }))}>
                <Label className="text-sm font-medium text-neutral-600">Kolor okucia</Label>
                <Select.Trigger><Select.Value placeholder="Wybierz..." /><Select.Indicator /></Select.Trigger>
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
              <Select name="type" isRequired className="w-full" value={sel.type} onSelectionChange={(v) => setSel((s) => ({ ...s, type: v as string | null }))}>
                <Label className="text-sm font-medium text-neutral-600">Rodzaj paska</Label>
                <Select.Trigger><Select.Value placeholder="Wybierz..." /><Select.Indicator /></Select.Trigger>
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
              <Select name="length" isRequired className="w-full" value={sel.length} onSelectionChange={(v) => setSel((s) => ({ ...s, length: v as string | null }))}>
                <Label className="text-sm font-medium text-neutral-600">Długość paska</Label>
                <Select.Trigger><Select.Value placeholder="Wybierz..." /><Select.Indicator /></Select.Trigger>
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
                <Select name="yarn" className="w-full" isDisabled={!!sel.cord} value={sel.yarn} onSelectionChange={(v) => setSel((s) => ({ ...s, yarn: v as string | null }))}>
                  <Label className="text-sm font-medium text-neutral-600">Przędza T-shirt yarn</Label>
                  <Select.Trigger><Select.Value placeholder="— opcjonalne —" /><Select.Indicator /></Select.Trigger>
                  <Select.Popover>
                    <ListBox>
                      {tyarns.map((y) => <ListBox.Item key={y} id={y} textValue={y}>{y}</ListBox.Item>)}
                    </ListBox>
                  </Select.Popover>
                </Select>
              </div>

              <div className="relative">
                <ClearButton visible={!!sel.cord} onClear={() => setSel((s) => ({ ...s, cord: null }))} />
                <Select name="cord" className="w-full" isDisabled={!!sel.yarn} value={sel.cord} onSelectionChange={(v) => setSel((s) => ({ ...s, cord: v as string | null }))}>
                  <Label className="text-sm font-medium text-neutral-600">Sznurek</Label>
                  <Select.Trigger><Select.Value placeholder="— opcjonalne —" /><Select.Indicator /></Select.Trigger>
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
              <TextArea name="userRemarks" placeholder="Np. inna długość paska, dodatkowe życzenia..." rows={3} className="w-full" />
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
            <h3 className="text-sm uppercase tracking-widest text-neutral-400 mb-4 font-medium">Twój wybór</h3>

            {hasAny ? (
              <div className="space-y-0">
                <SummaryRow label="Wzór" value={sel.name} />
                <SummaryRow label="Okucia" value={sel.color} />
                <SummaryRow label="Pasek" value={sel.type} />
                <SummaryRow label="Długość" value={sel.length} />
                <SummaryRow label="Przędza" value={sel.yarn} />
                <SummaryRow label="Sznurek" value={sel.cord} />
              </div>
            ) : (
              <div className="text-center py-8 text-neutral-300">
                <div className="text-4xl mb-3">👜</div>
                <p className="text-sm">Wybierz opcje po lewej,<br />a podsumowanie pojawi się tutaj</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
