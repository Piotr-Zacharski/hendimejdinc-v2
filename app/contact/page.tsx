"use client";

import { Input, TextArea, Button, Form, Label, toast } from "@heroui/react";
import { useRef, useState, FormEvent } from "react";
import { init, sendForm } from "@emailjs/browser";

init("e9aXqh1wWz7R1VjQi");

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await sendForm("service_x09bspe", "template_quokdn5", "#contact-form");
      formRef.current?.reset();
      toast.success("Twoja wiadomość została wysłana!");
    } catch {
      toast.danger("Nie udało się wysłać wiadomości.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center mb-2 font-[Montserrat_Alternates] text-neutral-800">Napisz do mnie</h1>
      <p className="text-center text-neutral-400 mb-10">Chętnie odpowiem na każde pytanie :)</p>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <Form id="contact-form" ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input type="hidden" name="_captcha" value="false" />
          <div>
            <Input name="user_name" required placeholder="Twoje imię" className="w-full" />
          </div>
          <div>
            <Input name="user_email" type="email" required placeholder="twoj@email.pl" className="w-full" />
          </div>
          <div>
            <TextArea name="user_text" required placeholder="Napisz wiadomość..." rows={5} className="w-full" />
          </div>
          <Button type="submit" isDisabled={sending} className="w-full py-3 rounded-xl bg-gradient-to-r from-[var(--color-rose-gold)] to-[var(--color-rose-dark)] text-white font-medium hover:opacity-90 transition-opacity">
            {sending ? "Wysyłanie..." : "Wyślij wiadomość"}
          </Button>
        </Form>

      </div>
    </div>
  );
}
