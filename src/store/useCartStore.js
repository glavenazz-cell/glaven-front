import { create } from 'zustand';

export const useCartStore = create((set) => ({
    items: [],
    isCartOpen: false,
    isCartAnimating: false,
    toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
    addToCart: (product) => set((state) => {
        // Trigger animation
        setTimeout(() => set({ isCartAnimating: false }), 300);

        const existing = state.items.find((item) => item.id === product.id);
        if (existing) {
            return {
                items: state.items.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                ),
                isCartAnimating: true
            };
        }
        return {
            items: [...state.items, { ...product, quantity: 1 }],
            isCartAnimating: true
        };
    }),
    removeFromCart: (id) => set((state) => ({
        items: state.items.filter(item => item.id !== id)
    })),
    updateQuantity: (id, quantity) => set((state) => ({
        items: quantity === 0
            ? state.items.filter(item => item.id !== id)
            : state.items.map(item => item.id === id ? { ...item, quantity } : item)
    })),
    clearCart: () => set({ items: [] })
}));
