import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Icon,
  Circle,
  Button,
} from "@chakra-ui/react";
import {
  LuPalette,
  LuLanguages,
  LuInfo,
  LuLifeBuoy,
  LuTrash2,
  LuChevronRight,
  LuCheck,
} from "react-icons/lu";
import { useState, useEffect } from "react";

const brandColors = [
  { name: "Azure", value: "#007FFF" },
  { name: "Emerald", value: "#00A36C" },
  { name: "Amethyst", value: "#9D50BB" },
  { name: "Terracotta", value: "#E35335" },
  { name: "Raspberry", value: "#D2315B" },
];

export const SettingsPage = () => {
  const [activeColor, setActiveColor] = useState(
    localStorage.getItem("user-brand-color") || "#00f5ff",
  );

  const handleColorChange = (color: string) => {
    setActiveColor(color);
    document.documentElement.style.setProperty("--app-brand-color", color);
    localStorage.setItem("user-brand-color", color);
  };

  // Initial beim Laden setzen
  useEffect(() => {
    const saved = localStorage.getItem("user-brand-color");
    if (saved)
      document.documentElement.style.setProperty("--app-brand-color", saved);
  }, []);

  return (
    <Box p="4" pb="24" maxW="600px" mx="auto">
      <Heading size="xl" mb="6" color="text.main">
        Einstellungen
      </Heading>
      <VStack gap="8" align="stretch">
        <Box>
          <HStack mb="4" gap="2">
            <Icon as={LuPalette} color="brand.solid" />
            <Text fontWeight="bold" fontSize="sm">
              ERSCHEINUNGSBILD
            </Text>
          </HStack>
          <Box
            bg="bg.panel"
            borderRadius="l_card"
            border="1px solid"
            borderColor="border.subtle"
            p="4"
          >
            <Text fontSize="sm" mb="3">
              Brandfarbe anpassen
            </Text>
            <HStack gap="4">
              {brandColors.map((c) => (
                <Circle
                  key={c.value}
                  size="8"
                  bg={c.value}
                  cursor="pointer"
                  onClick={() => handleColorChange(c.value)}
                  transition="0.2s"
                  _hover={{ transform: "scale(1.1)" }}
                >
                  {activeColor === c.value && (
                    <Icon as={LuCheck} color="black" size="xs" />
                  )}
                </Circle>
              ))}
            </HStack>
          </Box>
        </Box>
        <Box>
          <HStack mb="4" gap="2">
            <Icon as={LuLanguages} color="brand.solid" />
            <Text fontWeight="bold" fontSize="sm">
              KONFIGURATION
            </Text>
          </HStack>
          <VStack
            bg="bg.panel"
            borderRadius="l_card"
            border="1px solid"
            borderColor="border.subtle"
            divideY="1px"
            divideColor="border.subtle"
            align="stretch"
          >
            <SettingItem icon={LuLanguages} label="Sprache" value="Deutsch" />
            <SettingItem icon={LuInfo} label="Anleitung" value="Tour starten" />
            <SettingItem icon={LuLifeBuoy} label="Support" value="Hilfe" />
          </VStack>
        </Box>
        <Button
          variant="outline"
          colorPalette="red"
          w="full"
          py="6"
          borderRadius="l_card"
          gap="3"
          onClick={() => console.log("Delete")}
        >
          <Icon as={LuTrash2} />
          <VStack align="start" gap="0">
            <Text fontWeight="bold">Alle Daten löschen</Text>
            <Text fontSize="xs" opacity="0.8">
              Unwiderruflich
            </Text>
          </VStack>
        </Button>
      </VStack>
    </Box>
  );
};

const SettingItem = ({ icon, label, value }: any) => (
  <HStack
    justify="space-between"
    p="4"
    cursor="pointer"
    _hover={{ bg: "whiteAlpha.50" }}
  >
    <HStack gap="3">
      <Icon as={icon} color="text.muted" size="sm" />
      <Text fontSize="md">{label}</Text>
    </HStack>
    <HStack gap="2">
      <Text fontSize="sm" color="text.muted">
        {value}
      </Text>
      <Icon as={LuChevronRight} size="xs" color="text.muted" />
    </HStack>
  </HStack>
);
