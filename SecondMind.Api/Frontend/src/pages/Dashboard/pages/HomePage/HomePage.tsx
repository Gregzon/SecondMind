import { VStack, Heading, Text, Box } from "@chakra-ui/react";
import InputSection from "./components/InputSection";
import { useTranslation } from "react-i18next";
import { KnowledgeCardsExlorer } from "./components/KnowledgeCardsExplorer/KnowledgeCardsExplorer";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <VStack align={"stretch"} gap={8} w={"full"}>
      {/* Kleiner Header-Bereich für den Kontext */}
      <Box>
        <Heading size="md" color="text.main" fontWeight="bold">
          {t("HomePage_Greeting", "Hallo Gregor")} 👋
        </Heading>
        <Text color="text.muted" fontSize="xs">
          {t("HomePage_SubGreeting", "Was hast du heute gelernt?")}
        </Text>
      </Box>

      <InputSection />

      <KnowledgeCardsExlorer />
    </VStack>
  );
};

export default HomePage;
