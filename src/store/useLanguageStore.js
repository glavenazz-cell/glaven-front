import { create } from 'zustand';
import az from '../locales/az.json';
import en from '../locales/en.json';
import ru from '../locales/ru.json';

const translations = { az, en, ru };

export const useLanguageStore = create((set, get) => ({
    language: localStorage.getItem('language') || 'az',
    setLanguage: (lang) => {
        localStorage.setItem('language', lang);
        set({ language: lang });
    },
    t: (key, replacements = {}) => {
        const { language } = get();
        const keys = key.split('.');
        let value = translations[language];

        for (const k of keys) {
            value = value?.[k];
        }

        if (typeof value !== 'string') return key;

        Object.entries(replacements).forEach(([k, v]) => {
            value = value.replace(`{${k}}`, v);
        });

        return value;
    }
}));
