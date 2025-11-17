'use client'
import Image from "next/image"
import Link from "next/link"

export default function Hearder() {
    return (
<div className="flex items-center justify-center md:justify-between w-full max-w-[1042px] mx-auto bg-[#121212] border border-[#303030] rounded-xl px-4 py-2 mt-2">
  {/* Logo apenas desktop */}
  <div className="hidden md:flex items-center gap-2">
    <Image src="/list-todo 1.svg" alt="" width={32} height={32} />
    <Image src="/FOCO.svg" alt="" width={91} height={20} />
  </div>
  <nav className="flex items-center justify-center md:justify-start gap-5 w-fit md:w-auto p-0 scale-90 md:scale-100 md:p-2.5">
    <Link href="/projects">
      <button className="flex w-8 h-8 items-center justify-center rounded-full hover:bg-yellow-400/10 transition">
        <Image src="/frame 6.svg" width={32} height={32} alt="Menu" />
      </button>
    </Link>
    <Link href="/tasks">
      <button className="flex w-8 h-8 items-center justify-center rounded-full hover:bg-yellow-400/10 transition">
        <Image src="/frame 4.svg" width={18} height={18} alt="" className="pointer-events-none" />
      </button>
    </Link>
    <Link href="/profile">
      <button className="flex w-8 h-8 items-center justify-center rounded-full hover:bg-yellow-400/10 transition">
        <Image src="/frame 7.svg" width={32} height={32} alt="Perfil" />
      </button>
    </Link>
  </nav>
</div>

    )
}

