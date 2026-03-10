import { Center, Text, VStack } from "@chakra-ui/react";
import { LuSearchX } from "react-icons/lu";
import { KnowledgeCard } from "./components/KnowledgeCard";

interface KnowledgeCardsProps {
  timeFilter: string; // "today" | "tomorrow" | "next_week" | "someday"
}

interface CardData {
  id: number;
  cardTitle: string;
  cardBody: string | string[];
  // Die Smart-Felder sind optional
  location?: string;
  time?: string;
  dueDate: string; // Internes Datum zum Filtern (YYYY-MM-DD)
}

export const KnowledgeCards = ({ timeFilter }: KnowledgeCardsProps) => {
  // Beispiel-Daten passend zum neuen Konzept
  const allCards: CardData[] = [
    {
      id: 1,
      cardTitle: "Rewe einkaufen",
      cardBody: ["Katzenstreu", "Wurst", "Käse"],
      location: "Rewe",
      time: "18:00",
      dueDate: "2026-03-06", // Heute
    },
    {
      id: 2,
      cardTitle: "Idee: Neuer Blogpost",
      cardBody: "Thema: KI im Alltag",
      dueDate: "2026-03-07", // Morgen
    },
    {
      id: 3,
      cardTitle: "Fitnessstudio",
      cardBody: "Beintraining",
      location: "McFit",
      dueDate: "2026-03-10", // Nächste Woche
    },
    {
      id: 4,
      cardTitle: "Projekt-Kickoff",
      cardBody: "Meeting mit dem Team",
      time: "09:00",
      dueDate: "2026-03-06", // Heute
    },
  ];

  // Logik zum Filtern basierend auf der Lane
  const filteredCards = allCards.filter((card) => {
    const today = "2026-03-06"; // Beispielhafter Check
    const tomorrow = "2026-03-07";

    if (timeFilter === "today") return card.dueDate === today;
    if (timeFilter === "tomorrow") return card.dueDate === tomorrow;
    // ... weitere Filterlogik für next_week / someday
    return true;
  });

  if (filteredCards.length === 0) {
    return (
      <Center p={10} minW="300px">
        <VStack gap={2} color="text.muted">
          <LuSearchX size="30px" />
          <Text fontSize="xs" fontWeight="bold">
            Keine Einträge
          </Text>
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
          // Wir geben die neuen Felder an die Einzelkarte weiter
          location={card.location}
          time={card.time}
        />
      ))}
    </>
  );
};
