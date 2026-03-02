import { useColorMode } from "@/components/ui/color-mode";
import { Box, GridItem, Heading, IconButton } from "@chakra-ui/react";
import { LuLogOut, LuMoon, LuSun, LuUser } from "react-icons/lu";
import { useNavigate } from "react-router-dom";


const TopBar = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    const navigate = useNavigate();

    const logout = () => {
        // TODO: Richting logout endpunkt dazubauen
        navigate("/login")
    }

    return (
        <GridItem
            px={4}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bg={"bg.emphasized"}

        >
            <Heading size="lg" color={"fg"}>SecondMind</Heading>
            <Box spaceX={'5'}>
                <IconButton bg={"bg"} color={"fg"} rounded={"full"} onClick={toggleColorMode}>
                    {colorMode === "light" ? <LuSun /> : <LuMoon />}</IconButton>
                <IconButton variant={"solid"} bg={"bg"} color={"fg"} rounded={"full"}><LuUser /></IconButton>
                <IconButton variant={"solid"} bg={"bg"} color={"fg"} rounded={"full"} onClick={logout}><LuLogOut /></IconButton>
            </Box>
        </GridItem>
    )
}

export default TopBar;