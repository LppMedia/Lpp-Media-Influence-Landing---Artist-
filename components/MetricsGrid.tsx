import React, { useState } from 'react';

interface MetricCardProps {
  title: string;
  subtitle?: string;
  children: (isActive: boolean) => React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, subtitle, children }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div 
      className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 relative overflow-hidden hover:border-violet-500/30 transition-all duration-300 h-[320px] flex flex-col shadow-lg group"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-6 z-10 relative shrink-0">
        <div className="mt-1">
             {/* Logo TikTok estilizado */}
            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
            </svg>
        </div>
        <div>
           <h3 className="font-bold text-white text-md leading-tight">{title}</h3>
           {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
      </div>

      {/* Chart Container - Render function pattern to pass active state */}
      <div className="relative flex-1 w-full">
        {children(isActive)}
      </div>
    </div>
  );
};

export default function MetricsGrid() {
  return (
    <div className="grid md:grid-cols-2 gap-4 md:gap-6 w-full">
        {/* --- GRÁFICA 1: LÍNEA (Visualizaciones Diarias) --- */}
        <MetricCard title="Visualizaciones Diarias">
            {(isActive) => (
                <div className="w-full h-full flex flex-col justify-end pb-4 px-2">
                    <div className="relative w-full h-[150px]">
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-600 font-mono z-0">
                            {[100, 75, 50, 25].map((_, i) => (
                                <div key={i} className="border-b border-slate-800/50 w-full h-0"></div>
                            ))}
                        </div>
                        
                        {/* SVG Chart */}
                        <svg className="absolute inset-0 w-full h-full overflow-visible z-10" preserveAspectRatio="none">
                            {/* La línea animada */}
                            <path 
                                d="M0,150 C50,140 100,110 150,80 C200,50 250,30 300,10" 
                                fill="none" 
                                stroke="#ec4899" 
                                strokeWidth="3"
                                strokeDasharray="1000"
                                strokeDashoffset={isActive ? "0" : "1000"}
                                style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
                            />
                            
                            {/* Puntos (Circles) */}
                            {[
                                {cx:0, cy:150, delay:'0ms'}, 
                                {cx:75, cy:125, delay:'200ms'}, 
                                {cx:150, cy:80, delay:'400ms'}, 
                                {cx:225, cy:40, delay:'600ms'}, 
                                {cx:300, cy:10, delay:'800ms'}
                            ].map((point, i) => (
                                <circle 
                                    key={i}
                                    cx={point.cx} 
                                    cy={point.cy} 
                                    r="4" 
                                    fill="#ec4899" 
                                    stroke="#0f172a" 
                                    strokeWidth="2"
                                    className="origin-center"
                                    style={{ 
                                        transform: isActive ? 'scale(1)' : 'scale(0)',
                                        transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                                        transitionDelay: point.delay
                                    }}
                                />
                            ))}
                        </svg>
                    </div>
                    {/* Axis Labels */}
                    <div className="flex justify-between text-[10px] text-slate-500 mt-2 font-mono uppercase">
                        <span>Día 1</span>
                        <span>Día 15</span>
                        <span>Día 30</span>
                    </div>
                </div>
            )}
        </MetricCard>

        {/* --- GRÁFICA 2: DONA (Distribución Engagement) --- */}
        <MetricCard title="Distribución del Engagement Total">
            {(isActive) => (
                <div className="w-full h-full flex flex-col sm:flex-row items-center justify-between px-2">
                    {/* SVG Donut */}
                    <div className="relative w-40 h-40 shrink-0">
                        <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                             {/* Fondo gris de la dona */}
                             <circle cx="50" cy="50" r="40" fill="transparent" stroke="#1e293b" strokeWidth="20" />
                             
                             {/* Segmento 1: Likes (55%) - Rosa */}
                             <circle 
                                cx="50" cy="50" r="40" 
                                fill="transparent" 
                                stroke="#ec4899" 
                                strokeWidth="20"
                                strokeDasharray="251.2" // Circumference ~ 2*PI*40
                                strokeDashoffset={isActive ? "113" : "251.2"} // 251.2 * (1 - 0.55) = 113
                                strokeLinecap="round"
                                style={{ transition: "stroke-dashoffset 1s ease-out 0s" }}
                             />

                             {/* Segmento 2: Comentarios (25%) - Azul */}
                             <circle 
                                cx="50" cy="50" r="40" 
                                fill="transparent" 
                                stroke="#3b82f6" 
                                strokeWidth="20"
                                strokeDasharray="251.2"
                                strokeDashoffset={isActive ? "188.4" : "251.2"} // 251.2 * (1 - 0.25) = 188.4
                                style={{ 
                                    transition: "stroke-dashoffset 1s ease-out 0.2s",
                                    transformOrigin: '50% 50%',
                                    transform: 'rotate(198deg)' // Rotación para empezar donde termina el anterior (360 * 0.55)
                                }}
                             />

                             {/* Segmento 3: Guardados (20%) - Cian */}
                             <circle 
                                cx="50" cy="50" r="40" 
                                fill="transparent" 
                                stroke="#06b6d4" 
                                strokeWidth="20"
                                strokeDasharray="251.2"
                                strokeDashoffset={isActive ? "200.9" : "251.2"} // 251.2 * (1 - 0.20)
                                style={{ 
                                    transition: "stroke-dashoffset 1s ease-out 0.4s",
                                    transformOrigin: '50% 50%',
                                    transform: 'rotate(288deg)' // 198 + (360 * 0.25)
                                }}
                             />
                        </svg>
                        {/* Texto central */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-bold text-white transition-opacity duration-700" style={{ opacity: isActive ? 1 : 0 }}>
                                95%
                            </span>
                        </div>
                    </div>

                    {/* Leyenda */}
                    <div className="space-y-3 text-xs mt-4 sm:mt-0 sm:ml-4 w-full">
                        {[
                            { color: 'bg-pink-500', label: 'Likes (55%)' },
                            { color: 'bg-blue-500', label: 'Comentarios (25%)' },
                            { color: 'bg-cyan-500', label: 'Guardados (20%)' }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between" style={{ opacity: isActive ? 1 : 0.5, transition: `opacity 0.5s ease ${i * 0.1 + 0.5}s` }}>
                                <div className="flex items-center gap-2">
                                    <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                                    <span className="text-slate-300">{item.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </MetricCard>

        {/* --- GRÁFICA 3: BARRAS (Réplicas Generadas) --- */}
        <MetricCard title="Réplicas Generadas por Semana" subtitle="Indicador de Viralidad">
            {(isActive) => (
                <div className="w-full h-full flex items-end justify-around pb-6 gap-4 px-2">
                    {/* Barra 1 */}
                    <div className="flex flex-col items-center gap-2 w-1/3">
                        <span 
                            className="text-[10px] text-slate-400 mb-1 transition-opacity duration-500"
                            style={{ opacity: isActive ? 1 : 0, transitionDelay: '500ms' }}
                        >
                            500
                        </span>
                        <div className="w-full h-[60px] bg-slate-800 rounded-t-sm relative overflow-hidden">
                            <div 
                                className="absolute bottom-0 left-0 right-0 bg-pink-500 w-full h-full origin-bottom"
                                style={{ 
                                    transform: isActive ? 'scaleY(1)' : 'scaleY(0)', 
                                    transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' 
                                }}
                            ></div>
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase">Sem 1</span>
                    </div>

                    {/* Barra 2 */}
                    <div className="flex flex-col items-center gap-2 w-1/3">
                        <span 
                            className="text-[10px] text-slate-400 mb-1 transition-opacity duration-500"
                            style={{ opacity: isActive ? 1 : 0, transitionDelay: '600ms' }}
                        >
                            1200
                        </span>
                        <div className="w-full h-[100px] bg-slate-800 rounded-t-sm relative overflow-hidden">
                             <div 
                                className="absolute bottom-0 left-0 right-0 bg-pink-500 w-full h-full origin-bottom"
                                style={{ 
                                    transform: isActive ? 'scaleY(1)' : 'scaleY(0)', 
                                    transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s' 
                                }}
                            ></div>
                        </div>
                        <span className="text-[10px] text-slate-500 uppercase">Sem 2</span>
                    </div>

                    {/* Barra 3 (Destacada) */}
                    <div className="flex flex-col items-center gap-2 w-1/3">
                        <span 
                            className="text-[10px] text-pink-300 font-bold mb-1 transition-opacity duration-500"
                            style={{ opacity: isActive ? 1 : 0, transitionDelay: '700ms' }}
                        >
                            2800
                        </span>
                        <div className="w-full h-[140px] bg-slate-800 rounded-t-sm relative overflow-hidden shadow-[0_0_15px_rgba(236,72,153,0.1)]">
                             <div 
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-pink-600 to-pink-400 w-full h-full origin-bottom"
                                style={{ 
                                    transform: isActive ? 'scaleY(1)' : 'scaleY(0)', 
                                    transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s' 
                                }}
                            >
                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                        </div>
                        <span className="text-[10px] text-white font-bold uppercase">Sem 3</span>
                    </div>
                </div>
            )}
        </MetricCard>

        {/* --- GRÁFICA 4: ÁREA (Retención) --- */}
        <MetricCard title="Retención de Audiencia">
            {(isActive) => (
                <div className="w-full h-full flex flex-col relative pt-4 px-2">
                    {/* Línea de Punto Crítico (Aparece al final) */}
                    <div 
                        className="absolute top-[35%] left-0 right-0 border-t border-dashed border-white/30 flex items-center z-0 transition-opacity duration-700"
                        style={{ opacity: isActive ? 1 : 0, transitionDelay: '800ms' }}
                    >
                        <span className="text-[9px] text-white/70 bg-slate-900 px-2 ml-auto -mt-5">Punto Crítico</span>
                    </div>
                    
                    <div className="flex-1 relative z-10">
                        <svg className="w-full h-full overflow-visible" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="retentionGradient" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0.8"/>
                                    <stop offset="100%" stopColor="#ec4899" stopOpacity="0.05"/>
                                </linearGradient>
                            </defs>
                            
                            {/* Área de relleno (Fade In + Slide Up) */}
                            <path 
                                d="M0,0 L300,120 L300,150 L0,150 Z" 
                                fill="url(#retentionGradient)" 
                                style={{ 
                                    opacity: isActive ? 1 : 0,
                                    transform: isActive ? 'translateY(0)' : 'translateY(10px)',
                                    transition: 'all 0.8s ease-out'
                                }}
                            />
                            
                            {/* Línea de Borde (Stroke Animation) */}
                            <path 
                                d="M0,0 L300,120" 
                                fill="none" 
                                stroke="#ec4899" 
                                strokeWidth="2"
                                strokeDasharray="400"
                                strokeDashoffset={isActive ? "0" : "400"}
                                style={{ transition: "stroke-dashoffset 1s ease-out" }} 
                            />
                        </svg>
                    </div>

                    <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                        <div className="text-center w-1/4">0s</div>
                        <div className="text-center w-1/4">3s</div>
                        <div className="text-center w-1/4">10s</div>
                        <div className="text-center w-1/4">30s</div>
                    </div>
                    
                    <div 
                        className="text-center mt-3 bg-slate-800/50 rounded-lg py-1 transition-all duration-500"
                        style={{ 
                            opacity: isActive ? 1 : 0, 
                            transform: isActive ? 'translateY(0)' : 'translateY(5px)',
                            transitionDelay: '400ms'
                        }}
                    >
                        <p className="text-[10px] text-white">El "Hook" (Primeros 3s) es <span className="font-bold text-pink-400">Vital</span></p>
                    </div>
                </div>
            )}
        </MetricCard>
    </div>
  );
}