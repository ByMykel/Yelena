module.exports = {
    purge: {
        mode: "layers",
        content: ["./public/**/*.html", "./src/**/*.vue"],
    },
    darkMode: "class",
    theme: {
        extend: {
            transitionProperty: {
                width: "width",
            },
            zIndex: {
                "-10": "-10",
            },
            colors: {
                gray: {
                    50: "hsl(0, 0%, 98%)",
                    100: "hsl(240, 5%, 90%)",
                    200: "hsl(240, 6%, 86%)",
                    300: "hsl(240, 5%, 64%)",
                    400: "hsl(240, 5%, 45%)",
                    500: "hsl(240, 4%, 36%)",
                    600: "hsl(240, 5%, 24%)",
                    700: "hsl(240, 5%, 16%)",
                    800: "hsl(240, 4%, 10%)",
                    900: "hsl(240, 5%, 4%)",
                },
            },
        },
    },
    variants: {
        extend: {
            borderWidth: ["hover", "focus"],
            opacity: ["disabled", "group-focus"],
            cursor: ["disabled"],
            scale: ["group-hover", "group-focus"],
            textColor: ["group-hover", "group-focus"],
            animation: ["group-hover", "group-focus"],
            width: ["group-hover", "group-focus"],
            height: ["group-hover", "group-focus"],
            display: ["group-hover"],
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
