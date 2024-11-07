/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
        "./src/contexts/**/*.{js,ts,jsx,tsx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",

    ],
    theme: {
        extend: {
            colors : {
                textGrey: "#858585",
                inputBgDarkGrey: "#f8fafb"
            }
        },
    },
    plugins: [],
}

