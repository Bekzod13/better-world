import { Button, Flex, Spacer } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { config } from "../config";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { LayoutContext } from "../context/LayoutContext";
import { useContext } from "react";


const Navbar = () => {
    const {sidebar, setSidebar} = useContext(LayoutContext);
    return <Flex height={'60px'} alignItems={'center'} px={5} borderBottom={'1px solid ' + config.style.light} >
        <Link to={'/'} style={{fontWeight:600, color: config.style.black}}>Yangi dunyo</Link>
        <Spacer/>
        <Flex color={config.style.gray}>
            <Link style={{display:'flex', alignItems: 'center', gap: 5}} to={'/profile'}>
                <span style={{fontWeight: 600}}></span><FaUser/>
            </Link>
            <Button p={2} ml={5} bg={config.style.main} color={'white'}
                onClick={() => setSidebar(!sidebar)}
            >
                {
                    sidebar ? <CloseIcon/>:<HamburgerIcon/>
                }
            </Button>
        </Flex>
    </Flex>
}

export default Navbar;