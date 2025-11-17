'use client';
import { useRef, useState, useEffect } from 'react';
import StatCard from '@/components/ui/StatCard';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface UserProfile {
  nome: string;
  email: string;
}

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [nomeCompleto, setNomeCompleto] = useState<string>('');
  const [primeiroNome, setPrimeiroNome] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [projetos, setProjetos] = useState<any[]>([]);
  const [tarefas, setTarefas] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editNome, setEditNome] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    const savedImg = localStorage.getItem('profileImage');
    if (savedImg) setProfileImg(savedImg);
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then((data: UserProfile | null) => {
        if (data?.nome) {
          setNomeCompleto(data.nome);
          setPrimeiroNome(data.nome.split(' ')[0]);
          setEditNome(data.nome);
        }
        if (data?.email) setEmail(data.email), setEditEmail(data.email);
      });

    // Projetos
    const storedProjects = localStorage.getItem("projetos");
    if (storedProjects) setProjetos(JSON.parse(storedProjects));
    // Tarefas
    const storedTasks = localStorage.getItem("tarefas");
    if (storedTasks) setTarefas(JSON.parse(storedTasks));

    // Se preferir via API, troque os dois blocos acima por:
    // fetch('/api/projects').then(res => res.ok ? res.json() : []).then(arr => setProjetos(Array.isArray(arr) ? arr : []));
    // fetch('/api/tasks').then(res => res.ok ? res.json() : []).then(arr => setTarefas(Array.isArray(arr) ? arr : []));
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const base64img = event.target?.result as string;
        setProfileImg(base64img);
        localStorage.setItem('profileImage', base64img);
      };
      reader.readAsDataURL(file);
    }
  }

  function openFileSelector() {
    fileInputRef.current?.click();
  }

  function handleSalvarAlteracoes() {
    setNomeCompleto(editNome);
    setEmail(editEmail);
    setShowEditModal(false);
  }

  const variacaoProjetos = 0; // ajuste se quiser variação real
  const variacaoTarefas = 0;

  return (
    <ProtectedRoute>
      <div>
        <Header />
        <div className="min-h-screen bg-[#0A0A0A] text-white px-5 py-12 flex flex-col gap-10">
          <div className="flex flex-col items-center gap-3 relative">
            <button
              onClick={() => setShowEditModal(true)}
              className="absolute -top-4 right-4 md:right-120 md:top-6 hidden sm:block"
              title="Editar perfil"
            >
              <Image src="/settings.svg" alt="settings" height={32} width={32} />
            </button>
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
              {nomeCompleto}
            </p>
            <button
              onClick={() => setShowEditModal(true)}
              className="mt-3 h-10 px-7 flex items-center justify-center rounded-xl border border-[#303030] bg-[#303030] text-white"
            >
              <span className="text-base font-medium font-barlow">Editar perfil</span>
            </button>
            <div className="mt-2 block sm:hidden w-full flex justify-center">
              <button
                className="h-10 rounded-xl border border-[#303030] bg-[#303030] text-white w-full max-w-36"
                onClick={() => setShowEditModal(true)}
              >
                Configurações
              </button>
            </div>
          </div>
          {/* DASHBOARD */}
          <section className="w-full flex flex-col md:flex-row items-center justify-center gap-7">
            <StatCard
              titulo="Projetos Criados"
              valor={projetos.length}
              variacao={variacaoProjetos}
              variacaoPositiva={variacaoProjetos >= 0}
            />
            <StatCard
              titulo="Tarefas Criadas"
              valor={tarefas.length}
              variacao={variacaoTarefas}
              variacaoPositiva={variacaoTarefas >= 0}
            />
          </section>

          {showEditModal && (
            <>
              <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-998" />
              <div className="fixed inset-0 flex items-center justify-center z-999">
                <div className="bg-[#191919] rounded-2xl shadow-xl px-8 py-10 w-[90vw] max-w-lg">
                  <h2 className="mb-6 text-white text-center font-bold text-xl">Editar perfil</h2>
                  <form className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); handleSalvarAlteracoes(); }}>
                    <label className="flex flex-col gap-1 text-sm text-white">
                      Nome
                      <input
                        type="text"
                        value={editNome}
                        onChange={e => setEditNome(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-white text-black"
                        required
                      />
                    </label>
                    <label className="flex flex-col gap-1 text-sm text-white">
                      Email
                      <input
                        type="email"
                        value={editEmail}
                        onChange={e => setEditEmail(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-white text-black"
                        required
                      />
                    </label>
                    <button
                      type="submit"
                      className="w-full h-11 rounded bg-[#C3EC1D] text-black font-semibold hover:opacity-90 transition"
                    >
                      Salvar alterações
                    </button>
                    <button
                      type="button"
                      className="w-full h-11 rounded bg-[#303030] text-white"
                      onClick={() => setShowEditModal(false)}
                    >
                      Cancelar
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}

        </div>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
