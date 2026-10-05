/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Calendar, MapPin, Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [page, setPage] = useState(1);
  const [formData, setFormData] = useState({ name: '', attending: 'si' });
  const [submitted, setSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Error al reproducir música:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
      const calculateTimeLeft = () => {
        const now = new Date();
        // Define target time in Buenos Aires (UTC-3)
        // 2026-11-28T13:00:00-03:00
        const target = new Date('2026-11-28T13:00:00-03:00');
        const difference = target.getTime() - now.getTime();

        if (difference > 0) {
          setTimeLeft({
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          });
        }
      };

      calculateTimeLeft();
      const timer = setInterval(calculateTimeLeft, 1000); // Update every second
      return () => clearInterval(timer);
    }, []);

    return (
      <div className="pt-4 font-['Courier_New',monospace]">
        <span className="block text-xs uppercase tracking-widest text-[#6b5d54] mb-2">Cuenta regresiva</span>
        
       <div className="flex gap-4 justify-center text-[#705b4f] text-sm">
  <div className="flex flex-col items-center">
    <span className="text-3xl sm:text-4xl font-bold">{timeLeft.days}</span>
    <span className="text-[11px] uppercase tracking-widest">Días</span>
  </div>
  <div className="flex flex-col items-center">
    <span className="text-3xl sm:text-4xl font-bold">{timeLeft.hours}</span>
    <span className="text-[12px] uppercase tracking-widest">Hs</span>
  </div>
  <div className="flex flex-col items-center">
    <span className="text-3xl sm:text-4xl font-bold">{timeLeft.minutes}</span>
    <span className="text-[12px] uppercase tracking-widest">Min</span>
  </div>
  <div className="flex flex-col items-center">
    <span className="text-3xl sm:text-4xl font-bold">{timeLeft.seconds}</span>
    <span className="text-[12px] uppercase tracking-widest">Seg</span>
  </div>
</div>

      </div>
    );
  };

  const PageTransition = ({ children }: { children: React.ReactNode }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );

  const content = (
    <div className="text-[#6b5d54] font-light relative">
      {/* ================================================================= */}
      {/* CÓDIGO DE MÚSICA (VERDE)                                          */}
      {/* <button 
        onClick={toggleAudio}
        className={`fixed bottom-6 left-6 z-50 p-3 bg-[#4a3f38] text-[#e7e1d4] rounded-full shadow-lg transition-transform hover:scale-110 ${isPlaying ? 'animate-pulse' : ''}`}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>
      */}
      

      {/* NOTA: Para que la música funcione, debes reemplazar el src con un enlace directo a un archivo MP3 (.mp3) */}
      {/*        <audio ref={audioRef} loop src="" />

      ================================================================= */}
      <AnimatePresence mode="wait">
        {page === 1 && (
          <PageTransition key="page1">
            <section className="text-center space-y-8 py-10">
              <h1 className="flex flex-col items-center justify-center text-[#705b4f] leading-[57px]">
                <span className="font-['Great_Vibes'] italic text-[50px] leading-[68px]">Damaris</span>
                <span className="font-['Great_Vibes'] italic text-[32px] leading-[45.2px] my-2">&</span>
                <span className="font-['Great_Vibes'] italic text-[50px] leading-[68px]">Gonzalo</span>
              </h1>
              <p className="text-[20px] text-[#63564d] italic leading-relaxed font-light">
                "Mi amado es mío, yo soy suya. Él apacienta entre los lirios." <br/>
                <span className="text-[16px] text-[#705c51] font-serif not-italic mt-2 block tracking-widest uppercase">Cantares 2:16</span>
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <button onClick={() => setPage(2)} className="text-[#6b5d54] underline text-xs uppercase tracking-widest hover:opacity-70">Siguiente</button>
              </div>
            </section>
          </PageTransition>
        )}

        {page === 2 && (
          <PageTransition key="page2">
            <section className="text-center space-y-8 py-10">
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-[0.3em] text-[#6b5d54] opacity-80">NUESTRO CASAMIENTO</h3>
                <h2 className="text-[43px] font-['Great_Vibes'] italic text-[#705b4f]">D & G</h2>
              </div>
              <p className="italic font-normal text-[#62544b] leading-relaxed pl-[1px] ml-[3px] mb-2">
                Hay momentos en la vida que son inolvidables y compartirlos con las personas que más queremos los hace aún más especial.
              </p>
              <p className="italic font-normal text-[#62544b] leading-relaxed pl-[1px] ml-[3px] mb-[35px]">
                Por eso nos llena de alegría invitarte a celebrar el comienzo de nuestra historia juntos...
              </p>
              <div className="flex justify-center gap-4 mt-8">
                <button onClick={() => setPage(1)} className="text-[#6b5d54] underline text-xs uppercase tracking-widest hover:opacity-70">Volver</button>
                <button onClick={() => setPage(3)} className="text-[#6b5d54] underline text-xs uppercase tracking-widest hover:opacity-70">Siguiente</button>
              </div>
            </section>
          </PageTransition>
        )}

        {page === 3 && (
          <PageTransition key="page3">
            <section className="text-center space-y-8 py-10">
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-[0.3em] text-[#6b5d54] opacity-80">NUESTRO CASAMIENTO</h3>
                <h2 className="text-[44px] font-['Great_Vibes'] italic text-[#705b4f]">D & G</h2>
              </div>
              <div onClick={() => setPage(4)} className="cursor-pointer group flex flex-col items-center justify-center p-12 border border-[#d3c9b7] bg-transparent transition-all hover:bg-[#ded1bd] hover:border-[#9c9181]">
                <Mail width={80} height={100} className="text-[#9c9181] group-hover:text-[#705b4f] transition-colors" />
                <div className="mt-6 border border-[#9c9181] px-6 py-3 text-xs uppercase tracking-[0.2em] text-[#6b5d54] hover:bg-[#c5b8a5] hover:text-white transition-all">
                  ABRIR INVITACIÓN
                </div>
              </div>
              <div className="flex justify-center gap-4 mt-8">
                <button onClick={() => setPage(2)} className="text-[#6b5d54] underline text-xs uppercase tracking-widest hover:opacity-70">Volver</button>
                <button onClick={() => setPage(4)} className="text-[#6b5d54] underline text-xs uppercase tracking-widest hover:opacity-70">Siguiente</button>
              </div>
            </section>
          </PageTransition>
        )}

        {page === 4 && (
          <PageTransition key="page4">
            <section className="text-center space-y-6 py-8">
              <div className="space-y-2">
                <h3 className="text-xs uppercase tracking-[0.3em] text-[#6b5d54] opacity-80">NUESTRO CASAMIENTO</h3>
                <h2 className="text-[44px] font-['Great_Vibes'] italic text-[#705b4f]">D & G</h2>
              </div>

<div className="border-t border-b border-[#9c9181] py-6 flex items-center justify-center gap-2 sm:gap-3 text-[#705b4f] max-w-xs mx-auto">                <div className="flex flex-col items-center">
                  <span className="text-[12px] font-serif tracking-[0.2em] uppercase italic font-normal">Sábado</span>
                </div>

                <div className="border-l border-[#9c9181] h-10"></div>
                
                <div className="flex flex-col items-center justify-center">
                  <span className="font-['Pinyon_Script'] text-4xl sm:text-5xl italic leading-none">28</span>
                  <span className="text-[11px] sm:text-[13px] font-serif tracking-[0.15em] uppercase italic mt-1">Noviembre</span>
                </div>
                
                <div className="border-l border-[#9c9181] h-10"></div>
                
                <div className="flex flex-col items-center justify-center">
                  <span className="font-['Pinyon_Script'] text-[18px] italic whitespace-nowrap">13:00 hs</span>
                </div>
              </div>

              <Countdown />

              <div className="flex flex-col gap-4 pt-4">
                <div className="flex justify-center gap-4">
                  <a href="https://maps.app.goo.gl/r36AgWhptmJhj9Ac6" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[14px] italic font-normal text-[#6b5d54] border border-[#c5b8a5] px-3 py-1.5 hover:bg-[#c5b8a5] hover:text-white transition-all">
                    <MapPin size={12} /> Ubicación
                  </a>
                  <button onClick={() => setPage(5)} className="flex items-center gap-2 text-[14px] italic font-normal leading-[17px] text-[#6b5d54] border border-[#c5b8a5] px-3 py-1.5 hover:bg-[#c5b8a5] hover:text-white transition-all">
                    Confirmar Asistencia
                  </button>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  <button onClick={() => setPage(3)} className="text-[#6b5d54] underline text-xs uppercase tracking-widest hover:opacity-70">Volver</button>
                  <button onClick={() => setPage(5)} className="text-[#6b5d54] underline text-xs uppercase tracking-widest hover:opacity-70">Siguiente</button>
                </div>
              </div>
            </section>
          </PageTransition>
        )}

        {page === 5 && (
          <PageTransition key="page5">
            <section className="text-center space-y-6 py-8 px-4">
              <h2 className="text-2xl font-serif text-[#4a3f38] uppercase tracking-widest">Confirmación de Asistencia</h2>
              <p className="text-[#6b5d54] text-[13px] uppercase tracking-widest">Responder antes del 20 de Noviembre</p>
              
              {!submitted ? (
                <form 
                  onSubmit={(e) => { 
                    e.preventDefault(); 
                    const message = `Hola! Confirmo mi asistencia: 
Nombre: ${formData.name}`;
                    window.open(`https://wa.me/542995509678?text=${encodeURIComponent(message)}`, '_blank');
                    setSubmitted(true); 
                  }} 
                  className="space-y-4 max-w-sm mx-auto text-left"
                >
                  <div className="space-y-1">
                    <label className="text-[14px] italic font-normal text-[#6b5d54]">Nombre y Apellido / Familia *</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Familia Rossi / Juan Pérez" 
                      className="w-full p-3 border border-[#c5b8a5] bg-[#fcf9f2] focus:outline-none focus:border-[#9c9181] transition-all" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})} 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#4a3f38] text-white py-3 mt-4 text-sm tracking-wide uppercase hover:bg-[#382e28] transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    Confirmar por WhatsApp
                  </button>
                </form>
              ) : <p className="text-xl font-serif italic text-[#4a3f38] pt-10">¡Gracias por confirmar, {formData.name}!</p>}
              <div className="flex justify-center gap-4 mt-8">
                <button onClick={() => setPage(4)} className="text-[#6b5d54] underline text-xs uppercase tracking-widest hover:opacity-70">Volver</button>
              </div>
            </section>
          </PageTransition>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5efe6] flex items-center justify-center p-4"
         style={{ backgroundImage: "url('/images/descarga9.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      <div 
        className="relative max-w-md w-full min-h-[500px] p-4 sm:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.05)] bg-[#fcf9f2] flex flex-col justify-center"
        style={{
          backgroundImage: "url('/images/refined_ivory_stationery_texture_1790701088833.jpg')",
          backgroundSize: "cover",
        }}
      >
        
        
        <div className="border border-[#c5b8a5] p-4 sm:p-8 flex-grow flex flex-col justify-center">
          {content}
        </div>
      </div>
    </div>
  );
}
