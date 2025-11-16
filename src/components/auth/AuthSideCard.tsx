import Image from "next/image";

export function AuthSideCard() {
  return (
    <section className="hidden md:flex items-center justify-center">
      <div className="relative w-[520px] h-[640px] rounded-[32px] overflow-hidden border border-zinc-800/80 bg-zinc-950 shadow-lg">
        {/* Imagem de fundo */}
        <Image
          src="/forest.png"            // usa o mesmo arquivo que você já tem
          alt="Foco - plano de fundo"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay para dar contraste */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-black/10" />

        <header className="absolute top-6 left-6 flex items-center gap-3">
          <div className="relative h-8 w-8 overflow-hidden rounded-md">
            <Image
              src="/logo-foco.png" // teu arquivo
              alt="Logo FOCO"
              fill
              className="object-cover"
              priority
            />
          </div>

  <span className="text-white font-bold tracking-[0.15em] text-xs uppercase">
    FOCO
  </span>
</header>


        {/* TEXTO NO RODAPÉ */}
        <footer className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
          <p className="text-white text-lg font-medium">
            Suas tarefas, seu controle.
          </p>
          <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-zinc-300/80">
            Projeto do hackathon
          </p>
        </footer>
      </div>
    </section>
  );
}
