import MainHeader from "../../../components/MainHeader";
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Flex,
    Spacer,
    Alert,
    AlertIcon,
    AlertTitle,
    Checkbox,
    Select
  } from '@chakra-ui/react'
import { config } from "../../../config";
import { useUserStore } from "../../../store/userStore";
import { useEffect, useRef, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { companyApi } from "../../../data/companyApi";
import { userApi } from "../../../data/userApi";

const AddUser = ({setAddStaff, getStaffs}) => {

    const user = useUserStore(state => state.app.user);
    const phoneRef = useRef();
    const nameRef = useRef();
    const surnameRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [role, setRole] = useState('');
    const [passwordShow, setPasswordShow] = useState(false);
    const [error, setError] = useState('');
    const [roles, setRoles] = useState([]);
    
    const getRoles = async () => {
        const response = await companyApi.getCompanyRoles(user.company_id);
        if(response)
        {
            setRoles(response.data);
        }
    }
    useEffect(() => {
        getRoles();
    }, [])

    const addStaff = async () => {

        if(passwordConfirmRef.current.value !== passwordRef.current.value)
        {
            setError('Parol tasdiqlanmadi')
        }else{
            const data = {
                phone: phoneRef.current.value,
                lastname: surnameRef.current.value,
                firstname: nameRef.current.value,
                password: passwordRef.current.value,
                confirmation_password: passwordRef.current.value,
                role_id: role
            }

            if(data.phone && data.lastname && data.password && data.role_id)
            {
                const response = await userApi.addStaff(data);
                if(response)
                {
                    getStaffs();
                    setAddStaff(false);
                }
            }else{
                setError('Bazi qismlar bo\'sh bo\'lmasligi kerak')
            }
        }

        setTimeout(() => {
          setError('');
        }, 3000);
    }

    const [phoneNumber, setPhoneNumber] = useState('+998');

    const handleChange = (e) => {
      const input = e.target.value;
      const cleaned = ('' + input).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{1,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);
      if (match) {
        setPhoneNumber(`+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`.trim());
      }
    };
    return <>
        <MainHeader title={'Yangi ishchi qo\'shish'} />
        {
            error !== '' &&
            <Alert status='error' mb={'5'} width={'100%'}>
              <AlertIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
        }
        <FormControl p={3}>
        <Flex mb={5} alignItems={'center'}>
            <FormLabel>Role</FormLabel>
            <Spacer/>
            <Select width={'max-content'} onChange={e => setRole(e.target.value)}>
                <option value=''>---</option>
                {
                    roles.length > 0 ? roles.map(item => (
                        <option value={item.id}>{item.name}</option>
                    )) : <option value="">tanlov yo'q</option>
                }
                
            </Select>
        </Flex>
        <FormLabel>Telefon raqami</FormLabel>
        <Input  type='text'  mb={5} ref={phoneRef}  
            value={phoneNumber}
            onChange={handleChange}  
            />
        <FormLabel>Ism</FormLabel>
        <Input type='text'  mb={5} ref={nameRef} />
        <FormLabel>Familiya</FormLabel>
        <Input type='text' mb={5} ref={surnameRef} />
        <FormLabel>Parol</FormLabel>
        <Input type={passwordShow ? 'text':'password'} mb={5} ref={passwordRef} />
        <FormLabel>Parolni tasdiqlash</FormLabel>
        <Input type={passwordShow ? 'text':'password'} mb={5} ref={passwordConfirmRef} />
        <Checkbox mb={5} onChange={() => setPasswordShow(!passwordShow)}>Ko'rsatish</Checkbox>
        <Flex justifyContent={'end'} position={'fixed'} bottom={0} right={0} left={0} bg={'white'} px={5} py={3} >
            <Button onClick={()=> setAddStaff(false)}>
                <ArrowBackIcon/>
            </Button>
            <Spacer/>
            <Button type="submit" onClick={addStaff} bg={config.style.main} color={'white'} width={'200px'} fontSize={'sm'} >Saqlash</Button>
        </Flex>
    </FormControl>
    </>
}

export default AddUser;