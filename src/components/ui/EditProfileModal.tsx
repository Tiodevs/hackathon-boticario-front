import { useState } from 'react';
import Image from 'next/image';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: { photoURL?: string };
}

export function EditProfileModal({ isOpen, onClose, user }: EditProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-[#111] w-full max-w-md md:max-w-2xl mx-4 rounded-2xl p-6 flex flex-col items-center">
        {/* Ícone/logo */}
        <div className="flex items-center gap-2 mb-5">
          <Image src="/list-todo 1.svg" width={42} height={42} alt="Logo" />
          <span className="text-white font-bold text-2xl md:text-4xl">FOCO</span>
        </div>

        {/* Foto de perfil */}
        <Image
          src={user?.photoURL || '/default-profile.png'}
          width={96}
          height={96}
          alt="Avatar"
          className="rounded-full border-4 border-[#202429] mb-5 object-cover"
        />

        {/* Formulário */}
        <form className="w-full flex flex-col gap-2 mb-2">
          <input type="text" placeholder="Nome completo" className="input-form" />
          <input type="email" placeholder="Email" className="input-form" />
          <input type="text" placeholder="Número" className="input-form" />
          <button type="submit" className="bg-[#C3EC1D] text-black py-2 mt-2 rounded-full font-semibold">
            SALVAR
          </button>
        </form>
        <span className="text-xs text-white mb-2">Você quer mudar de senha?</span>
        {/* Actions/ícones no rodapé */}
        <div className="flex gap-4 mt-4">
          {/* Renderizar ícones com botões conforme design */}
        </div>
        {/* Botão de fechar */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white text-xl">&times;</button>
      </div>
    </div>
  );
}
