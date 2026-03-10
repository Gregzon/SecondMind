import { VStack } from "@chakra-ui/react";
import { Lane } from "./components/Lane";

export const KnowledgeCardsExplorer = () => {
  return (
    <VStack align="stretch" gap={0} w="full">
      <Lane title="Heute" timeFilter="today" />
      <Lane title="Morgen" timeFilter="tomorrow" />
      <Lane title="Nächste Woche" timeFilter="next_week" />
      <Lane title="Demnächst" timeFilter="someday" />
    </VStack>
  );
};
