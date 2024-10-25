import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        "./src/**/*.{js,jsx,ts,tsx,mdx}",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#60a5fa',
                    500: '#3b82f6',
                    600: '#2563eb',
                    700: '#1d4ed8',
                    800: '#1e40af',
                    900: '#1e3a8a',
                }
            }
        },
        fontSize: {
            'xss': ['10px', {
                lineHeight: '12px'
            }],
            'xs': ['12px', {
                lineHeight: '14px'
            }],
            'sm': ['14px', {
                lineHeight: '16px'
            }],
            'base': ['16px', {
                lineHeight: '19px'
            }],
            'lg': ['20px', {
                lineHeight: '29px'
            }],
            'xl': ['24px', {
                lineHeight: '32px'
            }],
            '2xl': ['28px', {
                lineHeight: '33px'
            }],
            '3xl': ['32px', {
                lineHeight: '38px'
            }],
        },
        screens: {
            'xl': '1280px',
            'lg': '1024px',
            'md': '768px',
            'sm': '360px',
            'xs': '320px',
        }
    },

    plugins: [forms],
};
