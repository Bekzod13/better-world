import { Box, Button, Flex, FormControl, FormLabel, Input, Spacer } from "@chakra-ui/react";
import MainHeader from "../../../components/MainHeader";
import { useRef } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { config } from "../../../config";
import { companyApi } from "../../../data/companyApi";
import { useUserStore } from "../../../store/userStore";

const AddType = ({setAddType, addType}) => {

    const nameRef = useRef();
    const priceRef = useRef();
    const user = useUserStore(state => state.app.user);

    const createType = async () => {
        const data = {
            name: nameRef.current.value,
            price: Number(priceRef.current.value),
            company_id: user.company_id
        }
        const response = await companyApi.addCompanyOrderType(data);
        if(response)
        {
            setAddType(false);
        }
    }

    return <Box>
        <MainHeader title={'Yangi tur qo\'shish'} />
            <FormControl>
                <FormLabel>Nomi</FormLabel>
                <Input type='text' placeholder="Nom kiriting" mb={5} ref={nameRef} />
                <FormLabel>Narxi</FormLabel>
                <Input type='number' placeholder="1000" mb={5} ref={priceRef} />
     
                <Flex justifyContent={'end'}>
                    <Button onClick={() => setAddType(!addType)}><ArrowBackIcon/></Button>
                    <Spacer/>
                    <Button type="submit" onClick={createType} bg={config.style.main} color={'white'} width={'200px'} fontSize={'sm'} >Saqlash</Button>
                </Flex>
            </FormControl>
    </Box>
}

export default AddType;