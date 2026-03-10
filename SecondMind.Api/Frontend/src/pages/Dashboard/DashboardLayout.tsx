import { Outlet } from "react-router-dom";
import { Box, Flex, Container } from "@chakra-ui/react";
import TopBar from "./components/TopBar";
import BottomBar from "./components/BottomBar";

const DashboardLayout = () => {
  return (
    <Flex
      direction="column"
      minH="100vh"
      bg="bg.app" // Der äußere Hintergrund (meist etwas dunkler/grauer)
      align="center"
    >
      {/* Der Container begrenzt die Breite auf Desktop 
        und sorgt dafür, dass alles in einer "Säule" bleibt.
      */}
      <Container
        maxW="dashboard_width" // Dein Token aus der theme.ts (800px)
        w="full"
        h="100vh"
        p={0}
        display="flex"
        flexDirection="column"
        bg="bg.app" // Die eigentliche App-Fläche (Weiß oder Dunkelgrau)
        boxShadow="md" // Optional: Ein leichter Schatten für den "App-im-Browser" Look
        position="relative"
      >
        {/* TopBar fix oben */}
        <Box
          h="60px"
          w="full"
          borderBottomWidth="1px"
          borderColor="border.subtle"
        >
          <TopBar />
        </Box>

        {/* Scrollbarer Content-Bereich */}
        <Box
          flex="1"
          overflowY="auto"
          px={2} // Nutzt dein responsives Padding
          pb="80px" // Puffer für die BottomBar, damit nichts verdeckt wird
        >
          <Outlet />
        </Box>

        {/* BottomBar fix unten */}
        <Box
          h="60px"
          w="full"
          position="absolute"
          bottom={0}
          left={0}
          bg="bg.panel"
          borderTopWidth="1px"
          borderColor="border.subtle"
        >
          <BottomBar />
        </Box>
      </Container>
    </Flex>
  );
};

export default DashboardLayout;
