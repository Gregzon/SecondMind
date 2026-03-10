import { Box } from "@chakra-ui/react";
import InputSection from "./components/InputSection";
import { KnowledgeCardsExplorer } from "./components/KnowledgeCardsExplorer/KnowledgeCardsExplorer";

export const HomePage = () => {
  return (
    <>
      {/* 2. Sticky InputSection */}
      <Box
        position="sticky"
        top="0" // Da sie im Scroll-Container nach der TopBar kommt, ist 0 der Rand des Containers
        zIndex={10}
        bg="bg.app" // Wichtig: Hintergrundfarbe setzen, damit Karten nicht durchscheinen
        paddingBottom={4}
        px="6"
      >
        <InputSection />
      </Box>

      {/* 3. Lanes Bereich */}
      <Box px="6">
        <KnowledgeCardsExplorer />
      </Box>
    </>
  );
};
