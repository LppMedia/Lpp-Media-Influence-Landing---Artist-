import React, { useState, useEffect } from 'react';
import { NavItem } from '../types';
import { Menu, X, Calendar } from 'lucide-react';

const NAV_ITEMS: NavItem[] = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Casos de éxito', href: '#resultados' },
  { label: 'Testimonios', href: '#testimonios' },
  { label: 'FAQ', href: '#faq' },
];

export default function GooeyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 pt-4
        ${scrolled ? 'pt-2' : 'pt-6'}
      `}
    >
      <nav 
        className={`mx-auto max-w-6xl rounded-2xl border transition-all duration-300
          ${scrolled 
            ? 'bg-slate-950/80 backdrop-blur-lg border-slate-800 shadow-xl shadow-purple-900/10 py-2' 
            : 'bg-transparent border-transparent py-4'}
        `}
      >
        <div className="px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <img 
              src="https://res.cloudinary.com/dmkx2uowd/image/upload/v1763696232/isotipo_media_test_vviwcb.png" 
              alt="LPP Media Logo" 
              className="w-[180px] h-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                className="text-sm text-slate-300 hover:text-white font-medium transition-colors relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a 
              href="#agenda-llamada"
              className="flex items-center gap-2 bg-white text-slate-950 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-violet-50 transition-all transform hover:scale-105 shadow-lg shadow-white/10"
            >
              <span>Consultoria gratis</span>
              <Calendar className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4 p-4 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl flex flex-col gap-4">
             {NAV_ITEMS.map((item) => (
              <a 
                key={item.label} 
                href={item.href}
                className="text-slate-300 hover:text-white font-medium py-2 block border-b border-slate-800 last:border-0"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
             <a 
              href="#agenda-llamada"
              className="flex items-center justify-center gap-2 bg-violet-600 text-white w-full py-3 rounded-xl font-bold mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Consultoria gratis
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}