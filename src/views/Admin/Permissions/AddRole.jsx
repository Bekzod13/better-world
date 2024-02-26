import { Box, Button, Checkbox, Flex, FormLabel, Input, Spacer } from "@chakra-ui/react"
import MainHeader from "../../../components/MainHeader"
import { useEffect, useRef, useState } from "react";
import { companyApi } from "../../../data/companyApi";
import { useUserStore } from "../../../store/userStore";
import { config } from "../../../config";
import { ArrowBackIcon } from "@chakra-ui/icons";

const AddRole = ({setAddRole}) => {
    const user = useUserStore(state => state.app.user);
    const [availablePermissions, setAvailablePermissions] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const nameRef = useRef();

    const getAvailablePermissions = async () => {
        const response = await companyApi.getCompanyPermissions(user.company_id);
        if(response)
        {
            setAvailablePermissions(response.data);
        }
    }

    useEffect(() => {
        getAvailablePermissions();
    }, []);


    const setPermission = (id) => {
        if (permissions.indexOf(id) !== -1) {
            setPermissions(permissions.filter(item => item !== id));
        } else {
            setPermissions([...permissions, id]);
        }
    }

    const checkAvailable = (id) => {
        if(permissions.length > 0)   {
            let check = permissions.find(i => i === id);
            if (check !== undefined)
            {
                return true;
            }
            return false;
       }
    }

    const saveRole = async () => {
        const data = {
            company_id: user.company_id,
            name: nameRef.current.value,
            permission_ids: permissions,
        }
        const response = await companyApi.createRole(data);
        if(response)
        {
            setAddRole(false);
        }
    }

    return <>
        <MainHeader title={`Role qo'shish`}/>
        <Box>
            <FormLabel>Role nomi</FormLabel>
            <Input type='text' mb={5} ref={nameRef} />
            <FormLabel>Ruxsatlar</FormLabel>
            <Flex flexDirection={'column'} mb={'100px'}>
            {
                availablePermissions.length > 0 ? availablePermissions.map(item => {
                    let checker = checkAvailable(item.id);
                    return <Flex key={item.id} onClick={(e) => {
                        e.preventDefault();
                        setPermission(item.id)
                    }} >
                        <Checkbox isChecked={checker} key={item.id} px={3} py={2} border={'1px solid ' + config.style.light} width={'100%'} mb={2} borderRadius={5}>{item.name}</Checkbox>
                    </Flex>
                }):""
            }
            </Flex>
        </Box>
        <Flex right={0} borderTop={'1px solid '+ config.style.light} p={3} position={'fixed'} bg={'white'} bottom={0} width={'100%'}>
            <Button  onClick={() => {setAddRole(false)}}>
                <ArrowBackIcon/>
            </Button>
            <Spacer/>
            <Button onClick={() => {saveRole()}} bg={config.style.main} color={'white'} ml={5}>Yangi qo'shish</Button>
        </Flex>
    </>
}

export default AddRole