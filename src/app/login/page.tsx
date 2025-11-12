export default function LoginPage() {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-black text-zinc-50 font-sans px-4">
      <div className="w-full max-w-md bg-zinc-900/50 border border-zinc-800 rounded-2xl shadow-lg p-8">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-semibold text-[#b6ff00]">Foco Total</h1>
          <p className="text-zinc-400 text-sm mt-2">
            Bem-vindo de volta! Faça login para continuar.
          </p>
        </header>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className="h-11 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm outline-none focus:ring-2 focus:ring-[#b6ff00]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Senha
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-11 rounded-lg bg-zinc-800 border border-zinc-700 px-3 text-sm outline-none focus:ring-2 focus:ring-[#b6ff00]"
            />
          </div>

          <button
            type="submit"
            className="mt-4 h-11 rounded-lg bg-[#b6ff00] text-black font-semibold hover:opacity-90 transition"
          >
            Entrar
          </button>
        </form>

        <footer className="mt-6 text-sm text-center text-zinc-400">
          Não tem conta?{" "}
          <a
            href="/register"
            className="text-[#b6ff00] hover:underline underline-offset-4"
          >
            Crie agora
          </a>
        </footer>
      </div>
    </main>
  );
}
