import { KnowledgeCard } from "./components/KnowledgeCard";

interface KnowledgeCardsProps {
    activeFilter: string;
}

export const KnowledgeCards = ({activeFilter}: KnowledgeCardsProps) => {

    const allCards = [
        { id: 1, cardTitle: "Test Idea", cardBody: "Moiners Idears", cardType: "idea" },
        { id: 2, cardTitle: "Test List", cardBody: ["Eintrag 1", "Eintrag 2"], cardType: "list" },
        { id: 3, cardTitle: "Test Location", cardBody: "Moiners Locationers", cardType: "location" },
        { id: 4, cardTitle: "Test Task", cardBody: "Moiners Taskers", cardType: "task" },
    ];

    const filteredCards = allCards.filter((card) => {
        if(activeFilter === "all") return true;

        return card.cardType === activeFilter;
    })


    return (
        <>
            {filteredCards.map((card) => (
                <KnowledgeCard 
                    key={card.id} 
                    cardTitle={card.cardTitle} 
                    cardBody={card.cardBody} 
                    cardType={card.cardType as any} 
                />
            ))}
        </>
    );
};