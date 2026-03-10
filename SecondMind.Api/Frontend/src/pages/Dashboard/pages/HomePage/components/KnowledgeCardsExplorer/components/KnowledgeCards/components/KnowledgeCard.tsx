import {
  Badge,
  Box,
  Card,
  Heading,
  HStack,
  Icon,
  List,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuRoot,
  MenuTrigger,
  Portal,
  MenuSeparator,
  Text,
} from "@chakra-ui/react";
import {
  LuCalendar,
  LuClock,
  LuMapPin,
  LuMenu,
  LuGoal,
  LuPencil,
  LuArrowRightLeft,
  LuTrash2,
  LuCircle,
} from "react-icons/lu";

interface KnowledgeCardProps {
  cardTitle: string;
  cardBody: string | string[];
  location: string | undefined;
  time: string | undefined;
}

export const KnowledgeCard = ({
  cardTitle,
  cardBody,
  location,
  time,
}: KnowledgeCardProps) => {
  return (
    <Box
      css={{
        breakInside: "avoid",
        display: "inline-block",
        minW: "300px",
        maxW: "350px",
      }}
    >
      <Card.Root
        size="sm"
        variant="outline"
        bg="bg.panel"
        borderColor="border.subtle"
        borderRadius="l_card"
        transition="all 0.2s"
        _hover={{ borderColor: "brand.solid", transform: "translateY(-4px)" }}
      >
        <Card.Header pb="2">
          <HStack justify="space-between" mb="2" align={"center"}>
            <HStack gap="2">
              <Icon as={LuCalendar} color="brand.solid" w="4" h="4" />
              <Text
                fontSize="xs"
                color="text.muted"
                fontWeight="bold"
                textTransform="uppercase"
                letterSpacing="wider"
              >
                {time ? "Termin" : "Notiz"}
              </Text>
            </HStack>

            <CardContextMenu />
          </HStack>

          <Heading size="md" color="text.main" mb="1">
            {cardTitle}
          </Heading>

          <CardStatusBadges time={time} location={location} />
        </Card.Header>

        <Card.Body>
          <CardContent body={cardBody} />
        </Card.Body>

        <Card.Footer
          pt="2"
          borderTopWidth="1px"
          borderColor="border.subtle"
          mt="2"
        >
          <HStack justify="space-between" w="full">
            <Text fontSize="10px" color="text.muted">
              Erstellt: Heute
            </Text>
          </HStack>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
};

// Hilfskomponente für die Status-Badges
const CardStatusBadges = ({
  time,
  location,
}: {
  time?: string;
  location?: string;
}) => {
  if (!time && !location) return null;
  return (
    <HStack gap="2" mt="2" wrap="wrap">
      {time && (
        <Badge variant="subtle" colorPalette="cyan" borderRadius="full" px="2">
          <Icon as={LuClock} mr="1" /> {time}
        </Badge>
      )}
      {location && (
        <Badge variant="subtle" colorPalette="red" borderRadius="full" px="2">
          <Icon as={LuMapPin} mr="1" /> {location}
        </Badge>
      )}
    </HStack>
  );
};

// Hilfskomponente für das Kontext-Menü
const CardContextMenu = () => (
  <MenuRoot>
    <MenuTrigger asChild>
      <Box
        p="1"
        borderRadius="md"
        _hover={{ bg: "whiteAlpha.200" }}
        cursor="pointer"
        transition="background 0.2s"
      >
        <Icon
          as={LuMenu}
          color="text.muted"
          _hover={{ color: "brand.solid" }}
        />
      </Box>
    </MenuTrigger>
    <Portal>
      <MenuPositioner>
        <MenuContent
          zIndex="popover"
          minW="180px"
          bg="bg.panel"
          boxShadow="xl"
          borderRadius="md"
          borderColor="border.subtle"
        >
          <MenuItem
            value="done"
            gap="2"
            color="green.400"
            _hover={{ bg: "green.500", color: "white" }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Task erledigt!");
            }}
          >
            <LuGoal size="14" /> Erledigt
          </MenuItem>
          <MenuSeparator />
          <MenuItem value="edit" gap="2" onClick={(e) => e.stopPropagation()}>
            <LuPencil size="14" /> Bearbeiten
          </MenuItem>
          <MenuItem value="move" gap="2" onClick={(e) => e.stopPropagation()}>
            <LuArrowRightLeft size="14" /> Verschieben
          </MenuItem>
          <MenuSeparator />
          <MenuItem
            value="delete"
            color="red.400"
            gap="2"
            _hover={{ bg: "red.500", color: "white" }}
            onClick={(e) => {
              e.stopPropagation();
              console.log("Löschen!");
            }}
          >
            <LuTrash2 size="14" /> Löschen
          </MenuItem>
        </MenuContent>
      </MenuPositioner>
    </Portal>
  </MenuRoot>
);

// Hilfskomponente für den Text/Listen-Inhalt
const CardContent = ({ body }: { body: string | string[] }) => {
  if (Array.isArray(body)) {
    return (
      <List.Root gap="2" variant="plain">
        {body.map((item, index) => (
          <List.Item
            key={index}
            display="flex"
            alignItems="center"
            gap="2"
            color="text.muted"
            fontSize="sm"
          >
            <List.Indicator as={LuCircle} boxSize="1.5" color="brand.solid" />
            <Text color="text.main">{item}</Text>
          </List.Item>
        ))}
      </List.Root>
    );
  }
  return (
    <Text color="text.muted" fontSize="sm" lineHeight="tall">
      {body}
    </Text>
  );
};
