import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        sendData: {
          '0%': { transform: 'translate(-50%, -50%) scale(1)', opacity: '1' },
          '100%': { transform: 'translate(-50%, -50%) scale(0) translate(100px, -100px)', opacity: '0' },
        },
        rippleEffect: {
          '0%': { width: '0px', height: '0px', opacity: '1' },
          '100%': { width: '200px', height: '200px', opacity: '0' },
        },
      },
      animation: {
        sendData: 'sendData 3s infinite',
        rippleEffect: 'rippleEffect 3s infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
