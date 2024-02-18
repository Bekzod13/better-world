import { Alert, AlertIcon, AlertTitle, Avatar, Box, Button, Card, CardBody, CardHeader, Checkbox, Flex, FormControl, FormLabel, Heading, IconButton, Image, Input, Spacer, Text } from "@chakra-ui/react";
import MainHeader from "../../../components/MainHeader";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useUserStore } from "../../../store/userStore";
import { config } from "../../../config";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRef, useState } from "react";
import { userApi } from "../../../data/userApi";

const Profile = () => {

    const user = useUserStore(state => state.app.user);
    const oldPasswordRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [passwordShow, setPasswordShow] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const changePassword = async () => {
        if(passwordConfirmRef.current.value === '' && oldPasswordRef.current.value === '' && passwordRef.current.value === '')
        {
            setError('To\'liq kiritilmadi')
        } else if(passwordConfirmRef.current.value !== passwordRef.current.value || oldPasswordRef.current.value === passwordRef.current.value)
        {
            setError('Parol tasdiqlanmadi')
        }else{
            const data = {
                old_password: oldPasswordRef.current.value,
                new_password: passwordRef.current.value,
                new_password_confirmation: passwordRef.current.value
            };
    
            const response = await userApi.changePassword(data);
            if(response)
            {
                setSuccess('Parol yangilandi')
            }
        }
  
        setTimeout(() => {
            setError('');
            setSuccess('');
          }, 3000);
    }


    return <>
        <MainHeader title={'Profile'} />
        {
            error !== '' &&
            <Alert status='error' mb={'5'} width={'100%'}>
              <AlertIcon />
              <AlertTitle>{error}</AlertTitle>
            </Alert>
        }
        {
            success !== '' &&
            <Alert status='success' mb={'5'} width={'100%'}>
              <AlertIcon />
              <AlertTitle>{success}</AlertTitle>
            </Alert>
        }
        <Card maxW='md'>
            <CardHeader>
                <Flex spacing='4'>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Avatar name={user.firstname + " " + user.lastname} src='https://bit.ly/broken-link' />
                        <Box>
                        <Heading size='sm'>{user.firstname} {user.lastname}</Heading>
                        <Text bg={config.style.main} color={'white'} borderRadius={5} textAlign={'center'} mt={2}>{user.role}</Text>
                        </Box>
                    </Flex>
                </Flex>
            </CardHeader>
            <CardBody>
              <Flex>
                <Text>Telefon raqami:</Text>
                <Spacer/>
                <a href={'tel:' + user.phone}>
                    <Text color={'blue'} textDecoration={'underline'}>{user.phone}</Text>
                </a>
              </Flex>
            </CardBody>
        </Card>
        <Card maxW='md' mt={5}>
            <CardHeader fontWeight={'600'}>Parolni almashtirish</CardHeader>
            <CardBody>
                <FormControl>
                    <FormLabel>Eski parol</FormLabel>
                    <Input type={passwordShow ? 'text':'password'} mb={5} ref={oldPasswordRef} />
                    <FormLabel>Parol</FormLabel>
                    <Input type={passwordShow ? 'text':'password'} mb={5} ref={passwordRef} />
                    <FormLabel>Parolni tasdiqlash</FormLabel>
                    <Input type={passwordShow ? 'text':'password'} mb={5} ref={passwordConfirmRef} />
                    <Checkbox mb={5} onChange={() => setPasswordShow(!passwordShow)}>Ko'rsatish</Checkbox>
                    <Flex>
                        <Spacer/>
                        <Button type="submit" onClick={changePassword} bg={config.style.main} color={'white'} width={'200px'} fontSize={'sm'} >Saqlash</Button>
                    </Flex>
                </FormControl>
            </CardBody>
        </Card>
    </>
}

export default Profile;