import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <div
            className="flex items-center justify-between w-full max-w-[1042px] mx-auto bg-[#121212] border border-[#303030] rounded-xl px-4 py-2 mt-2"

        >

            {/* Logo (aparece apenas no desktop) */}
            <div className="hidden md:flex items-center gap-2">
                <Image src="/list-todo 1.svg" alt="" width={32} height={32} />
                <Image src="/FOCO.svg" alt="" width={91} height={20} />
            </div>
            <nav className="flex items-center gap-5 p-0 scale-90 md:scale-100 md:p-2.5">
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
