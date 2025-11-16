import Image from "next/image";

export default function Footer() {
  return (
    <div className="flex w-full h-28 px-28 md:px-24 sm:px-6 justify-center items-center border-t border-[#303030] mt-11">
      <div className="flex h-28 justify-between items-center flex-1 max-w-[1046px] w-full">
        {/* Agrupe os logos lado a lado */}
        <div className="flex items-center gap-2">
          <Image src="/list-todo 1.svg" alt="Logo lista de tarefas" width={32} height={32} />
          <Image src="/FOCO.svg" alt="Logo FOCO" width={91} height={20} />
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center">
          <button>
            <Image src="/instagram.svg" alt="Ícone Instagram" width={32} height={32} />
          </button>
          <button>
            <Image src="/linkedin.svg" alt="Ícone LinkedIn" width={32} height={32} />
          </button>
          <button>
            <Image src="/x.svg" alt="Ícone Twitter" width={32} height={32} />
          </button>
        </div>
      </div>
    </div>
  );
}
