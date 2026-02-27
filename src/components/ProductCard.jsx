import React, { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useCartStore';

const ProductCard = ({ product }) => {
  const { addToCart, items } = useCartStore();
  const [clicked, setClicked] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);

    // Quick pop animation
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  const inCart = items.some(item => item.id === product.id);
  const qty = items.find(item => item.id === product.id)?.quantity || 0;

  return (
    <div
      className={`group flex flex-col bg-white border border-transparent transition-all duration-200 h-full relative
      ${clicked ? 'scale-[0.97] bg-gray-50' : 'hover:bg-neutral-50'} `}
      style={{
        transitionTimingFunction: clicked ? 'ease-in' : 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}
    >
      <div className="relative aspect-square md:aspect-[4/5] overflow-hidden bg-gray-50 border-b border-gray-100 rounded-t-xl mx-2 mt-2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-300 rounded-t-xl"
          loading="lazy"
        />

        {/* Simple Top Label */}
        <div className="absolute top-2 left-2">
          <span className="bg-[#332c54] text-white text-[9px] md:text-[10px] font-black uppercase px-2 py-1 tracking-widest block rounded-md shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Mobile Quick Add Button - Sharp edges */}
        <button
          onClick={handleAddToCart}
          className={`absolute bottom-2 right-2 md:bottom-3 md:right-3 w-10 md:w-12 h-10 md:h-12 border rounded-full ${inCart ? 'bg-[#332c54] text-white border-[#332c54]' : 'bg-white text-[#332c54] border-[#332c54] hover:bg-[#332c54] hover:text-white hover:border-[#332c54]'} flex items-center justify-center transition-colors shadow-sm`}
          aria-label="Səbətə Əlavə Et"
        >
          {qty > 0 && <span className="absolute -top-1.5 -left-1.5 bg-[#332c54] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-mono border-2 border-white z-10">{qty}</span>}
          <ShoppingBag size={18} strokeWidth={1.5} className="md:w-5 md:h-5" />
        </button>
      </div>

      <div className="p-3 md:p-4 flex flex-col flex-grow bg-transparent">
        <h3 className="text-[12px] md:text-sm font-bold text-[#332c54] mb-1 line-clamp-2 leading-tight uppercase tracking-tight">
          {product.name}
        </h3>
        {/* Price and Add button area */}
        <div className="flex items-end justify-between mt-auto pt-2">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-[10px] md:text-xs text-gray-400 line-through tracking-tight decoration-red-400 font-medium">
                {product.originalPrice.toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼
              </span>
            )}
            <span className="text-sm md:text-base font-black text-[#332c54] tracking-tighter">
              {product.price.toLocaleString('az-AZ', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ₼
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
