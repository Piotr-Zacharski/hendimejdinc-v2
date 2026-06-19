"use client";

import { Select, Label, ListBox } from "@heroui/react";

type FormSelectProps = {
  name: string;
  label: string;
  placeholder?: string;
  options: string[] | { id: string; label: string }[];
  value: string | null;
  onChange: (value: string | null) => void;
  isRequired?: boolean;
  isDisabled?: boolean;
  onClear?: () => void;
};

export function FormSelect({ name, label, placeholder = "Wybierz...", options, value, onChange, isRequired, isDisabled, onClear }: FormSelectProps) {
  return (
    <div className="relative">
      {value && onClear && (
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
      )}
      <Select name={name} isRequired={isRequired} isDisabled={isDisabled} className="w-full" placeholder={placeholder} value={value} onSelectionChange={(v) => onChange(v as string | null)}>
        <Label className="text-sm font-medium text-neutral-600">{label}</Label>
        <Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger>
        <Select.Popover>
          <ListBox>
            {options.map((opt) => {
              const id = typeof opt === "string" ? opt : opt.id;
              const text = typeof opt === "string" ? opt : opt.label;
              return <ListBox.Item key={id} id={id} textValue={text}>{text}</ListBox.Item>;
            })}
          </ListBox>
        </Select.Popover>
      </Select>
    </div>
  );
}
