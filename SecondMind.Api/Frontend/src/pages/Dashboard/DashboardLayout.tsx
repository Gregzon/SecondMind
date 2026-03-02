import { Outlet } from "react-router-dom"
import { Grid, GridItem } from "@chakra-ui/react"
import TopBar from "./components/TopBar"
import BottomBar from "./components/BottomBar"

const DashboardLayout = () => {
    return (
        <Grid
            templateRows="60px 1fr 60px"
            templateColumns="1fr"
            height="100vh"
            width="100%"
            bg={"gray.emphasized"}
        >
            <TopBar />
            <GridItem overflowY="auto" p={4}>
                <Outlet />
            </GridItem>
            <BottomBar />
        </Grid>
    )
}

export default DashboardLayout