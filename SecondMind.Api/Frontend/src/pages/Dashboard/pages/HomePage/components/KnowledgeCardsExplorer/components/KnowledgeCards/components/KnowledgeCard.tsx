import { Card, Heading, Icon, Text, Box, List } from "@chakra-ui/react";
import {
  LuLightbulb,
  LuMapPin,
  LuList,
  LuCheck,
  LuCircle,
} from "react-icons/lu";

interface KnowledgeCardProps {
  cardTitle: string;
  cardBody: string | string[];
  cardType: "task" | "idea" | "location" | "list";
}

const cardConfig = {
  task: { icon: LuCheck, label: "Task", color: "blue.400" },
  idea: { icon: LuLightbulb, label: "Idee", color: "yellow.400" },
  location: { icon: LuMapPin, label: "Ort", color: "red.400" },
  list: { icon: LuList, label: "Liste", color: "green.400" },
};

export const KnowledgeCard = ({
  cardTitle,
  cardBody,
  cardType,
}: KnowledgeCardProps) => {
  const config = cardConfig[cardType];

  return (
    <Box
      mb="4"
      css={{ breakInside: "avoid", display: "inline-block", width: "100%" }}
    >
      <Card.Root
        size="sm"
        variant="outline"
        bg="bg.panel" // Nutzt dein Token (dark: gray.900 / light: white)
        borderColor="border.subtle" // Nutzt dein Token
        borderRadius="l_card" // Nutzt dein Token (16px)
        transition="all 0.2s"
        _hover={{ borderColor: "brand.solid", transform: "translateY(-2px)" }}
      >
        <Card.Header pb="2">
          <Box display="flex" alignItems="center" gap="2" mb="2">
            <Icon as={config.icon} color={config.color} />
            <Text
              fontSize="xs"
              color="text.muted"
              fontWeight="bold"
              textTransform="uppercase"
            >
              {config.label}
            </Text>
          </Box>
          <Heading size="md" color="text.main">
            {cardTitle}
          </Heading>
        </Card.Header>

        <Card.Body>
          {cardType === "list" && Array.isArray(cardBody) ? (
            <List.Root gap="2" variant="plain">
              {cardBody.map((item, index) => (
                <List.Item
                  key={index}
                  display="flex"
                  alignItems="center"
                  gap="2"
                  color="text.muted"
                  fontSize="sm"
                >
                  <List.Indicator
                    as={LuCircle}
                    boxSize="1.5"
                    color="whiteAlpha.400"
                  />
                  {item}
                </List.Item>
              ))}
            </List.Root>
          ) : (
            <Text color="text.muted" fontSize="sm" lineHeight="tall">
              {cardBody}
            </Text>
          )}
        </Card.Body>

        {cardType === "task" && (
          <Card.Footer pt="2">
            <Text fontSize="xs" color="brand.solid">
              Fällig: Heute
            </Text>
          </Card.Footer>
        )}
      </Card.Root>
    </Box>
  );
};
