import MainHeader from "../../../components/MainHeader";
import {
    FormControl,
    FormLabel,
    Box,
    Input,
    Textarea,
    Button,
    Flex,
    Spacer,
    Alert,
    AlertIcon,
    AlertTitle
  } from '@chakra-ui/react'
import { config } from "../../../config";
import { useUserStore } from "../../../store/userStore";
import { useRef, useState } from "react";
import { orderApi } from "../../../data/orderApi";
import { ArrowBackIcon } from "@chakra-ui/icons";


const AddOrder = ({setState}) => {

    const user = useUserStore(state => state.app.user);

    const phoneRef = useRef();
    const slugRef = useRef();
    const addressRef = useRef();
    const countRef = useRef();
    const descriptionRef = useRef();
    const [error, setError] = useState(false);

    const addOrder = async () => {
        const data = {
            company_id: user.company_id,
            phone: phoneRef.current.value,
            slug: slugRef.current.value,
            address: addressRef.current.value,
            count: Number(countRef.current.value),
            description: descriptionRef.current.value,
        }
        if(data.company_id && data.phone && data.address)
        {
            const response = await orderApi.addOrder(data);
            if(response)
            {
                setState({addOrder: false});
            }
        }else{
            setError(true);
        }
    }

    const [phoneNumber, setPhoneNumber] = useState('+998');

    const handleChange = (e) => {
      let input = e;

      if (!input.includes("+"))
      {
          input = "+998" + input;
      }

        console.log(input);

      const cleaned = ('' + input).replace(/\D/g, '');
      const match = cleaned.match(/^(\d{1,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/);
      if (match) {
        setPhoneNumber(`+${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`.trim());
      }
    };

    const handlePaste = (event) => {
      handleChange(event.clipboardData.getData('text'))
    };

    return <Box>
            <MainHeader title={'Yangi buyurtma qo\'shish'} />
            {
              error &&
              <Alert status='error' mb={'5'} width={'100%'}>
                <AlertIcon />
                <AlertTitle>{'Manzil yoki telefon raqami kiritilmagan.'}</AlertTitle>
              </Alert>
            }
            <FormControl>
                <FormLabel>Telefon raqami</FormLabel>
                <Input  type='text'  mb={5} ref={phoneRef}  
                    value={phoneNumber}
                    onChange={e => handleChange(e.target.value)}  
                    onPaste={handlePaste}
                    />
                <FormLabel>Birka</FormLabel>
                <Input type='text'  mb={5} ref={slugRef} />
                <FormLabel>Manzil</FormLabel>
                <Input type='text' mb={5} ref={addressRef} />
                <FormLabel>Gilamlar soni</FormLabel>
                <Input type='number' mb={5} ref={countRef} />
                <FormLabel>Izoh</FormLabel>
                <Textarea mb={5} ref={descriptionRef} />
                <Flex justifyContent={'end'}>
                    <Button onClick={()=> setState({addOrder: false})}><ArrowBackIcon/></Button>
                    <Spacer/>
                    <Button type="submit" onClick={addOrder} bg={config.style.main} color={'white'} width={'200px'} fontSize={'sm'} >Saqlash</Button>
                </Flex>
            </FormControl>
    </Box>
}

export default AddOrder;