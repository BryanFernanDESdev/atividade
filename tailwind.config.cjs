/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js,svelte,ts}", // Inclui arquivos TypeScript, caso sejam usados
        "./public/index.html" // Garante que o Tailwind analise o arquivo HTML principal
    ],
    theme: {
        extend: {
            // Adicione personalizações de tema aqui, se necessário
        },
    },
    plugins: [
        // Adicione plugins do Tailwind aqui, se necessário
    ],
};