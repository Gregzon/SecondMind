import { Avatar, Box, Flex, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { LuBrainCircuit } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  // const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate();

  const logout = () => {
    // Kommt als onlick am Ende was den layer öffnet
    // TODO: Richting logout endpunkt dazubauen
    navigate("/login");
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      w="full"
      h="full"
      px="4" // Etwas Padding innerhalb der 60px Höhe
      bg="bg.panel/80" // 80% Deckkraft für den Glass-Effekt
      backdropFilter="blur(10px)" // Der "Frosted Glass" Effekt
    >
      {/* Linke Seite: Logo und App-Name */}
      <HStack
        gap="3"
        cursor="pointer"
        onClick={() => navigate("/dashboard")}
        _hover={{ opacity: 0.8 }}
        transition="opacity 0.2s"
      >
        <Box
          p="1.5"
          borderRadius="l_button" // Nutzt dein Token
          bg="brand.solid/10" // Nutzt dein Cyan-Token mit 10% Deckkraft
        >
          <Icon as={LuBrainCircuit} w="6" h="6" color="brand.solid" />
        </Box>
        <Stack gap="0" lineHeight="1.1">
          <Text
            fontWeight="bold"
            fontSize="sm"
            color="text.main"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Second
          </Text>
          <Text
            fontWeight="black"
            fontSize="sm"
            color="brand.solid"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Mind
          </Text>
        </Stack>
      </HStack>

      {/* Rechte Seite: User Avatar */}
      <HStack gap="4">
        {/* Hier könnte später noch ein DarkMode-Toggle hin */}

        <Avatar.Root
          as="button"
          size="sm"
          borderWidth="2px"
          borderColor="border.subtle"
          _hover={{ borderColor: "brand.solid" }}
          transition="all 0.2s"
          onClick={() => console.log("Profile Clicked")}
        >
          <Avatar.Fallback name="Gregor Sch" />
          <Avatar.Image src="https://bit.ly/sage-adebayo" />
        </Avatar.Root>
      </HStack>
    </Flex>
  );
};

export default TopBar;
