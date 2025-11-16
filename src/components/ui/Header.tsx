import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <div className="flex w-full max-w-[1042px] p-3.5 pl-10 justify-between items-center rounded-[87px] border border-[#303030] bg-[#121212]">


            {/* Logo FOCO */}
            <div className="flex items-center gap-2">
                <Image src="/list-todo 1.svg" alt="" width={32} height={32} />
                <Image src="/FOCO.svg" alt="" width={91} height={20} />
            </div>


            <nav className="flex items-center gap-6 rounded-87 p-2.5">

                <button className="flex p-0 rounded-full border-none bg-transparent cursor-pointer hover:bg-yellow-400/10 transition w-8 h-8 items-center justify-center">
                    <Image src="/frame 6.svg" alt="Ícone menu" width={32} height={32} />
                </button>

                <button className="flex p-0 rounded-full border-none bg-transparent cursor-pointer hover:bg-yellow-400/10 transition w-8 h-8 items-center justify-center">

                    <Image src="/frame 4.svg" alt="Frame 4" width={32} height={32} />
                </button>


                <Link href="/profile">
                    <button className="flex p-0 rounded-full border-none bg-transparent cursor-pointer hover:bg-yellow-400/10 transition w-8 h-8 items-center justify-center">
                        <Image src="/frame 7.svg" alt="Perfil" width={32} height={32} />
                    </button>
                </Link>
            </nav>
        </div>
    );
}
