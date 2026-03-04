import { Container, VStack } from "@chakra-ui/react"
import { FilterBar } from "./components/FilterBar"
import { MasonryGrid } from "./components/MasonryGrid"
import { KnowledgeCards } from "./components/KnowledgeCards/KnowledgeCards"
import { useState } from "react"

export const KnowledgeCardsExlorer = () => {

    const [activeFilter, setActiveFilter] = useState<string>("all");

    return (
        <Container maxW="md">
            <VStack align="stretch" gap="2">

                {/* Die neue FilterBar */}
                <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter}/>

                {/* Das Masonry Grid für die unterschiedlichen Höhen */}
                <MasonryGrid>
                    <KnowledgeCards activeFilter={activeFilter}/>
                </MasonryGrid>

            </VStack>
        </Container>
    )
}