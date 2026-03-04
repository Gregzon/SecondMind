import { createSystem, defineConfig, defaultBaseConfig } from "@chakra-ui/react"

const config = defineConfig({
    theme: {
        // 1. Tokens (Die Rohdaten der Farben)
        tokens: {
            colors: {
                deepBlue: { value: "#0B1C2E" },
                brandCyan: { value: "#4FD1C5" },
            },
        },
        // 2. Semantic Tokens (Die Logik für Light/Dark)
        semanticTokens: {
            colors: {
                main: {
                    value: { _light: "{colors.brandCyan}", _dark: "{colors.brandCyan}" },
                },
                appBg: {
                    value: { _light: "#F7F9FC", _dark: "#0B1C2E" }, // Oben dunkel, unten hell Logik
                },
                textPrimary: {
                    value: { _light: "{colors.gray.800}", _dark: "white" },
                },
            },
        },
        // 3. Rezepte (Deine Button-Varianten)
        recipes: {
            button: {
                variants: {
                    visual: {
                        action: {
                            bg: "main",
                            color: "black",
                            borderRadius: "xl",
                            _hover: { opacity: 0.9 },
                        },
                        filter: {
                            bg: "whiteAlpha.200",
                            color: "white",
                            borderRadius: "full",
                            _hover: { bg: "whiteAlpha.300" },
                        },
                    },
                },
            },
        },
    },
})

export const system = createSystem(defaultBaseConfig, config)