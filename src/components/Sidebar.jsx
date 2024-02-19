import { Button, Flex, Text } from "@chakra-ui/react";
import { MdLocalOffer, MdTypeSpecimen } from "react-icons/md";
import { FaUsers, FaUser } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { BsBarChartFill } from "react-icons/bs";
import LinkItem from "./Sidebar/LinkItem";
import { useReducer, useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import { useUserStore } from "../store/userStore";
import { config } from "../config";

const Sidebar = () => {
    const logout = useUserStore(state => state.logout);
    const [active, setActive] = useState(1);
    const [state, setState] = useReducer(
        (state, newState) => ({
            ...state,
            ...newState,
        }),
        {
            onHover: false,
        },
    );

    return <Flex p={1}  
                onMouseEnter={() => setState({onHover: true})}  
                onMouseLeave={() => setState({onHover: false})}
                flexDirection={'column'} style={{position: 'sticky', top: 0, left: 0}} 
                maxWidth={'260px'} 
                position={'sticky'}
                borderRight={'1px solid ' + config.style.light} 
                left={0} top={0}>
        {
            routes.map(item => (
                <LinkItem state={state} item={item} key={item.id} active={active} setActive={setActive} /> 
            ))
        }
        <Button mt={5} onClick={logout} >
            <Flex gap={2} alignItems={'center'}>
                <BiLogOutCircle />
                <Text fontSize={'sm'}>Chiqish</Text>
            </Flex>
        </Button>
    </Flex>
}

export default Sidebar;

const routes = [
    {
        id: 1,
        link: "/volume",
        name: "Ish hajmi",
        icon: <BsBarChartFill/>
    },
    {
        id: 2,
        link: "/orders",
        name: "Buyurtmalar",
        icon: <MdLocalOffer/>,
    },
    {
        id: 3,
        link: "/types",
        name: "Turlar",
        icon: <MdTypeSpecimen/>
    },
    {
        id: 4,
        link: "/profile",
        name: "Kabinet",
        icon: <FaUser/>
    },
    {
        id: 5,
        link: "/staffs",
        name: "Ishchilar",
        icon: <FaUsers/>
    },
    {
        id: 6,
        link: "/permissions",
        name: "Ruxsatnoma",
        icon: <RiUserSettingsFill/>
    },
    
]