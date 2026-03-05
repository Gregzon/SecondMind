import { HStack, Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

// Wir erweitern die Map, damit alle Kategorien abgedeckt sind
const FILTER_MAP: Record<string, string> = {
  Alles: "all",
  Aufgaben: "task",
  Ideen: "idea",
  Orte: "location",
  Listen: "list",
};

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export const FilterBar = ({ activeFilter, onFilterChange }: FilterBarProps) => {
  const { t } = useTranslation();
  const categories = ["Alles", "Aufgaben", "Ideen", "Orte", "Listen"];

  return (
    <HStack
      gap="2"
      py="2" // Etwas kompakter
      overflowX="auto"
      css={{
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch", // Smooth scroll für iOS
      }}
    >
      {categories.map((cat) => {
        const techValue = FILTER_MAP[cat] || "all";
        const isActive = activeFilter === techValue;

        return (
          <Button
            key={cat}
            onClick={() => onFilterChange(techValue)}
            // Wir nutzen die Tokens für Dynamik
            variant={isActive ? "solid" : "outline"}
            bg={isActive ? "brand.solid" : "transparent"}
            color={isActive ? "black" : "text.muted"}
            borderColor={isActive ? "brand.solid" : "border.subtle"}
            borderRadius="full"
            px="5"
            size="sm"
            fontSize="xs"
            fontWeight="bold"
            transition="all 0.2s"
            flexShrink={0} // Verhindert, dass Buttons gequetscht werden
            _hover={{
              bg: isActive ? "brand.solid" : "bg.panel",
              borderColor: "brand.solid",
              color: isActive ? "black" : "text.main",
            }}
          >
            {/* Hier könnte man später t(`Filter_${cat}`) nutzen */}
            {t(cat)}
          </Button>
        );
      })}
    </HStack>
  );
};
