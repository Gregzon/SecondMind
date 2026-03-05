import { Box, VStack, Heading, HStack, Badge } from "@chakra-ui/react";
import { FilterBar } from "./components/FilterBar";
import { MasonryGrid } from "./components/MasonryGrid";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { KnowledgeCards } from "./components/KnowledgeCards/KnowledgeCards";

export const KnowledgeCardsExlorer = () => {
  const { t } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  return (
    // Wir nutzen w="full" statt maxW="md", damit wir die 800px des Layouts voll nutzen
    <VStack align="stretch" gap={6} w="full" mt={4}>
      {/* Header & Filter Kombination */}
      <VStack align="stretch" gap={4}>
        <HStack justify="space-between" align="center">
          <Heading size="md" color="text.main">
            {t("Explorer_Title", "Deine Gedanken")}
          </Heading>
          <Badge
            variant="subtle"
            colorPalette="cyan"
            borderRadius="full"
            px={3}
          >
            {/* Hier könnte später die Anzahl der Karten stehen */}
            12 Karten
          </Badge>
        </HStack>

        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </VStack>

      {/* Das Masonry Grid */}
      <Box w="full">
        <MasonryGrid>
          <KnowledgeCards activeFilter={activeFilter} />
        </MasonryGrid>
      </Box>
    </VStack>
  );
};
