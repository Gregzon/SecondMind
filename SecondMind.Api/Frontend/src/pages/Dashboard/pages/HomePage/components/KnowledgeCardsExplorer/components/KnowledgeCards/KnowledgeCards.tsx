import { Center, Text, VStack } from "@chakra-ui/react";
import { LuSearchX } from "react-icons/lu";
import { KnowledgeCard } from "./components/KnowledgeCard";

interface KnowledgeCardsProps {
  activeFilter: string;
}

// Wir definieren den Typ einmal sauber
type CardType = "task" | "idea" | "location" | "list";

interface CardData {
  id: number;
  cardTitle: string;
  cardBody: string | string[];
  cardType: CardType;
}

export const KnowledgeCards = ({ activeFilter }: KnowledgeCardsProps) => {
  const allCards: CardData[] = [
    {
      id: 1,
      cardTitle: "Test Idea",
      cardBody: "Moiners Idears",
      cardType: "idea",
    },
    {
      id: 2,
      cardTitle: "Test List",
      cardBody: ["Eintrag 1", "Eintrag 2"],
      cardType: "list",
    },
    {
      id: 3,
      cardTitle: "Test Location",
      cardBody: "Moiners Locationers",
      cardType: "location",
    },
    {
      id: 4,
      cardTitle: "Test Task",
      cardBody: "Moiners Taskers",
      cardType: "task",
    },
  ];

  const filteredCards = allCards.filter((card) => {
    if (activeFilter === "all") return true;
    return card.cardType === activeFilter;
  });

  // Empty State, falls der Filter nichts findet
  if (filteredCards.length === 0) {
    return (
      <Center p={10} w="full">
        <VStack gap={2} color="text.muted">
          <LuSearchX size="40px" />
          <Text fontSize="sm">Hier ist noch nichts zu finden...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <>
      {filteredCards.map((card) => (
        <KnowledgeCard
          key={card.id}
          cardTitle={card.cardTitle}
          cardBody={card.cardBody}
          cardType={card.cardType}
        />
      ))}
    </>
  );
};
