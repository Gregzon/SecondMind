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
    <Flex as="nav" align="center" justify="space-between" w="full" py={4}>
      {/* Linke Seite: Logo und App-Name */}
      <HStack>
        <Box
          p={1.5}
          borderRadius="lg"
          bg="rgba(0, 255, 255, 0.1)" // Dezenter Glow-Hintergrund für das Logo
        >
          <Icon as={LuBrainCircuit} w={8} h={8} color="cyan.300" />
        </Box>
        <Stack align="start" gap={-2}>
          <Text fontWeight={"bold"} colorPalette={"white"}>
            Second
          </Text>
          <Text fontWeight={"bold"} colorPalette={"white"}>
            Mind
          </Text>
        </Stack>
      </HStack>

      {/* Rechte Seite: User Avatar */}
      <Avatar.Root
        as={"button"}
        colorPalette={"cyan"}
        onClick={() => console.log("Test Avatar Click!")}
      >
        <Avatar.Fallback name="Gregor Sch" />
        <Avatar.Image src="https://bit.ly/sage-adebayo" />
      </Avatar.Root>
    </Flex>
  );
};

export default TopBar;
