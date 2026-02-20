import { useColorMode } from '@/components/ui/color-mode';
import { Box, Grid, GridItem, Button, Heading, IconButton } from '@chakra-ui/react';
import { LuLogOut, LuMoon, LuSun, LuUser } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';

const DashboardPage = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode()

    const logout = () => {
        // TODO: Richting logout endpunkt dazubauen
        navigate("/login")
    }

    return (
        <Grid
            templateRows="60px 1fr 60px"
            templateColumns="1fr"
            height="100vh"
            width="100%"
            bg={"gray.emphasized"}
        >
            {/* Topbar */}
            <GridItem
                px={4}
                display="flex"
                alignItems="center"
                justifyContent="space-between"

            >
                <Heading size="lg" color={"fg"}>SecondMind</Heading>
                <Box spaceX={'5'}>
                    <IconButton bg={"bg"} color={"fg"} rounded={"full"} onClick={toggleColorMode}>
                        {colorMode === "light" ? <LuSun /> : <LuMoon />}</IconButton>
                    <IconButton variant={"solid"} bg={"bg"} color={"fg"} rounded={"full"}><LuUser /></IconButton>
                    <IconButton variant={"solid"} bg={"bg"} color={"fg"} rounded={"full"} onClick={logout}><LuLogOut /></IconButton>
                </Box>
            </GridItem>

            {/* Main Content */}
            <GridItem overflowY="auto" p={4}>
                {children}
            </GridItem>

            {/* BottomBar */}
            <GridItem
                display="flex"
                justifyContent="space-around"
                alignItems="center"
            >
                <Button bg={"bg"} color={"fg"} variant="ghost">Dashboard</Button>
                <Button bg={"bg"} color={"fg"} variant="ghost">KI-Modus</Button>
                <Button bg={"bg"} color={"fg"} variant="ghost">Settings</Button>
            </GridItem>
        </Grid>
    );
};

export default DashboardPage;
