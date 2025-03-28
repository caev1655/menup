/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        griffy: ['"Griffy"', 'cursive'],
        montserrat: ['"Montserrat Underline"', 'sans-serif'],
        nunito: ['"Nunito"', 'sans-serif'],
        roboto: ['"Roboto"', 'sans-serif'],
        comic: ['"Comic Neue"', 'cursive'],
        tektur: ['"Tektur"', 'sans-serif'],
        doto: ['"Doto"', 'sans-serif'],
        ribeye: ['"Ribeye Marrow"', 'cursive'],
        winky: ['"Winky Sans"', 'sans-serif'],
        delius: ['"Delius"', 'cursive'],
        handrawn: ['"Delicious Handrawn"', 'cursive'],
        bungee: ['"Bungee Spice"', 'cursive'],
        monoton: ['"Monoton"', 'cursive'],
        moo: ['"Moo Lah Lah"', 'cursive'],
        bigshoulders: ['"Big Shoulders Stencil"', 'sans-serif'],
        playwrite: ['"Playwrite NG Modern"', 'serif'],
        deliusunicase: ['"Delius Unicase"', 'cursive'],
        rubikpuddles: ['"Rubik Puddles"', 'cursive'],
      },
      animation: {
        'flash-twice': 'flash-twice 0.6s ease-in-out 2',
      },
      keyframes: {
        'flash-twice': {
          '0%, 100%': { opacity: '1' },
          '25%, 75%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
