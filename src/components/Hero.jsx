import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-gray-50">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2000&auto=format&fit=crop"
                    alt="Premium collection"
                    className="w-full h-full object-cover opacity-[0.85] saturate-50 mix-blend-multiply"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary-500/20 text-primary-200 border border-primary-500/30 text-sm font-semibold tracking-wider mb-6 backdrop-blur-sm">
                        YENİ KOLEKSİYON
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 drop-shadow-md">
                        Tarzını Seç, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-200">
                            Farkını Yansıt.
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 mb-10 font-medium max-w-lg leading-relaxed">
                        Sınırlı sayıda üretilen premium ürünlerimizle tanışın. Sadece size özel, benzersiz bir alışveriş deneyimi.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <a
                            href="#koleksiyon"
                            className="flex items-center gap-2 bg-white text-gray-900 px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95"
                        >
                            Şimdi Keşfet
                            <ArrowRight size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
