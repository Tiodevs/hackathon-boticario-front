import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <div
            className="
                flex items-center border border-[#303030] bg-[#121212] rounded-[87px]
                
                /* --- MOBILE --- */
                mx-auto mt-4 p-2
                w-auto                    /* 🟢 se ajusta ao conteúdo */
                justify-center            /* 🟢 ícones centralizados */
                
                /* --- DESKTOP --- */
                md:w-full md:max-w-[1042px]
                md:px-10 md:py-3.5
                md:justify-between
            "
        >

            {/* Logo (aparece apenas no desktop) */}
            <div className="hidden md:flex items-center gap-2">
                <Image src="/list-todo 1.svg" alt="" width={32} height={32} />
                <Image src="/FOCO.svg" alt="" width={91} height={20} />
            </div>

            {/* ÍCONES (mobile: centralizados e com container que se ajusta) */}
            <nav
                className="
                    flex items-center gap-5
                    p-0
                
                    /* Ajuste para tamanho perfeito no mobile */
                    scale-90
                
                    md:scale-100 md:p-2.5
                "
            >
                <button className="flex w-8 h-8 items-center justify-center rounded-full hover:bg-yellow-400/10 transition">
                    <Image src="/frame 6.svg" width={32} height={32} alt="Menu" />
                </button>

                <button className="flex w-8 h-8 items-center justify-center rounded-full hover:bg-yellow-400/10 transition">
                    <Image src="/frame 4.svg" width={32} height={32} alt="Config" />
                </button>

                <Link href="/profile">
                    <button className="flex w-8 h-8 items-center justify-center rounded-full hover:bg-yellow-400/10 transition">
                        <Image src="/frame 7.svg" width={32} height={32} alt="Perfil" />
                    </button>
                </Link>
            </nav>
        </div>
    );
}
