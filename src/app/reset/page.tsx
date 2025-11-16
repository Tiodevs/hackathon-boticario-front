"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { postJSON } from "@/util/api";
import { AuthSideCard } from "@/components/auth/AuthSideCard"; // ⬅️ novo import

export default function ResetPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("err");
      setMsg("E-mail inválido.");
      return;
    }

    try {
      setStatus("loading");
      setMsg("");

      await postJSON("/api/auth/request-password-reset", { email });

      setStatus("ok");
      setMsg("Se o e-mail existir, enviaremos instruções de redefinição.");
    } catch (err: any) {
      setStatus("err");
      setMsg(err?.message || "Falhou ao enviar. Tente novamente.");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <main className="min-h-dvh bg-[#0b0b0b] text-zinc-50 px-4 py-8">
      <div className="mx-auto w-full max-w-6xl md:grid md:grid-cols-2 md:gap-10">
        {/* LADO ESQUERDO – CARD FIEL AO FIGMA */}
        <AuthSideCard />

        {/* FORMULÁRIO */}
        <section className="mt-6 md:mt-0 md:flex md:flex-col md:justify-center">
          <header className="mb-8">
            <div className="mb-8 md:hidden text-lg font-semibold">⚡ FOCO</div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Recuperar conta
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              Você já tem uma conta?{" "}
              <Link href="/login" className="text-[#b6ff00] hover:underline">
                Entrar na conta
              </Link>
            </p>
          </header>

          <form className="space-y-4" onSubmit={onSubmit} noValidate>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="voce@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button type="submit" full disabled={status === "loading"}>
              {status === "loading" ? "Enviando…" : "Enviar e-mail"}
            </Button>

            {status !== "idle" && msg && (
              <p
                role="status"
                aria-live="polite"
                className={`text-sm rounded-md border px-3 py-2 ${
                  status === "ok"
                    ? "border-lime-500/40 bg-lime-500/10 text-lime-300"
                    : "border-red-500/40 bg-red-500/10 text-red-300"
                }`}
              >
                {msg}
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
