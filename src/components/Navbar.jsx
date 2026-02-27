import React, { useEffect, useState } from 'react';
import { ShoppingBag, Globe } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';
import { useLanguageStore } from '../store/useLanguageStore';
import iconDark from '../assets/icon-dark.png';

const Navbar = () => {
    const { items, toggleCart, isCartAnimating } = useCartStore();
    const { language, setLanguage, t } = useLanguageStore();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);

    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const languages = [
        { code: 'az', label: 'AZ' },
        { code: 'en', label: 'EN' },
        { code: 'ru', label: 'RU' }
    ];

    return (
        <nav className={`fixed top-0 w-full z-40 transition-all duration-200 border-b ${isScrolled ? 'bg-white border-[#332c54] py-3' : 'bg-white/90 backdrop-blur-sm border-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center">

                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <img src={iconDark} alt="Glaven Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                        <div className="flex flex-col">
                            <span className="text-xl md:text-2xl font-black tracking-tighter text-[#332c54] uppercase leading-none mt-1">
                                {t('common.glaven')}
                            </span>
                            <span className="text-[#332c54] font-semibold tracking-widest text-[8px] md:text-[9px] uppercase leading-none mt-1">
                                {t('common.creative_store')}
                            </span>
                        </div>
                    </div>

                    {/* Actions: Language & Cart */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Language Selector */}
                        <div className="relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className={`flex items-center gap-1 p-2 text-[#332c54] transition-all rounded-md text-[10px] md:text-xs font-bold uppercase tracking-widest border border-transparent hover:border-[#332c54] hover:bg-gray-50 ${isLangOpen ? 'bg-gray-50 border-[#332c54]' : ''}`}
                                aria-label="Change Language"
                            >
                                <Globe size={18} strokeWidth={1.5} />
                                <span className="hidden sm:inline">{languages.find(l => l.code === language)?.label}</span>
                            </button>

                            {isLangOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                                    <div className="absolute right-0 mt-2 w-20 bg-white border border-[#332c54] rounded-md shadow-lg overflow-hidden z-50">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code);
                                                    setIsLangOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2 text-[10px] font-bold transition-colors 
                                                ${language === lang.code
                                                        ? 'bg-[#332c54] text-white hover:bg-[#332c54]/90'
                                                        : 'text-[#332c54] bg-white hover:bg-gray-100'}`}
                                            >
                                                {lang.label}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Cart Icon */}
                        <button
                            onClick={toggleCart}
                            className={`relative flex items-center justify-center p-2 text-[#332c54] hover:bg-gray-50 border border-transparent hover:border-[#332c54] transition-all ${isCartAnimating ? 'scale-125 rotate-12 duration-150' : 'duration-300'} rounded-md`}
                            aria-label={t('common.open_cart')}
                            style={{
                                transitionTimingFunction: isCartAnimating ? 'cubic-bezier(0.34, 1.56, 0.64, 1)' : 'ease-out'
                            }}
                        >
                            <ShoppingBag size={22} strokeWidth={1.5} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-[#332c54] text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center border border-white rounded-full">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
