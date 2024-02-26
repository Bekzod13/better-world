import { Box, Button, Flex, Spacer, Text } from "@chakra-ui/react"
import MainHeader from "../../../components/MainHeader"
import { useEffect, useState } from "react"
import { companyApi } from "../../../data/companyApi";
import { useUserStore } from "../../../store/userStore";
import { config } from "../../../config";
import { Link } from "react-router-dom";
import AddRole from "./AddRole";

const Permissions = () => {

    const user = useUserStore(state => state.app.user);
    const [roles, setRoles] = useState([]);
    const [role, setAddRole] = useState(false);
    
    const getRoles = async () => {
        const response = await companyApi.getCompanyRoles(user.company_id)
        if(response && response.data)
        {
            setRoles(response.data);
        }
    }

    useEffect(() => {
        getRoles();
    }, [])

    return <>
        {
            role ? <AddRole setAddRole={setAddRole} /> : <>
                <MainHeader title={'Role'} />
                <Box>
                    {
                        roles.length > 0 ? roles.map(item => (
                            <Link key={item.id} to={'/permissions/' + item.id} >
                                <Text width={'100%'} border={'1px solid '+ config.style.light} mb={5} p={3} borderRadius={5} letterSpacing={'1px'}>
                                    {item.name}
                                </Text>
                            </Link>
                        )) : "Role yo'q"
                    }
                </Box>
                <Flex right={0} borderTop={'1px solid '+ config.style.light} p={3} position={'fixed'} bg={'white'} bottom={0} width={'100%'}>
                    <Spacer/>
                    <Button onClick={() => setAddRole(true)} bg={config.style.main} color={'white'} ml={5}>Yangi qo'shish</Button>
                </Flex>
            </>
        }
        
    </>
}

export default Permissions;