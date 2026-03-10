import { Button, Flex, VStack, Text, Icon, Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { LuChartArea, LuLayoutDashboard, LuSettings } from "react-icons/lu";

const BottomBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Kleine Helper-Funktion für das aktive Styling
  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    {
      label: t("BottomBar_Buttons_Label_Dashboard"),
      path: "/dashboard",
      icon: LuLayoutDashboard,
    },
    {
      label: t("BottomBar_Buttons_Label_Statistics"),
      path: "/dashboard/stats",
      icon: LuChartArea,
    },
    {
      label: t("BottomBar_Buttons_Label_Settings"),
      path: "/dashboard/settings",
      icon: LuSettings,
    },
  ];

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-around"
      h="full"
      w="full"
      bg="bg.panel/80" // Konsistent zur TopBar
      backdropFilter="blur(10px)"
      px={2}
    >
      {navItems.map((item) => (
        <Button
          key={item.path}
          bg="transparent"
          variant="ghost"
          h="full"
          flex="1"
          onClick={() => navigate(item.path)}
          _hover={{ bg: "whiteAlpha.50" }}
          position="relative"
        >
          <VStack gap={1}>
            <Icon
              as={item.icon}
              fontSize="xl"
              color={isActive(item.path) ? "brand.solid" : "text.muted"}
              transition="color 0.2s"
            />
            <Text
              fontSize="xs"
              fontWeight={isActive(item.path) ? "bold" : "medium"}
              color={isActive(item.path) ? "text.main" : "text.muted"}
            >
              {item.label}
            </Text>

            {/* Indikator-Strich für den aktiven Tab */}
            {isActive(item.path) && (
              <Box
                position="absolute"
                top="0"
                w="40%"
                h="3px"
                bg="brand.solid"
                borderRadius="full"
                shadow="0 0 10px cyan" // Kleiner Glow-Effekt
              />
            )}
          </VStack>
        </Button>
      ))}
    </Flex>
  );
};

export default BottomBar;
