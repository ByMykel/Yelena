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
            opacity: ["disabled", "group-focus"],
            cursor: ["disabled"],
            scale: ["group-hover", "group-focus"],
            textColor: ["group-focus"]
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
