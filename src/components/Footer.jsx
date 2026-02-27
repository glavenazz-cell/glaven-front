import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#332c54] text-white pt-12 pb-8 border-t-[8px] border-[#332c54]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">

                    <div className="space-y-4 max-w-sm">
                        <span className="text-2xl font-black tracking-tighter uppercase flex flex-col">
                            GLAVEN
                            <span className="font-semibold text-[8px] tracking-[0.3em] uppercase mt-1">
                                Creative Store
                            </span>
                        </span>
                        <p className="text-gray-300 text-xs leading-relaxed font-mono w-4/5 pt-2">
                            Premium şüşə içki dəstləri və stəkanlar. Sifarişləriniz WhatsApp vasitəsilə təhlükəsiz şəkildə qəbul edilir.
                        </p>
                    </div>

                    <div className="w-full md:w-auto">
                        <h4 className="text-[10px] font-black mb-4 uppercase tracking-widest text-[#B0A8D9]">Əlaqə</h4>
                        <ul className="space-y-3 text-xs text-white font-medium">
                            <li>
                                <a href="tel:+994702400150" className="hover:text-[#E0DBF8] transition-colors">+994 70 240 01 50</a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="border-t border-[#463D70] pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <p className="text-[10px] font-black text-[#8C84B5] tracking-widest uppercase">
                        © {new Date().getFullYear()} GLAVEN
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
