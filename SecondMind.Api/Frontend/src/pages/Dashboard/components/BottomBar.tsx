import { Button, GridItem } from "@chakra-ui/react";
import { t } from "i18next";
import { useLocation, useNavigate } from "react-router-dom";

const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <GridItem
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      bg={"bg.emphasized"}
    >
      <Button
        bg={"bg"}
        color={"fg"}
        variant={location.pathname === "/dashboard" ? "solid" : "ghost"}
        onClick={() => navigate("/dashboard")}
      >
        {t("BottomBar_Buttons_Label_Dashboard")}
      </Button>
      <Button
        bg={"bg"}
        color={"fg"}
        variant={location.pathname === "/dashboard/stats" ? "solid" : "ghost"}
        onClick={() => navigate("/dashboard/stats")}
      >
        {t("BottomBar_Buttons_Label_Statistics")}
      </Button>
      <Button
        bg={"bg"}
        color={"fg"}
        variant={
          location.pathname === "/dashboard/settings" ? "solid" : "ghost"
        }
        onClick={() => navigate("/dashboard/settings")}
      >
        {t("BottomBar_Buttons_Label_Settings")}
      </Button>
    </GridItem>
  );
};

export default BottomBar;
