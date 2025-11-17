'use client';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import StatCard from '@/components/ui/StatCard';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';

interface UserProfile {
  nome: string;
}

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dados
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [primeiroNome, setPrimeiroNome] = useState<string>('');
  const [projetos, setProjetos] = useState<number>(0);
  const [tarefas, setTarefas] = useState<number>(0);
  useEffect(() => {
    // Foto do localStorage SEMPRE que montar componente
    const savedImg = localStorage.getItem('profileImage');
    if (savedImg) setProfileImg(savedImg);

    // Nome do usuário autenticado
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then((data: UserProfile | null) => {
        if (data?.nome) setPrimeiroNome(data.nome.split(' ')[0]);
      });

    // Total de projetos
    fetch('/api/projects')
      .then(res => res.ok ? res.json() : [])
      .then(arr => setProjetos(Array.isArray(arr) ? arr.length : 0));

    // Total de tarefas
    fetch('/api/tasks')
      .then(res => res.ok ? res.json() : [])
      .then(arr => setTarefas(Array.isArray(arr) ? arr.length : 0));
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setProfileImg(fileURL);
      localStorage.setItem('profileImage', fileURL);
    }
  }

  function openFileSelector() {
    fileInputRef.current?.click();
  }

  // Exemplo de variação para o mês, ajuste conforme back futuramente
  const variacaoProjetos = 11.01;
  const variacaoTarefas = -4;

  return (
    <ProtectedRoute>
      <div>
        <Header />
        <div className="min-h-screen bg-[#0A0A0A] text-white px-5 py-12 flex flex-col gap-10">
          <div className="flex flex-col items-center gap-3">
            {profileImg ? (
              <img
                src={profileImg}
                alt="Profile"
                className="w-44 h-44 rounded-full border-2 border-[#212528] object-cover cursor-pointer"
                onClick={openFileSelector}
              />
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
              onChange={handleFileChange}
            />

            <p className="mt-2 text-xl font-semibold font-barlow text-white">
              {primeiroNome}
            </p>
          </div>

          <div className="flex justify-center w-full mb-8">
            <Link href="/settings" passHref>
              <button className="h-10 px-6 flex items-center justify-center rounded-xl border border-[#303030] bg-[#121212]">
                <span className="text-base font-medium font-barlow">Configurações</span>
              </button>
            </Link>
          </div>

          <section className="flex-1 w-full flex flex-col md:flex-row items-center justify-center gap-7">
          <StatCard
  titulo="Projetos Criados"
  valor={projetos}
  variacao={variacaoProjetos}
  variacaoPositiva={variacaoProjetos > 0}
/>
<StatCard
  titulo="Tarefas Criadas"
  valor={tarefas}
  variacao={variacaoTarefas}
  variacaoPositiva={variacaoTarefas > 0}
/>

          </section>
        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
