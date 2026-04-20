/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./script.js"],
    theme: {
        extend: {
            fontFamily: {
                display: ["Sora", "sans-serif"],
                body: ["Manrope", "sans-serif"],
                techno: ["Space Grotesk", "sans-serif"],
                apple: [
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "'SF Pro Display'",
                    "'SF Pro Text'",
                    "'Helvetica Neue'",
                    "sans-serif",
                ],
            },
            boxShadow: {
                soft: "0 24px 70px rgba(15, 23, 42, 0.12)",
                glass: "0 16px 45px rgba(17, 24, 39, 0.16)",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-12px)" },
                },
                pulseGlow: {
                    "0%, 100%": { opacity: "0.55" },
                    "50%": { opacity: "0.95" },
                },
            },
            animation: {
                float: "float 7s ease-in-out infinite",
                pulseGlow: "pulseGlow 6s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};

