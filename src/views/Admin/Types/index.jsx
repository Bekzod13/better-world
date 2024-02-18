import { useEffect, useState } from "react";
import MainHeader from "../../../components/MainHeader";
import { companyApi } from "../../../data/companyApi";
import { useUserStore } from "../../../store/userStore";
import Item from "./Item";
import { Box, Button, Flex, Spacer} from "@chakra-ui/react";
import { config } from "../../../config";
import AddType from "./AddType";

const Types = () => {

    const [types, setTypes] = useState([]);
    const [addType, setAddType] = useState(false)
    const user = useUserStore(state => state.app.user);
    const getTypes = async () => {
        const response = await companyApi.getCompanyOrderTypes(user.company_id);
        if(response)
        {
            setTypes(response.data);
        }
    }

    useEffect(() => {
        getTypes();
    }, [addType]);

    return <>
        {
            addType ? <AddType addType={addType} setAddType={setAddType} />: <>
                <MainHeader title={"Gilam turlari"} />
                <Box mb={20}>
                {
                    types.length > 0 ? types.map(item => (
                        <Item key={item.id} item={item} getTypes={getTypes} />
                    )) : "Turlar yo'q"
                }
                </Box>
                <Flex right={0} borderTop={'1px solid '+ config.style.light} p={3} position={'fixed'} bg={'white'} bottom={0} width={'100%'}>
                    <Spacer/>
                    <Button onClick={() => setAddType(!addType)} bg={config.style.main} color={'white'} ml={5}>Yangi qo'shish</Button>
                </Flex>
            </>
        }
       
    </>
}

export default Types;