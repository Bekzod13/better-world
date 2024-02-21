import { Box, Button, Flex, Spacer } from "@chakra-ui/react";
import MainHeader from "../../../components/MainHeader";
import { useEffect, useState } from "react";
import { userApi } from "../../../data/userApi";
import Item from "./Item";
import { config } from "../../../config";
import AddUser from "./AddUser";

const Staffs = () => {

    const [staffs, setStaffs] = useState([]);
    const [addStaff, setAddStaff] = useState(false);

    const getStaffs = async () => {
        const response = await userApi.getList();
        if(response && response.data)
        {
            setStaffs(response.data);
        }
    }

    useEffect(() => {
        getStaffs();
    }, [])

    return <>
        {
            addStaff ? <AddUser setAddStaff={setAddStaff} getStaffs={getStaffs} /> : <>
             <MainHeader title={"Ishchilar"} />
        <Box>
            {
                staffs.length > 0 ? staffs.map(item => (
                    <Item key={item.id} item={item}/>
                )) : 'Ishchilar yo\'q'
            }
        </Box>
        <Flex position={'fixed'} bottom={0} right={0} left={0} bg={'white'} px={5} py={3} >
            <Spacer/>
            <Button bg={config.style.main} color={'white'}  onClick={()=> setAddStaff(true)} >
                Ishchi qo'shish
            </Button>
        </Flex>
            </>
        }
    </>
}

export default Staffs;