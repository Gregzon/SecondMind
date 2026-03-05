import { createSystem, defineConfig, mergeConfigs, defaultConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  theme: {
    // Token
    semanticTokens: {
      colors: {
        "bg.app": {
          value: { base: "{colors.gray.50}", _dark: "{colors.gray.950}" },
        },
        "bg.panel": {
          value: { base: "{colors.white}", _dark: "{colors.gray.900}" },
        },
        "brand.solid": {
          value: { base: "{colors.cyan.400}", _dark: "{colors.cyan.500}" },
        },
        "text.main": {
          value: { base: "{colors.gray.900}", _dark: "{colors.white}" },
        },
        "text.muted": {
          value: { base: "{colors.gray.500}", _dark: "{colors.whiteAlpha.600}" },
        },
        "border.subtle": {
          value: { base: "{colors.gray.200}", _dark: "{colors.whiteAlpha.100}" },
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
      input: {
        base: {
          bg: "bg.app",
          borderRadius: "md",
          _focus: { ring: "2px", ringColor: "brand.solid" }
        }
      }
    },
  },
})

// Hier nutzen wir mergeConfigs jetzt aktiv!
// Es vereint die Standard-Werte (Breakpoints, Spacing) mit deinen Tokens.
const finalConfig = mergeConfigs(defaultConfig, customConfig)

export const system = createSystem(finalConfig)