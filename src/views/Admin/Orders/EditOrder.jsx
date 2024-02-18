import MainHeader from "../../../components/MainHeader";
import {
    FormControl,
    FormLabel,
    Box,
    Input,
    Textarea,
    Button,
    Flex,
    Spacer
  } from '@chakra-ui/react'
import { config } from "../../../config";
import { useUserStore } from "../../../store/userStore";
import { useRef, useState } from "react";
import { orderApi } from "../../../data/orderApi";
import { ArrowBackIcon } from "@chakra-ui/icons";

const EditOrder = ({setState, order, setEditOrder, getOrder}) => {

    const [phone, setPhone] = useState(order.phone);
    const [slug, setSlug] = useState(order.slug);
    const [address, setAddress] = useState(order.address);
    const [description, setDescription] = useState(order.description);


    const editOrder = async () => {
        const data = {
            id: order.id,
            phone: phone,
            slug: slug,
            address: address,
            description: description,
        }
        if(data.slug && data.phone)
        {
            const response = await orderApi.editOrder(data);
            if(response)
            {
                getOrder();
                setEditOrder(false);
            }
        }
    }

    return <Box>
            <MainHeader title={'Buyurtmani o\'zgartirish'} />
            <FormControl>
                <FormLabel>Telefon raqami</FormLabel>
                <Input value={phone} type='text' mb={5} onChange={e => setPhone(e.target.value)} />
                <FormLabel>Birka</FormLabel>
                <Input value={slug} type='text'  mb={5} onChange={e => setSlug(e.target.value)} />
                <FormLabel>Manzil</FormLabel>
                <Input value={address} type='text'  mb={5}  onChange={e => setAddress(e.target.value)} />
                <FormLabel>Izoh</FormLabel>
                <Textarea mb={5} value={description}  onChange={e => setDescription(e.target.value)}  />
                <Flex justifyContent={'end'}>
                    <Button onClick={()=> setEditOrder(false)}><ArrowBackIcon/></Button>
                    <Spacer/>
                    <Button type="submit" onClick={editOrder} bg={config.style.main} color={'white'} width={'200px'} fontSize={'sm'} >Saqlash</Button>
                </Flex>
            </FormControl>
    </Box>
}

export default EditOrder;