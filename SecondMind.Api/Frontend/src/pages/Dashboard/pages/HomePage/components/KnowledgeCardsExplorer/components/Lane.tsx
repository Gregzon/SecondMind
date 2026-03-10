import { Box, Heading, HStack } from "@chakra-ui/react";
import { KnowledgeCards } from "./KnowledgeCards/KnowledgeCards";

interface LaneProps {
  title: string;
  timeFilter: string;
}

export const Lane = ({ title, timeFilter }: LaneProps) => {
  return (
    <Box
      w="full"
      py={4}
      display="flex"
      flexDirection="column"
      // Dezente Trennlinie zwischen den Lanes
      borderBottomWidth="1px"
      borderColor="border.subtle"
      _last={{ borderBottomWidth: 0 }}
    >
      <Heading
        size="md"
        mb={4}
        color="text.main"
        px={1}
        py={2}
        // Ein kleiner Akzent links neben der Schrift für mehr "Pepp"
        borderLeftWidth="3px"
        borderLeftColor="brand.solid"
        pl={3}
      >
        {title}
      </Heading>

      <HStack
        flex="1"
        gap={6}
        overflowX="auto"
        align="flex-start" // Geändert auf start, damit Karten oben bündig sind
        px={1}
        css={{
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        <KnowledgeCards timeFilter={timeFilter} />

        {/* Spacer damit man nicht am Rand klebt */}
        <Box minW="100px" h="full" />
      </HStack>
    </Box>
  );
};
