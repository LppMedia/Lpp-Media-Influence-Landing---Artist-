import React, { useState, useRef, useEffect } from 'react';
import GooeyNav from './components/GooeyNav';
import Aurora from './components/Aurora';
import LaserFlow from './components/LaserFlow';
import Carousel from './components/Carousel'; // Still imported but unused in services
import MagicBento, { BentoItem } from './components/MagicBento'; // Import MagicBento
import MetricsGrid from './components/MetricsGrid';
import ScrollReveal from './components/ScrollReveal'; // Import ScrollReveal
import { 
  Play, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  Music, 
  Instagram,
  ChevronDown,
  Plus,
  Calendar,
  Volume2,
  VolumeX
} from 'lucide-react';
import { FAQItem, ServiceItem, Testimonial } from './types';
import ColorBends from './components/ColorBends';

// --- Data & Constants ---

// Extended ServiceItem to include ID for Carousel and now Bento
interface ExtendedServiceItem extends ServiceItem {
  id: number;
  label?: string; // Add label for Bento
}

const SERVICES: ExtendedServiceItem[] = [
  {
    id: 1,
    title: "Investigación de Nicho",
    description: "Analizamos dónde está tu audiencia real para no disparar al aire. Identificamos micro-culturas que conectan con tu sonido.",
    icon: <Users className="w-8 h-8 text-violet-400" />,
    label: "Estrategia"
  },
  {
    id: 2,
    title: "Selección de Influencers",
    description: "Curaduría manual de creadores que realmente convierten, no solo números. Buscamos engagement real y afinidad de marca.",
    icon: <CheckCircle2 className="w-8 h-8 text-blue-400" />,
    label: "Curaduría"
  },
  {
    id: 3,
    title: "Creatividad Viral",
    description: "Guiones y conceptos diseñados para retener la atención en TikTok y Reels. Creamos hooks que detienen el scroll.",
    icon: <Play className="w-8 h-8 text-pink-400" />,
    label: "Contenido"
  },
  {
    id: 4,
    title: "Gestión & Reportes",
    description: "Nos encargamos de todo el proceso, negociación y pagos. Te entregamos métricas claras de impacto y conversión.",
    icon: <BarChart3 className="w-8 h-8 text-emerald-400" />,
    label: "Resultados"
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Carlos R.",
    role: "Artista Urbano",
    quote: "Llevaba 2 años pegado en los mismos números. Con la campaña de LPP, mi último single explotó en TikTok en 2 semanas.",
    result: "+1.5M Vistas"
  },
  {
    id: 2,
    name: "BrandX Clothing",
    role: "Marca de Ropa Streetwear",
    quote: "Nunca habíamos probado influencers. El ROI fue inmediato. Vendimos el stock de la colección en 48 horas.",
    result: "Sold Out"
  },
  {
    id: 3,
    name: "Sofía M.",
    role: "Cantante Pop",
    quote: "No es solo que publiquen, es la estrategia detrás. Me sentí acompañada y entendieron mi vibra al 100%.",
    result: "+20k Seguidores"
  }
];

const FAQS: FAQItem[] = [
  {
    question: "¿Cuál es el presupuesto mínimo para empezar?",
    answer: "Trabajamos con presupuestos adaptados a objetivos serios. En la llamada estratégica analizamos tu situación actual para recomendarte la inversión óptima."
  },
  {
    question: "¿En cuánto tiempo veo resultados?",
    answer: "Nuestras campañas suelen mostrar tracción en los primeros 7-10 días desde el lanzamiento del contenido de los influencers."
  },
  {
    question: "¿Trabajan con artistas independientes?",
    answer: "Sí, siempre y cuando tengan material de calidad profesional y presupuesto para invertir en su crecimiento."
  },
  {
    question: "¿Cómo eligen a los influencers?",
    answer: "Usamos herramientas de data para verificar que sus seguidores sean reales y que su audiencia coincida con tu mercado objetivo."
  },
  {
    question: "¿Sirve para marcas que nunca han hecho esto?",
    answer: "Absolutamente. Es el mejor momento para empezar. Nosotros te guiamos desde cero para que no cometas errores de novato."
  }
];

