'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';
import Header from '@/components/ui/Header';
import Footer from '@/components/ui/Footer'; 
import { EditProfileModal } from '@/components/ui/EditProfileModal';

export default function SettingsPage() {
  const { logout, user } = useAuth();
  const router = useRouter();
  const [profileImg, setProfileImg] = useState<string | null>(null);
const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    const savedImg = localStorage.getItem('profileImage');
    if (savedImg) setProfileImg(savedImg);
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <ProtectedRoute>

      <Header />

      <div className="min-h-screen bg-[#0A0A0A] flex flex-col justify-between">

        {/* Main Content */}
        <main className="flex flex-col items-center gap-9 w-full max-w-[1042px] px-5 mx-auto">
          {profileImg ? (
            <img
              src={profileImg}
              alt="Profile"
              className="w-44 h-44 rounded-full border-2 border-[#212528] object-cover"
            />
          ) : (
            <div className="w-44 h-44 rounded-full bg-[#121212] border-2 border-[#212528]" />
          )}

          <div className="flex flex-col items-start gap-2 w-full max-w-[360px]">
            <button onClick={() => setModalOpen(true)} className="settings-option">
  <span className="settings-option-text">Editar perfil</span>
</button>
<EditProfileModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} user={user} />

            <button className="settings-option">
              <span className="settings-option-text">Suporte</span>
            </button>

            <button onClick={handleLogout} className="settings-option-danger">
              <span className="settings-option-text-danger">Sair da conta</span>
            </button>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
