import { createSystem, defineConfig, mergeConfigs, defaultConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  theme: {
    semanticTokens: {
  colors: {
    // Der Hintergrund der App (jetzt etwas weicher/grauer)
    "bg.app": {
      value: { base: "#F1F3F5", _dark: "{colors.gray.950}" }, 
    },
    // Die Karten (Panel) bleiben Weiß, um Tiefe zu erzeugen
    "bg.panel": {
      value: { base: "#f7fbffb0", _dark: "{colors.gray.900}" },
    },
    // Deine dynamische Brandfarbe
    "brand.solid": {
  value: { 
    // Wir nutzen Azure (Blue 500/600) als Standard-Fallback
    base: "var(--app-brand-color, {colors.blue.500})", 
    _dark: "var(--app-brand-color, {colors.blue.600})" 
  },
    },
    // Text etwas entspannter als reines Schwarz
    "text.main": {
      value: { base: "#1A202C", _dark: "{colors.white}" },
    },
    "text.muted": {
      value: { base: "#4A5568", _dark: "{colors.whiteAlpha.600}" },
    },
    "border.subtle": {
      value: { base: "#E9ECEF", _dark: "{colors.whiteAlpha.100}" },
    }
  },
      radii: {
        "l_card": { value: "16px" },
        "l_button": { value: "12px" },
      },
      sizes: {
        "app_width": { value: "450px" },
        "dashboard_width": { value: "800px" },
      },
      spacing: {
        "page_padding": { value: { base: "{spacing.4}", md: "{spacing.10}" } },
      }
    },
    recipes: {
      button: {
        className: "chakra-button",
        base: {
          borderRadius: "l_button",
          fontWeight: "bold",
          transition: "all 0.2s",
          flex: 1,
          _hover: { opacity: 0.9, transform: "translateY(-1px)" },
        },
        variants: {
          variant: {
            solid: {
              bg: "brand.solid",
              color: "black !important",
            },
            outline: {
              borderColor: "border.subtle",
              color: "text.main",
              _hover: { bg: "bg.app" },
            },
            ghost: {
                color: "text.muted",
                _hover: { color: "text.main", bg: "whiteAlpha.50" }
            }
          },
        },
      },
    },
  },
})

export const system = createSystem(mergeConfigs(defaultConfig, customConfig))