import { Route, Routes } from "react-router-dom"
import { Box, Flex } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Volume from "./views/Admin/Volume";
import Orders from "./views/Admin/Orders"
import Show from "./views/Admin/Orders/Show";
import Types from "./views/Admin/Types";
import { LayoutContext } from "./context/LayoutContext";
import { useContext } from "react";
import Staffs from "./views/Admin/Staffs";
import Profile from "./views/Admin/Profile";
import Permissions from "./views/Admin/Permissions";
import Permission from "./views/Admin/Permissions/Permission";

const AdminRoutes = () => {
    const {sidebar} = useContext(LayoutContext);
    return <Box>    
        <Navbar/>
        <Flex>
            {
                sidebar &&  <Sidebar/>
            }
            <Box flex={1} p={3} overflowY={'scroll'} height={'calc(100vh - 60px)'}>
                <Routes>
                    <Route path="/" element={<Volume/>} />
                    <Route path="/volume" element={<Volume/>} />
                    <Route path="/orders" element={<Orders/>} />
                    <Route path="/orders/:id" element={<Show/>} />
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/types" element={<Types/>} />
                    <Route path="/staffs" element={<Staffs/>} />
                    <Route path="/permissions" element={<Permissions/>} />
                    <Route path="/permissions/:id" element={<Permission/>} />
                </Routes>
            </Box>
        </Flex>
    </Box>
}

export default AdminRoutes;