// --- Components ---

const SectionHeader = ({ title, subtitle, center = false }: { title: string, subtitle?: string, center?: boolean }) => (
  <div className={`mb-12 ${center ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 leading-tight">
      {title}
    </h2>
    {subtitle && <p className="text-slate-400 text-lg max-w-2xl mx-auto">{subtitle}</p>}
  </div>
);

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-violet-500/30 transition-colors ${className}`}>
    {children}
  </div>
);

interface AccordionProps {
  item: FAQItem;
}

const Accordion: React.FC<AccordionProps> = ({ item }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="border-b border-slate-800">
      <button 
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-violet-400' : 'text-slate-200 group-hover:text-white'}`}>
          {item.question}
        </span>
        <span className={`ml-4 p-1 rounded-full border transition-all ${isOpen ? 'rotate-45 border-violet-500 bg-violet-500/20 text-violet-300' : 'border-slate-700 text-slate-400'}`}>
          <Plus className="w-5 h-5" />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-slate-400 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

// --- Main App ---

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Sync state with video element properties
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (!isMuted) {
        // Force max volume when unmuted
        videoRef.current.volume = 1.0;
      }
    }
  }, [isMuted]);

  const toggleAudio = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="bg-slate-950 min-h-screen font-sans selection:bg-violet-500/30 selection:text-violet-200">
      <GooeyNav />

      {/* Wrapper for Hero and Problem section to share Aurora background */}
      <div className="relative">
        
        {/* Shared Aurora Background */}
        <div className="absolute inset-0 z-0 bg-black">
           <Aurora
            colorStops={['#020617', '#2e1065', '#4c1d95']}
            speed={0.5}
            amplitude={1.2}
           />
           {/* Gradient overlay to fade it out at the bottom if needed */}
           <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950 z-10 pointer-events-none" />
        </div>

        {/* HERO SECTION */}
        <section id="hero" className="relative min-h-screen flex items-center pt-32 md:pt-48 pb-12 overflow-hidden z-10">
          
          <div className="container mx-auto px-6 lg:px-8 relative z-20 w-full h-full">
            <div className="grid lg:grid-cols-2 gap-8 items-center h-full">
              
              {/* Left Column: ALL Text */}
              <div className="flex flex-col justify-center space-y-6 order-1">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Aceptando nuevos clientes</span>
                </div>
                
                <div className="space-y-4">
                  {/* Main Headline */}
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white leading-[1.1] tracking-tight">
                    Si no estás creciendo, es por falta de <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400">estrategia.</span>
                  </h1>
                  
                  {/* Description */}
                  <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                    Ayudamos a artistas y marcas a salir del estancamiento. Viralizamos tu proyecto usando influencers reales y contenido que convierte.
                  </p>
                </div>

                {/* Bullet Points */}
                <div className="space-y-3 pt-2">
                  {[
                    "Campañas virales en TikTok e Instagram.",
                    "Red de +3000 creadores listos para hablar de ti.",
                    "Enfoque en ROI: Visualizaciones ,streams, ventas o leads."
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-200">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
                        <CheckCircle2 className="w-3 h-3 text-violet-400" />
                      </div>
                      <span className="text-base font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Video & Laser Effect */}
              <div className="flex flex-col items-center justify-center order-2 relative">
                {/* LASER EFFECT: Connected behind the video */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-[100%] bottom-0 w-[400px] md:w-[600px] -z-10 pointer-events-none mix-blend-screen opacity-90">
                  <LaserFlow 
                    color="#a78bfa" 
                    wispDensity={1.5} 
                    flowSpeed={0.4}
                    fogIntensity={0.5}
                    horizontalSizing={1.0}
                  />
                </div>

                <div className="w-full relative z-10">
                    {/* Glow effect behind */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-blue-600 rounded-2xl blur-2xl opacity-20"></div>
                    
                    {/* Video Box */}
                    <div className="relative bg-black rounded-xl border border-slate-800 shadow-2xl overflow-hidden aspect-[16/9] w-full group">
                      <video 
                        ref={videoRef}
                        src="https://res.cloudinary.com/dmkx2uowd/video/upload/v1763916139/video_tqlnk8.mp4"
                        className="absolute inset-0 w-full h-full object-contain bg-black"
                        muted={isMuted}
                        loop
                        playsInline
                        autoPlay
                      />
                       {/* Subtle Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
                      
                      {/* Audio Toggle Button */}
                      <button
                        type="button"
                        onClick={toggleAudio}
                        className="absolute bottom-4 right-4 z-30 bg-black/60 hover:bg-violet-600/90 backdrop-blur-md text-white p-3 rounded-full transition-all duration-300 border border-white/20 group-hover:scale-110 flex items-center gap-2 shadow-lg"
                        aria-label={isMuted ? "Activar sonido" : "Silenciar"}
                      >
                        {isMuted ? (
                          <>
                            <VolumeX className="w-5 h-5" />
                            <span className="text-xs font-bold pr-1 hidden group-hover:inline-block transition-opacity">Activar Audio</span>
                          </>
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                </div>
              </div>

            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="hidden lg:block absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
            <ChevronDown className="w-5 h-5" />
          </div>
        </section>

        {/* PROBLEM / SOLUTION SECTION */}
        <section className="py-24 px-4 relative z-10">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-slate-800 backdrop-blur-sm">
              {/* Problem - Semi-transparent background to show Aurora */}
              <div className="bg-slate-950/80 p-10 md:p-16 border-b md:border-b-0 md:border-r border-slate-800">
                <div className="inline-block px-3 py-1 rounded bg-red-500/10 text-red-400 text-xs font-bold mb-6 uppercase tracking-wider">
                  El Problema
                </div>
                
                {/* ScrollReveal for Problem Heading */}
                <ScrollReveal 
                   baseRotation={5}
                   enableBlur={true}
                   baseOpacity={0.2}
                   containerClassName="mb-6"
                   textClassName="text-3xl font-display font-bold text-white leading-tight"
                >
                  Tu música merece ser escuchada… no quedarse estancada.
                </ScrollReveal>

                <p className="text-slate-400 mb-6 leading-relaxed">
                  Has invertido en estudios, videos, anuncios y esfuerzo… pero los números no responden. 
                  Mientras otros artistas con menos talento se viralizan, tú sigues subiendo contenido que no despega.
                  <br /><br />
                  <span className="text-slate-200 font-bold border-l-2 border-red-500 pl-3 block">
                    No es falta de talento. Es falta de estrategia.
                  </span>
                </p>
                
                <p className="text-white font-bold mb-4">❌ Problemas que estás viviendo ahora mismo:</p>
                
                <ul className="space-y-4">
                  {[
                    "Vistas congeladas en 200–300 por video sin importar cuánto publiques.",
                    "Spotify no recomienda tu música ni te coloca en playlists relevantes.",
                    "Tus lanzamientos mueren en 24 horas sin generar tracción ni nuevos oyentes.",
                    "Agencias que solo te venden posts, sin sistema, sin estrategia y sin métricas reales."
                  ].map((pain, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <span className="text-red-500 mt-1 flex-shrink-0 font-bold">✕</span>
                      <span>{pain}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Solution - Semi-transparent background */}
              <div className="bg-slate-900/70 p-10 md:p-16 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                 
                 <div className="inline-block px-3 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs font-bold mb-6 uppercase tracking-wider">
                  La Transformación
                </div>

                {/* ScrollReveal for Solution Heading */}
                <ScrollReveal 
                   baseRotation={-5}
                   enableBlur={true}
                   baseOpacity={0.2}
                   containerClassName="mb-6"
                   textClassName="text-3xl font-display font-bold text-white leading-tight"
                >
                  La nueva era: Viralidad Programada
                </ScrollReveal>

                <p className="text-slate-300 mb-8 leading-relaxed">
                  En LPP Media no dejamos nada a la suerte. Inyectamos tu música o marca en conversaciones reales a través de cientos de micro-influencers simultáneamente.
                </p>
                <ul className="space-y-4">
                  {[
                    "Alcance masivo en días, no años.",
                    "Contenido generado por usuarios (UGC) auténtico.",
                    "Efecto 'bola de nieve' en algoritmos.",
                    "Comunidad real que interactúa y compra."
                  ].map((gain, i) => (
                    <li key={i} className="flex items-start gap-3 text-white font-medium">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      {gain}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SERVICES SECTION - NOW USING MAGIC BENTO */}
      <section id="servicios" className="py-24 px-4 bg-slate-950 border-t border-slate-900">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader 
            title="Más que influencers, una maquinaria de crecimiento" 
            subtitle="Un sistema completo de 4 pasos para garantizar que tu campaña tenga impacto real."
            center 
          />
          
          <div className="flex justify-center items-center w-full py-8">
            <MagicBento 
              items={SERVICES}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              particleCount={12}
              glowColor="167, 139, 250" // violet-400 rgb equivalent
            />
          </div>
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section id="resultados" className="py-24 px-4 bg-slate-900/30 border-y border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative lg:sticky lg:top-24">
              <SectionHeader 
                title="Resultados que pagan las facturas" 
                subtitle="Deja de medir likes vacíos. Nosotros nos enfocamos en métricas que mueven tu carrera o negocio."
              />
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/50 border border-slate-800">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-red-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
                     {/* TikTok Icon */}
                     <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                     </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">+1 Billion</div>
                    <div className="text-sm text-slate-400">Vistas en campañas en TikTok</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-950/50 border border-slate-800">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-black to-slate-800 border border-slate-700 flex items-center justify-center text-white">
                     <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">+10,000</div>
                    <div className="text-sm text-slate-400">Creadores activos</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Added MetricsGrid here for visual storytelling */}
              <div className="mb-12">
                 <div className="bg-slate-950/50 border border-slate-800 rounded-2xl p-2 md:p-6 mb-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <TrendingUp className="text-violet-500" />
                        Análisis Detallado de Métricas
                    </h3>
                    <MetricsGrid />
                 </div>
              </div>

              {/* Image Placeholder Card */}
              <div className="relative bg-slate-950 rounded-2xl border border-slate-800 p-2 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[9/16] md:aspect-square bg-slate-900 rounded-xl overflow-hidden relative">
                   <img 
                    src="https://res.cloudinary.com/dmkx2uowd/image/upload/v1763698803/reporte_9_xmbbok.jpg" 
                    alt="Dashboard de métricas" 
                    className="w-full h-full object-contain"
                   />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonios" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader 
            title="Lo que dicen los que ya dieron el salto" 
            center 
          />
          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <Card key={t.id} className="relative">
                <div className="absolute -top-4 -left-2 text-6xl text-violet-900 font-serif opacity-50">"</div>
                <p className="text-slate-300 italic mb-6 relative z-10">
                  {t.quote}
                </p>
                <div className="flex items-center justify-between border-t border-slate-800 pt-4">
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-xs text-slate-500 uppercase">{t.role}</div>
                  </div>
                  <div className="bg-violet-500/10 text-violet-300 text-xs font-bold px-2 py-1 rounded">
                    {t.result}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* BONUS SECTION */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative p-1 rounded-3xl bg-gradient-to-r from-violet-600 via-blue-500 to-purple-600">
            <div className="bg-slate-950 rounded-[20px] p-8 md:p-12 text-center relative overflow-hidden">
              <div className="relative z-10">
                <span className="bg-gradient-to-r from-violet-500 to-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                  Bonus Exclusivo
                </span>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Agenda hoy y llévate una Auditoría Digital Gratis
                </h3>
                <p className="text-slate-400 mb-8 max-w-lg mx-auto">
                  Solo por agendar tu llamada estratégica, analizaremos tus redes actuales y te diremos exactamente dónde estás fallando antes de empezar.
                </p>
                <a 
                  href="#agenda-llamada" 
                  className="inline-block bg-white text-slate-950 font-bold px-8 py-3 rounded-full hover:bg-violet-50 transition-colors"
                >
                  Quiero mi auditoría
                </a>
              </div>
              {/* Background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-violet-500/10 blur-3xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 px-4 bg-slate-900/20">
        <div className="container mx-auto max-w-3xl">
          <SectionHeader title="Preguntas Frecuentes" center />
          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <Accordion key={i} item={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="agenda-llamada" className="py-32 px-4 relative overflow-hidden">
         <div className="absolute inset-0 z-0">
            <ColorBends 
              colors={['#0f172a', '#1e1b4b', '#312e81']} 
              speed={0.1} 
              scale={2}
            />
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"></div>
         </div>

         <div className="container mx-auto max-w-4xl relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl md:leading-tight font-display font-bold text-white mb-6">
              Deja de esperar el "golpe de suerte". <br/>
              <span className="text-violet-400">Constrúyelo con nosotros.</span>
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Si estás listo para dejar de ser el secreto mejor guardado y empezar a ser tendencia, hablemos.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <a 
                href="https://api.leadconnectorhq.com/widget/booking/hMkdMnrM8W8Oyn24jf2B"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-xl shadow-violet-600/30 flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Quiero mi consultoria ahora
              </a>
            </div>
            <p className="mt-6 text-sm text-slate-500">
              Sin compromiso de compra. Solo estrategia pura.
            </p>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <img 
                src="https://res.cloudinary.com/dmkx2uowd/image/upload/v1763696232/isotipo_media_test_vviwcb.png" 
                alt="LPP Media Logo" 
                className="w-6 h-6 object-contain"
              />
              <span className="text-white font-display font-bold text-lg">
                LPP Media
              </span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs">
              Agencia especializada en campañas con influencers para artistas y marcas que buscan impacto real.
            </p>
          </div>

          <div className="flex gap-6 items-center">
            <a 
              href="https://www.instagram.com/lpp.media/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-all hover:scale-110"
              aria-label="Instagram"
            >
              <img 
                src="https://res.cloudinary.com/dmkx2uowd/image/upload/v1765390696/Dise%C3%B1o_sin_t%C3%ADtulo_4_o12q0c.png" 
                alt="Instagram" 
                className="w-10 h-10 object-contain opacity-70 hover:opacity-100 transition-opacity" 
              />
            </a>
            <a 
              href="https://www.tiktok.com/@lpp.media" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-all hover:scale-110"
              aria-label="TikTok"
            >
              <img 
                src="https://res.cloudinary.com/dmkx2uowd/image/upload/v1765390694/Dise%C3%B1o_sin_t%C3%ADtulo_5_vgbrtw.png" 
                alt="TikTok" 
                className="w-10 h-10 object-contain opacity-70 hover:opacity-100 transition-opacity" 
              />
            </a>
            <a 
              href="https://www.linkedin.com/company/lpp-media-influence" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-all hover:scale-110"
              aria-label="LinkedIn"
            >
              <img 
                src="https://res.cloudinary.com/dmkx2uowd/image/upload/v1765390691/Dise%C3%B1o_sin_t%C3%ADtulo_6_t3kbqo.png" 
                alt="LinkedIn" 
                className="w-10 h-10 object-contain opacity-70 hover:opacity-100 transition-opacity" 
              />
            </a>
          </div>
        </div>
        <div className="container mx-auto max-w-6xl mt-8 pt-8 border-t border-slate-900 text-center text-slate-600 text-xs">
          © {new Date().getFullYear()} LPP Media. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}