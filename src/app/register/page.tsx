"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { postJSON } from "@/util/api";
import { RedirectIfAuth } from "@/components/auth/RedirectIfAuth";
import { AuthSideCard } from "@/components/auth/AuthSideCard"; // ⬅️ novo import

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] =
    useState<"idle" | "loading" | "ok" | "err">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setStatus("loading");
      setMsg("");

      await postJSON("/api/auth/register", { name, email, password });

      setStatus("ok");
      setMsg("Conta criada com sucesso! Você já pode entrar.");

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err: any) {
      setStatus("err");
      setMsg(err?.message || "Falha ao criar a conta");
    } finally {
      setTimeout(() => setStatus("idle"), 4000);
    }
  }

  return (
    <RedirectIfAuth>
      <main className="min-h-dvh bg-[#0b0b0b] text-zinc-50 px-4 py-8">
        <div className="mx-auto w-full max-w-6xl md:grid md:grid-cols-2 md:gap-10">
          {/* LADO ESQUERDO – CARD FIEL AO FIGMA */}
          <AuthSideCard />

          {/* FORMULÁRIO */}
          <section className="mt-6 md:mt-0 md:flex md:flex-col md:justify-center">
            <header className="mb-8">
              <div className="mb-8 md:hidden text-lg font-semibold">
                ⚡ FOCO
              </div>
              <h1 className="text-3xl font-semibold tracking-tight">
                Criar conta
              </h1>
              <p className="mt-1 text-sm text-zinc-400">
                Você já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="text-[#b6ff00] hover:underline"
                >
                  Entrar na conta
                </Link>
              </p>
            </header>

            <form className="space-y-4" onSubmit={onSubmit} noValidate>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm">
                  Nome completo
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Seu nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu-email@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm">
                  Senha
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <Button type="submit" full disabled={status === "loading"}>
                {status === "loading" ? "Criando conta…" : "Criar conta"}
              </Button>

              {msg && (
                <p
                  role="status"
                  aria-live="polite"
                  className={`text-sm mt-2 rounded-md border px-3 py-2 ${
                    status === "ok"
                      ? "border-lime-500/40 bg-lime-500/10 text-lime-300"
                      : "border-red-500/40 bg-red-500/10 text-red-300"
                  }`}
                >
                  {msg}
                </p>
              )}

              <div className="my-4 h-px w-full bg-zinc-800" />

              <Button type="button" variant="ghost" full className="gap-2">
                <Image
                  src="/google.svg"
                  alt="Google"
                  width={18}
                  height={18}
                  className="opacity-90"
                />
                Entrar com o Google
              </Button>
            </form>
          </section>
        </div>
      </main>
    </RedirectIfAuth>
  );
}
