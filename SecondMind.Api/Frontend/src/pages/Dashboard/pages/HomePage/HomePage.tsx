import { VStack } from "@chakra-ui/react"
import InputSection from "./components/InputSection"
import { KnowledgeCardsExlorer } from "./components/KnowledgeCardsExplorer/KnowledgeCardsExplorer"

const HomePage = () => {
    return (
        <VStack align={"stretch"} gap={6} w={"full"}>
            <InputSection />
            <KnowledgeCardsExlorer />
        </VStack>
    )
}

export default HomePage