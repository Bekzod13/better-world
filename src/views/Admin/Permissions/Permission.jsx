import { useEffect, useState } from "react"
import MainHeader from "../../../components/MainHeader"
import { useParams } from "react-router-dom";
import { companyApi } from "../../../data/companyApi";
import { useUserStore } from "../../../store/userStore";
import { Box, Checkbox, Flex } from "@chakra-ui/react";
import { config } from "../../../config";

const Permission = () => {
    const user = useUserStore(state => state.app.user);
    const [name, setName] = useState('');
    const [role, setRole] = useState(null); 
    const [permissions, setPermissions] = useState([]);
    const [availablePermissions, setAvailablePermissions] = useState([]);

    const {id} = useParams();

    const getRole = async () => {
        const response = await companyApi.getCompanyRolesById(id);
        if(response)
        {
            setName(response.data.name);
            if(response.data.permission_ids)
            {
                setPermissions(response.data.permission_ids);
            }
        }
    }

    const getAvailablePermissions = async () => {
        const response = await companyApi.getCompanyPermissions(user.company_id);
        if(response)
        {
            setAvailablePermissions(response.data);
        }
    }

    useEffect(() => {
        getRole();
        getAvailablePermissions();
        setRole(id)
    }, [id]);

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

   const setPermission = async (id) => {
        let arr = permissions;
        const data = {};
        if(arr.includes(id))
        {
            data.role_id = role;
            let indexToRemove = arr.indexOf(id);
            if (indexToRemove !== -1) {
                arr.splice(indexToRemove, 1);
            }
            arr = arr.filter(item => item !== "");
            data.permission_ids = arr
        }else{
            data.role_id = role;
            arr = arr.filter(item => item !== "");
            arr.push(id);
            data.permission_ids = arr
        }
        const response = await companyApi.setCompanyPermission(data);
        if(response)
        {
            getRole();
        }
    }

    return <>
        <MainHeader title={name} />
        <Box>
            {
                availablePermissions.length > 0 ? (
                    availablePermissions.map(item => {
                        let checker = checkAvailable(item.id);
                        return <Flex key={item.id} onClick={(e) => {
                            e.preventDefault();
                            setPermission(item.id)
                        }} >
                            <Checkbox isChecked={checker} px={3} py={2} border={'1px solid ' + config.style.light} width={'100%'} mb={2} borderRadius={5}>{item.name}</Checkbox>
                        </Flex>
                    })
                ):"Ruxsatlar yo\'q"
            }
        </Box>
    </>
}

export default Permission;