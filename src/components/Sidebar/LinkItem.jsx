import { Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom"
import { config } from "../../config";
import { useParams, useLocation } from "react-router-dom";
import { useContext } from "react";
import { LayoutContext } from "../../context/LayoutContext";

const LinkItem = ({item, setActive}) => {
    const local = useLocation();
    const {sidebar, setSidebar} = useContext(LayoutContext);

    return <Link to={item.link} style={{marginBottom: 10}} onClick={() => setSidebar(!sidebar)}>
        {
            local.pathname == item.link ?  <Flex gap={3} p={2} borderRadius={10} bg={config.style.light}>
                <Text color={'white'} bg={config.style.main} width={6} height={6} display={'flex'} style={{justifyContent:'center', alignItems: "center"}} borderRadius={5} fontSize={'md'}>{item.icon}</Text>
                    <Text fontWeight={600} fontSize={'sm'}>{item.name}</Text>
            </Flex>: 
            <Flex gap={3} p={2} borderRadius={10} onClick={() => setActive(item.id)} >
                <Text color={config.style.main} width={6} height={6} display={'flex'} style={{justifyContent:'center', alignItems: "center"}} borderRadius={5} fontSize={'md'}>{item.icon}</Text>
                    <Text fontWeight={600} fontSize={'sm'}>{item.name}</Text>
            </Flex>
        }
       
    </Link>
}

export default LinkItem;