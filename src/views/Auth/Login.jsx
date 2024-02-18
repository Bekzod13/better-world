import { Flex, FormControl, Text, Box, FormLabel, Input, Button, Alert, AlertIcon, AlertTitle, Checkbox } from "@chakra-ui/react"
import { config } from "../../config";
import { useState } from "react";
import { useUserStore } from "../../store/userStore";
 const Login = () => {

    const login = useUserStore(state => state.login);
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('+998');

    const handleChange = (e) => {
      const input = e.target.value;
      const cleaned = ('' + input).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{1,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);

      if(match !== null)
      {
        setPhone('+' + match[0]);
      }

      if (match) {
        setPhoneNumber(`+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`.trim());
      }
    };

  const signin = async () => {

    const data = {
      phone: phone,
      password: password
    }

    const response = await login(data);
    if(response === undefined)
    {
      setError('Parol yoki Raqam noto\'g\'ri');
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }

    return <Flex justifyContent={'center'} align={'center'} bg={'white'} height={'100vh'}>
        <Box maxWidth={'500'} width={'100%'} py={3} px={6}>
            <Text fontSize={'4xl'} fontWeight={'600'} color={config.style.main} mb={10}>Xush kelibsiz</Text>
            {
              error !== '' &&
              <Alert status='error' mb={'5'} width={'100%'}>
                <AlertIcon />
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            }
            <FormControl onSubmit={signin}>
                <FormLabel color={config.style.black} fontSize={'sm'}>Telefon raqami</FormLabel>
                <Input 
                     value={phoneNumber}
                     onChange={handleChange}  
                     type='text' border={'1px solid #f1f1f1'} placeholder="Nomer kiriting..." mb={5}/>
                <FormLabel color={config.style.black} fontSize={'sm'}>Parol</FormLabel>
                <Input onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} border={'1px solid #f1f1f1'} placeholder="Parol kiriting..." mb={5} />
                <Checkbox mb={5} onChange={() => setShowPassword(!showPassword)}>Ko'rsatish</Checkbox>
                <Button onClick={signin} type="submit" bg={config.style.main} width={'100%'} color={'white'}>Kirish</Button>
            </FormControl>
        </Box>
    </Flex>
}

export default Login;