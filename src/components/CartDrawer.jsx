import React, { useEffect, useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const CartDrawer = () => {
    const { items, isCartOpen, toggleCart, updateQuantity, removeFromCart } = useCartStore();
    const [isAnimating, setIsAnimating] = useState(false);

    const total = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
            setIsAnimating(true);
        } else {
            document.body.style.overflow = 'unset';
            setIsAnimating(false);
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isCartOpen]);

    const handleWhatsAppCheckout = () => {
        if (items.length === 0) return;

        let message = `*Salam, GLAVEN mağazanızdan sifariş etmək istəyirəm:*\n\n`;

        items.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   Miqdar: ${item.quantity} ədəd\n`;
            message += `   Qiymət: ${(item.price * item.quantity).toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼\n\n`;
        });

        message += `*YEKUN MƏBLƏĞ: ${total.toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼*\n\n`;
        message += `Zəhmət olmasa sifarişimi təsdiq edə bilərsiniz?`;

        // API endpoint for +994702400150
        const whatsappUrl = `https://wa.me/994702400150?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, '_blank');
    };

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-200 ${isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleCart}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-50 transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col border-l border-gray-200`}
                style={{
                    transitionTimingFunction: isCartOpen ? 'cubic-bezier(0.16, 1, 0.3, 1)' : 'cubic-bezier(0.7, 0, 0.84, 0)'
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-black text-[#332c54] tracking-tighter uppercase">Səbət</h2>
                        <span className="bg-[#332c54] text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono border border-transparent">
                            {totalItems}
                        </span>
                    </div>
                    <button
                        onClick={toggleCart}
                        className="p-1.5 text-gray-500 border border-transparent hover:border-gray-200 hover:text-[#332c54] transition-colors bg-white rounded-md"
                        aria-label="Səbəti Bağla"
                    >
                        <X size={20} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#FAFAFA]">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-16 h-16 bg-white border border-gray-200 flex items-center justify-center text-gray-300 rounded-2xl">
                                <ShoppingBag size={32} strokeWidth={1} />
                            </div>
                            <div>
                                <p className="text-sm font-black text-[#332c54] tracking-widest uppercase">Səbətiniz Boşdur</p>
                                <p className="text-gray-500 mt-2 text-xs">Mükəmməl dizaynı öz səbətinizdə görün.</p>
                            </div>
                            <button
                                onClick={toggleCart}
                                className="mt-4 px-6 py-2.5 bg-[#332c54] text-white rounded-md text-[11px] font-black uppercase tracking-widest border border-[#332c54] hover:bg-white hover:text-[#332c54] transition-colors"
                            >
                                Alış-verişə Qayıt
                            </button>
                        </div>
                    ) : (
                        items.map((item, i) => (
                            <div
                                key={item.id}
                                className={`flex gap-3 bg-white rounded-xl border border-gray-200 p-3 transition-all duration-300 ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                <div className="w-16 h-16 overflow-hidden rounded-lg bg-gray-50 border border-transparent flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col flex-1 justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="pr-2">
                                            <h4 className="text-[11px] font-bold text-[#332c54] uppercase tracking-wider line-clamp-2 leading-tight">{item.name}</h4>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-gray-400 hover:text-red-500 transition-colors"
                                            title="Sil"
                                        >
                                            <Trash2 size={14} strokeWidth={1.5} />
                                        </button>
                                    </div>

                                    <div className="flex items-end justify-between mt-2">
                                        <div className="flex items-center border border-gray-200 bg-white rounded-md overflow-hidden">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-7 h-6 flex items-center justify-center text-[#332c54] hover:bg-[#332c54] hover:text-white transition-colors border-r border-gray-200"
                                            >
                                                <Minus size={12} strokeWidth={2} />
                                            </button>
                                            <span className="w-8 text-center text-[12px] font-mono font-bold text-[#332c54]">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-7 h-6 flex items-center justify-center text-[#332c54] hover:bg-[#332c54] hover:text-white transition-colors border-l border-gray-200"
                                            >
                                                <Plus size={12} strokeWidth={2} />
                                            </button>
                                        </div>
                                        <span className="text-sm font-black text-[#332c54] tracking-tighter">
                                            {(item.price * item.quantity).toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {items.length > 0 && (
                    <div className="border-t border-gray-200 bg-white p-5 pb-6">
                        <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-100">
                            <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">Yekun Məbləğ</span>
                            <span className="text-xl font-black text-[#332c54] tracking-tighter">{total.toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼</span>
                        </div>

                        <button
                            onClick={handleWhatsAppCheckout}
                            className="w-full bg-[#332c54] rounded-xl text-white py-4 px-4 flex items-center justify-center gap-3 border border-transparent hover:bg-white hover:text-[#332c54] hover:border-[#332c54] transition-colors group relative overflow-hidden shadow-sm"
                        >
                            <MessageCircle size={18} strokeWidth={1.5} />
                            <span className="text-[12px] font-black uppercase tracking-widest">Sifarişi Tamamla</span>
                        </button>
                        <p className="text-center text-[10px] font-medium text-gray-500 mt-3 flex items-center justify-center gap-1.5 uppercase tracking-widest">
                            <span className="w-1 h-1 bg-[#332c54] rounded-full block animate-ping"></span>
                            Whatsapp ilə sürətli təsdiq
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartDrawer;
