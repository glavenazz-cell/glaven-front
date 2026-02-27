import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Footer from './components/Footer';
import { products } from './data/products';
import { useLanguageStore } from './store/useLanguageStore';

function App() {
  const { t } = useLanguageStore();

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#332c54] selection:text-white">
      <Navbar />
      <CartDrawer />

      <main className="pt-20 md:pt-28 pb-16">

        {/* Brand Intro - Refined Minimalist */}
        <section className="px-4 sm:px-6 mb-8 max-w-7xl mx-auto">
          <div className="text-center py-10 md:py-16 bg-white border border-gray-200 relative">

            <div className="relative z-10 flex flex-col items-center px-4">
              <h1 className="text-4xl md:text-6xl font-black text-[#332c54] tracking-tighter mb-2 uppercase flex flex-col items-center">
                {t('common.glaven')}
                <span className="font-semibold text-[10px] md:text-xs tracking-[0.3em] mt-2 text-[#332c54] uppercase">{t('common.creative_store')}</span>
              </h1>
              <p className="text-sm md:text-base text-gray-500 max-w-md mx-auto font-mono mb-8 mt-4 uppercase tracking-widest border-b border-gray-200 pb-4">
                {t('common.premium_designs')}
              </p>

              <div className="flex flex-wrap justify-center gap-2 max-w-xs mx-auto md:max-w-none">
                <div className="flex items-center gap-1.5 bg-[#332c54] py-1.5 px-3 border border-[#332c54] text-white rounded-md">
                  <span className="text-[10px] font-black tracking-widest uppercase">{t('common.high_quality')}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white py-1.5 px-3 border border-[#332c54] text-[#332c54] rounded-md">
                  <span className="text-[10px] font-black tracking-widest uppercase">{t('common.fast_delivery')}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Grid - Strict Grid styling with soft borders */}
        <section id="collection" className="px-4 sm:px-6 max-w-7xl mx-auto min-h-[50vh]">
          {products.length === 0 ? (
            <div className="text-center py-20 border border-gray-200">
              <p className="text-gray-500 font-mono uppercase tracking-widest text-xs">{t('common.no_products')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-t border-l border-gray-200 bg-white">
              {products.map((product) => (
                <div key={product.id} className="border-b border-r border-gray-200 bg-white">
                  <ProductCard product={product} />
                </div>
              ))}
              {/* Empty state filler for grid to be clean */}
              {Array.from({ length: (3 - (products.length % 3)) % 3 }).map((_, index) => (
                <div key={`empty-${index}`} className="hidden md:block border-b border-r border-gray-200 bg-[#FAFAFA]"></div>
              ))}
              {Array.from({ length: (2 - (products.length % 2)) % 2 }).map((_, index) => (
                <div key={`empty-mobile-${index}`} className="md:hidden border-b border-r border-gray-200 bg-[#FAFAFA]"></div>
              ))}
            </div>
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default App;
