'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StatCard from '@/components/ui/StatCard';




export default function ProfilePage() {

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado da imagem, inicializa com a salva no localStorage
  const [profileImg, setProfileImg] = useState<string | null>(null);

  useEffect(() => {
    // Carrega a imagem salva ao montar componente
    const savedImg = localStorage.getItem('profileImage');
    if (savedImg) {
      setProfileImg(savedImg);
    }
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setProfileImg(fileURL);
      localStorage.setItem('profileImage', fileURL); // salva no localStorage
    }
  }

  function openFileSelector() {
    fileInputRef.current?.click();
  }

  return (
    <div>
      <><div className="min-h-screen bg-[#0A0A0A] text-white px-5 py-12 flex flex-col gap-14">
        <header className="flex items-center justify-center gap-10">
          <div className="flex items-center gap-2">
            <Image src="/list-todo 1.svg" alt="Ícone FOCO" width={40} height={40} />
            <Image src="/FOCO.svg" alt="Logo FOCO" height={40} width={100} />
          </div>
        </header>

        <div className="flex flex-col items-center gap-9">
          {profileImg ? (
            <img
              src={profileImg}
              alt="Profile"
              className="w-44 h-44 rounded-full border-2 border-[#212528] object-cover cursor-pointer"
              onClick={openFileSelector} />
          ) : (
            <button
              type="button"
              onClick={openFileSelector}
              className="w-44 h-44 rounded-full bg-white flex items-center justify-center text-[#0A0A0A] font-barlow font-medium cursor-pointer"
              aria-label="Clique para adicionar imagem"
            >
              clique para adicionar imagem
            </button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange} />
        </div>

        <Link href="/configuracoes" passHref>
          <button className="w-full h-[53px] px-5 flex items-center justify-center rounded-xl border border-[#303030] bg-[#121212]">
            <span className="text-lg font-medium font-barlow">Configurações</span>
          </button>
        </Link>
      </div><section className="flex-1 flex flex-col gap-6">
          <h2 className="text-lg font-medium font-barlow">Relatório Mensal</h2>

          <div className="grid grid-cols-2 gap-9">
            <StatCard />
          </div>
        </section></>
    </div>
  );
}
