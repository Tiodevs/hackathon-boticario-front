interface StatCardProps {
  titulo: string;
  valor: number; // Passa a quantidade de projetos ou tarefas aqui!
  variacao: number;
  variacaoPositiva: boolean;
}

export default function StatCard({ titulo, valor, variacao, variacaoPositiva }: StatCardProps) {
  return (
    <div className="rounded-xl bg-[#121212] border border-[#303030] px-8 py-6 flex flex-col items-start min-w-[220px] max-w-[320px]">
      <span className="text-base font-medium text-white mb-1">{titulo}</span>
      <div className="flex items-end gap-3">
        <span className="text-3xl font-bold text-white">{valor}</span>
        
      </div>
    </div>
  );
}
