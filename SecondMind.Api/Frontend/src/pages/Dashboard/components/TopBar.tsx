import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  Stack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { LuBrainCircuit, LuMoon, LuSun } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
// Importiere den Hook aus deinem UI-Ordner oder direkt von Chakra
import { useColorMode } from "@/components/ui/color-mode";

const TopBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      w="full"
      h="full"
      px="4"
      bg="bg.panel/80"
      backdropFilter="blur(10px)"
      borderBottomWidth="1px"
      borderColor="border.subtle"
    >
      {/* Linke Seite: Logo und App-Name */}
      <HStack
        gap="3"
        cursor="pointer"
        onClick={() => navigate("/dashboard")}
        _hover={{ opacity: 0.8 }}
        transition="opacity 0.2s"
      >
        <Box p="1.5" borderRadius="l_button" bg="brand.solid/10">
          <Icon as={LuBrainCircuit} w="6" h="6" color="brand.solid" />
        </Box>
        <Stack gap="0" lineHeight="1.1">
          <Text
            fontWeight="bold"
            fontSize="sm"
            color="text.main"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Second
          </Text>
          <Text
            fontWeight="black"
            fontSize="sm"
            color="brand.solid"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Mind
          </Text>
        </Stack>
      </HStack>

      {/* Rechte Seite: Actions & Profile */}
      <HStack gap="3">
        {/* Color Mode Toggle */}
        <IconButton
          variant="subtle"
          bg="transparent"
          aria-label="Toggle Color Mode"
          onClick={toggleColorMode}
          color="text.muted"
          _hover={{ color: "brand.solid", bg: "whiteAlpha.100" }}
          size="sm"
        >
          {colorMode === "light" ? <LuMoon /> : <LuSun />}
        </IconButton>

        {/* User Avatar */}
        <Avatar.Root
          as="button"
          size="sm"
          colorPalette="cyan" // Nutzt deine Brand-Farbe
          bg={"transparent"}
          variant="subtle" // Schöner, dezenter Hintergrund
          borderWidth="2px"
          borderColor="border.subtle"
          _hover={{ borderColor: "brand.solid", transform: "scale(1.05)" }}
          transition="all 0.2s"
          onClick={() => console.log("Profile Clicked")}
        >
          {/* Ohne Avatar.Image wird dieser Fallback immer angezeigt */}
          <Avatar.Fallback
            name="Gregor Sch"
            color="brand.solid" // Deine Cyan-Schrift
            fontWeight="bold"
            fontSize="xs"
          />
        </Avatar.Root>
      </HStack>
    </Flex>
  );
};

export default TopBar;
