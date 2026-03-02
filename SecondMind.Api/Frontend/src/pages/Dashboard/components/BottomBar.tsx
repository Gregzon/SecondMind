import { Button, GridItem } from "@chakra-ui/react"
import { useLocation, useNavigate } from "react-router-dom";

const BottomBar = () => {

    const navigate = useNavigate();
    const location = useLocation();

    return (
        < GridItem
            display="flex"
            justifyContent="space-around"
            alignItems="center"
            bg={"bg.emphasized"}
        >
            <Button bg={"bg"} color={"fg"} variant={location.pathname === "/dashboard" ? "solid" : "ghost"} onClick={() => navigate("/dashboard")}>Dashboard</Button>
            <Button bg={"bg"} color={"fg"} variant={location.pathname === "/dashboard/stats" ? "solid" : "ghost"} onClick={() => navigate("/dashboard/stats")}>Statistiken</Button>
            <Button bg={"bg"} color={"fg"} variant={location.pathname === "/dashboard/settings" ? "solid" : "ghost"} onClick={() => navigate("/dashboard/settings")}>Einstellungen</Button>
        </GridItem >
    )
}

export default BottomBar;