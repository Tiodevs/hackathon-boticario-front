import Image from "next/image";

export default function Footer() {
  return (
    <div className="hidden md:flex w-full h-16 px-12 justify-center items-center border-t border-[#303030]">
      <div className="flex h-28 justify-between items-center flex-1 max-w-[1046px] w-full">

        {/* LOGOS JUNTOS (lado a lado) */}
        <div className="flex items-center gap-3">
          <Image src="/list-todo 1.svg" alt="Logo lista de tarefas" width={32} height={20} />
          <Image src="/FOCO.svg" alt="Logo FOCO" width={62} height={20} />
        </div>

        {/* ÍCONES SOCIAIS */}
        <div className="flex items-center gap-4">
          <Image src="/instagram.svg" alt="Instagram" width={32} height={32} />
          <Image src="/linkedin.svg" alt="LinkedIn" width={32} height={32} />
          <Image src="/x.svg" alt="Twitter" width={32} height={32} />
        </div>

      </div>
    </div>
  );
}
