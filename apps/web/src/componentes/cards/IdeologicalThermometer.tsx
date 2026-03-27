import React, { useState, useMemo, useEffect } from "react";

import { useContentStore } from "../../store/context";

const IdeologicalThermometer = ({ value = 50 }) => {
  const [valor, setValor] = useState(value);
  const [ideology, setIdeology] = useState<{
    valor: number;
    posicao: string;
  } | null>(null);

  const context = useContentStore();

  // Define as posições ideológicas baseadas no valor (0-100)
  const posicoes = useMemo(() => {
    if (valor <= 10)
      return {
        label: "Esquerda Radical",
        cor: "bg-red-700",
        textColor: "text-red-100",
      };
    if (valor <= 25)
      return {
        label: "Esquerda",
        cor: "bg-red-500",
        textColor: "text-red-100",
      };
    if (valor <= 40)
      return {
        label: "Centro-Esquerda",
        cor: "bg-rose-400",
        textColor: "text-rose-50",
      };
    if (valor <= 60)
      return {
        label: "Centro",
        cor: "bg-purple-500",
        textColor: "text-purple-100",
      };
    if (valor <= 75)
      return {
        label: "Centro-Direita",
        cor: "bg-blue-400",
        textColor: "text-blue-50",
      };
    if (valor <= 90)
      return {
        label: "Direita",
        cor: "bg-blue-600",
        textColor: "text-blue-100",
      };
    return {
      label: "Direita Radical",
      cor: "bg-blue-800",
      textColor: "text-blue-100",
    };
  }, [valor]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novoValor = parseInt(e.target.value);
    setValor(novoValor);
    setIdeology?.({ valor: novoValor, posicao: posicoes.label });
  };

  // Calcula a porcentagem para a barra de progresso colorida
  const porcentagem = valor;

  // Salva a posição ideológica no estado
  useEffect(() => {
    if (ideology) context.setIdeology(ideology.posicao);
  }, [ideology?.posicao]);

  return (
    <div className="mt-4 mb-4 pb-0.5 bg-neutral-900 rounded-2xl">
      <h1 className="font-bold text-xl text-center px-4 py-2">
        Termômetro Ideológico
      </h1>
      <div className="bg-neutral-950 mt-1 m-2 p-4 rounded-b-2xl">
        {/* Container da barra */}
        <div className="relative mb-6">
          {/* Track background com gradiente sutil */}
          <div className="absolute inset-0 h-2 bg-linear-to-r from-red-700 via-purple-500 to-blue-800 rounded-full opacity-20" />

          {/* Barra de progresso colorida */}
          <div
            className="absolute left-0 h-2 rounded-full transition-all duration-150 ease-out"
            style={{
              width: `${porcentagem}%`,
              background: `linear-gradient(to right, #ef4444, #a855f7, #3b82f6)`,
            }}
          />

          {/* Slider input */}
          <input
            type="range"
            min="0"
            max="100"
            value={valor}
            onChange={handleChange}
            className="relative w-full h-6 opacity-0 cursor-pointer z-10"
            style={{ WebkitAppearance: "none" }}
          />

          {/* Thumb visual customizado que segue o valor */}
          <div
            className="absolute top-1.5 -translate-y-1/2 w-6 h-6 bg-white border-2 border-gray-300 rounded-full shadow-md transition-all duration-150 ease-out pointer-events-none"
            style={{ left: `calc(${porcentagem}% - 12px)` }}
          >
            <div
              className={`w-2 h-2 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${posicoes.cor}`}
            />
          </div>

          {/* Marcadores de posição */}
          <div className="flex justify-between mt-1 text-xs text-gray-400 font-medium">
            <span>Esquerda</span>
            <span>Centro</span>
            <span>Direita</span>
          </div>
        </div>

        {/* Card dinâmico */}
        <div
          className={`
          transform transition-all duration-300 ease-out
          ${valor < 40 ? "-rotate-1" : valor > 60 ? "rotate-1" : "rotate-0"}
        `}
        >
          <div
            className={`
            p-4 rounded-xl border-2 border-neutral-600 text-center font-bold text-lg
            transition-all duration-300 shadow-sm
            ${posicoes.cor.replace("bg-", "border-")} 
            ${posicoes.cor.replace("bg-", "bg-opacity-10 bg-")}
          `}
          >
            <span className={posicoes.textColor}>{posicoes.label}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeologicalThermometer;
