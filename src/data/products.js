import productImage1 from '../images/product1.jpeg';
import productImage2 from '../images/product2.jpeg';
import productImage3 from '../images/product3.jpeg';

export const products = [
    {
        id: 1,
        name: 'Çift Cidarlı Espresso Bardağı',
        price: 15.00,
        originalPrice: 22.00,
        image: productImage1,
        category: 'Bardak',
        description: 'Minimalist tasarım, üstün yalıtım kapasitesi kahvenizin tadını bozmadan ideal ısıda tutar.',
        rating: 4.9
    },
    {
        id: 2,
        name: 'El Yapımı Latte & Çay Kupası',
        price: 13.99,
        originalPrice: 19.99,
        image: productImage2,
        category: 'Kupa',
        description: 'Keskin hatlı ve ince duvarlı, soğuk sıcak tüm içecekleriniz için birinci sınıf borosilikat kupa.',
        rating: 4.8
    },
    {
        id: 3,
        name: 'GLAVEN Signature Soğuk İçecek Seti',
        price: 16.99,
        originalPrice: 24.99,
        image: productImage3,
        category: 'Set',
        description: 'Soğuk kahve ve buzlu çaylarınız için ideal yüksek kapasiteli kristal berraklığında cam bardak.',
        rating: 5.0
    }
];
