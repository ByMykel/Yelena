module.exports = {
    purge: {
        mode: "layers",
        content: ["./public/**/*.html", "./src/**/*.vue"],
    },
    darkMode: false,
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            borderWidth: ["hover", "focus"],
            opacity: ["disabled"],
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
