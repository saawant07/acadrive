/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
@keyframes gentle - rotate {
  0 % { transform: rotateY(0deg) translateY(0px); }
  50 % { transform: rotateY(180deg) translateY(- 15px);
}
100 % { transform: rotateY(360deg) translateY(0px); }
}

.animate - gentle - rotate {
  animation: gentle - rotate 8s infinite linear;
  transform - style: preserve - 3d;
}