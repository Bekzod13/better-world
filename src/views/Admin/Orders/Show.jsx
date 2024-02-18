import { useEffect, useState } from "react";
import MainHeader from "../../../components/MainHeader"
import { orderApi } from "../../../data/orderApi";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Spacer, Text, useDisclosure } from "@chakra-ui/react";
import { config } from "../../../config";
import { ArrowBackIcon, CheckIcon, EditIcon } from "@chakra-ui/icons";
import { itemApi } from "../../../data/itemApi";
import { SlLocationPin } from "react-icons/sl";
import EditOrder from "./EditOrder";
import { Link, useParams } from "react-router-dom";
import { companyApi } from "../../../data/companyApi";
import { useUserStore } from "../../../store/userStore";

const Show = () => {

    const user = useUserStore(state => state.app.user);
    const [order, setOrder] = useState(null);
    const [orderItems, setOrderItems] = useState([]);
    const [editor, setEditor] = useState(false);
    const [itemEdit, setItemEdit] = useState(null);
    const [itemWidth, setItemWidth] = useState(null);
    const [itemHeight, setItemHeight] = useState(null);
    const [itemEditPrice, setItemEditPrice] = useState(null);
    const [allKv, setAllKv] = useState(0);
    const [allPrice, setAllPrice] = useState(0);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedHeight, setSelectedHeight] = useState(null);
    const [selectedWidth, setSelectedWidth] = useState(null);
    const [editOrder, setEditOrder] = useState(false);
    const [orderTypes, setOrderTypes] = useState([]);
    const {statusList} = config
    const {id} = useParams();

    useEffect(() => {
        const getOrderTypes = async () => {
            const response = await companyApi.getCompanyOrderTypes(user.company_id);
            if(response)
            {
                setOrderTypes(response.data);
            }
        }
        getOrderTypes();
    },[]);

    const getOrder = async () => {
        if(id)
        {
            const response = await orderApi.getOrderById(id);
            if(response)
            {
                setOrder(response.data);
                setOrderItems(response.data.order_items ? response.data.order_items : []);
                if(response.data.order_items)
                {
                    const totalKv = response.data.order_items.reduce((total, item) => total + item.width * item.height, 0);
                    setAllKv(totalKv);
                    const totalPrice = response.data.order_items.reduce((total, item) =>  total + item.width * item.height * item.price, 0);
                    setAllPrice(totalPrice);
                }
            }
        }
    }

    useEffect(() => {
        getOrder();
    }, [id]);

    const getItem = (id) => {
        const editingItem = order.order_items.find(i => i.id === id);
        setItemEdit(editingItem);
        setItemWidth(editingItem.width);
        setItemHeight(editingItem.height);
        setItemEditPrice(editingItem.price)
    }

    const editItemFunc = async () => {
        const data = {
            id: itemEdit.id,
            price: Number(itemEditPrice),
            width: Number(itemWidth),
            height: Number(itemHeight),
            description: 'o\'zgartirildi',
        }
        const response = await itemApi.editItem(data);
        if(response)
        {
            setEditor(false);
            setItemEdit(null);
            setItemWidth(null);
            setItemHeight(null);
            setItemEditPrice(null);
        }
     
    }

    const { isOpen, onOpen, onClose } = useDisclosure()

    const addNewItem = async () => {
        const typeId = orderTypes.find(c => Number(c.price) === Number(selectedType));
        const data = {
            order_id: order.id,
            order_item_type_id: typeId.id,
            width: Number(selectedWidth),
            height: Number(selectedHeight),
            description: 'yaxshi ish'
        }
        const response = await itemApi.addItem(data);
        if(response)
        {
            onClose();
            getOrder();
        }
    }

    const changeStatus = async (statusId) => {
        const data = {
            status: Number(statusId)
        }
        await orderApi.editOrder(data);
    }

    const sendLocation = async () => {
        await orderApi.sendLocation(id);
    } 

    return <>
    {
        editOrder ? <EditOrder order={order && order} setEditOrder={setEditOrder} getOrder={getOrder} />: <>
                <MainHeader title={order && order.slug} />
        <Box pb={36}>
            <Box p={3}>
                <Flex mb={5}>
                    <Text fontSize={'sm'} >Telefon:</Text>
                    <Spacer/>
                    <Text fontSize={'sm'} color={'blue'} textDecoration={'underline'}><a href={order && "tel:" + order.phone }>{order && order.phone}</a></Text>
                </Flex>
                <Flex mb={5}>
                    <Text fontSize={'sm'} >Manzil:</Text>
                    <Spacer/>
                    <Text fontSize={'sm'}>{order && order.address}</Text>
                </Flex>
                <Flex mb={5}>
                    <Text fontSize={'sm'} >Gilamlar soni:</Text>
                    <Spacer/>
                    <Text fontSize={'sm'}>{orderItems.length}</Text>
                </Flex>
                <Box mb={5}>
                    <Text fontSize={'sm'} >Izoh:</Text>
                    <Text fontSize={'sm'} >{order && order.description}</Text>
                </Box>
                <Flex alignItems={'center'} mb={5}>
                    <Text fontSize={'sm'} >Status:</Text>
                    <Spacer/>
                    <Select fontSize={'sm'} width={'max-content'} onChange={(e) => changeStatus(e.target.value)}>
                        {
                            statusList.map(status => (
                                <option value={status.id} key={status.id} selected={(order && status.id === order.status) ? true : false}>{status.name}</option>
                            ))
                        }
                    </Select>
                </Flex>
            </Box>
        <Accordion allowMultiple>
                {
                    (orderItems.length > 0) ?  order.order_items.map(item => (
                        <AccordionItem key={item.id}>
                                 <AccordionButton>
                                    <Flex as="span" flex='1' fontSize={'sm'} textAlign='left'>
                                        <p>{item.type}</p>
                                        <Spacer/>
                                        <p>{item.height} x {item.width}</p>
                                    </Flex>
                            <AccordionIcon />
                        </AccordionButton>
                        {
                            (itemEdit && itemEdit.id === item.id) ? <AccordionPanel p={0}>
                            <Flex p={3} borderRadius={'20px'} border={'1px solid ' + config.style.light} direction={"column"} mt={3} gap={2}>
                            <Flex>
                                <Text fontSize={'sm'}>Turi:</Text>
                                <Spacer />
                                <Input fontSize={'sm'} w='150px' value={item.type} disabled={true}/>
                            </Flex>
                            <Flex>
                                <Text fontSize={'sm'}>Narxi 1kv:</Text>
                                <Spacer />
                                <Input type="number" fontSize={'sm'} w='150px' value={editor ? itemEditPrice : (item.price).toLocaleString()} disabled={!editor} 
                               onChange={e => setItemEditPrice(e.target.value)} />
                            </Flex>
                            <Flex>
                                <Text fontSize={'sm'}>Bo'yi:</Text>
                                <Spacer />
                                <Input type="number" fontSize={'sm'} w='150px' value={editor ? itemHeight : item.height} disabled={!editor} 
                                onChange={e => setItemHeight(e.target.value)} />
                            </Flex>
                            <Flex>
                                <Text fontSize={'sm'}>Eni:</Text>
                                <Spacer />
                                <Input type="number" fontSize={'sm'} w='150px' value={editor ? itemWidth : item.width} disabled={!editor} 
                                onChange={e => setItemWidth(e.target.value)} />
                            </Flex>
                            <Flex>
                                <Text type="number" fontSize={'sm'}>Kvadrati:</Text>
                                <Spacer />
                                <Input fontSize={'sm'} w='150px' value={itemEdit ? (itemHeight * itemWidth) : item.width * item.height} disabled={true} />
                            </Flex>

                            <Flex>
                                <Text fontSize={'sm'}>Narxi:</Text>
                                <Spacer />
                                <Input type="number" fontSize={'sm'} w='150px' value={itemEdit ? (itemEditPrice * itemHeight * itemWidth) : (item.height * item.width * item.price).toLocaleString()} disabled={true} />
                            </Flex>

                            <Flex mt={5}>
                                <Spacer />
                                <Button bg={config.style.main} color={'white'} onClick={() => {
                                    editItemFunc();
                                }}>
                                  <CheckIcon/>
                                </Button>
                            </Flex>
                        </Flex>
                        </AccordionPanel>:
                           <AccordionPanel p={0}>
                           <Flex p={3} borderRadius={'20px'} border={'1px solid ' + config.style.light} direction={"column"} mt={3} gap={2}>
                           <Flex>
                               <Text fontSize={'sm'}>Turi:</Text>
                               <Spacer />
                               <Input fontSize={'sm'} w='150px' value={item.type} disabled={true}/>
                           </Flex>
                           <Flex>
                               <Text fontSize={'sm'}>Narxi 1kv:</Text>
                               <Spacer />
                               <Input fontSize={'sm'} w='150px' value={(item.price).toLocaleString()} disabled={true} />
                           </Flex>
                           <Flex>
                               <Text fontSize={'sm'}>Bo'yi:</Text>
                               <Spacer />
                               <Input fontSize={'sm'} w='150px' value={item.height} disabled={!editor} />
                           </Flex>
                           <Flex>
                               <Text fontSize={'sm'}>Eni:</Text>
                               <Spacer />
                               <Input fontSize={'sm'} w='150px' value={item.width} disabled={!editor} />
                           </Flex>
                           <Flex>
                               <Text fontSize={'sm'}>Kvadrati:</Text>
                               <Spacer />
                               <Input fontSize={'sm'} w='150px' value={item.width * item.height} disabled={true} />
                           </Flex>

                           <Flex>
                               <Text fontSize={'sm'}>Narxi:</Text>
                               <Spacer />
                               <Input fontSize={'sm'} w='150px' value={(item.height * item.width * item.price).toLocaleString()} disabled={true} />
                           </Flex>

                           <Flex mt={5}>
                               <Spacer />
                               <Button onClick={() => {
                                   setEditor(!editor)
                                   getItem(item.id)
                               }}>
                                   <EditIcon/>    
                               </Button>
                           </Flex>
                       </Flex>
                       </AccordionPanel>
                        }
                    </AccordionItem>
                    )): "Gilam yo'q"
                }
        </Accordion>
        </Box>
        <Flex position={'fixed'} bottom={0} right={0} width={"100%"} bg={'white'} p={3} flexDirection={'column'} borderTop={'1px solid '+ config.style.light} >
            <Flex width={'100%'} mb={3}>
                <Text fontSize={'sm'}>Jami kv:</Text>
                <Spacer/>
                <Text fontSize={'sm'}>{allKv.toFixed(2)} kv m</Text>
            </Flex>
            <Flex width={'100%'} mb={3}>
                <Text fontSize={'sm'}>Jami narxi:</Text>
                <Spacer/>
                <Text fontSize={'sm'}>{allPrice && allPrice.toLocaleString()} sum</Text>
            </Flex>
            <Flex pt={3} borderTop={'1px solid '+ config.style.light} width={"100%"} gap={5}>
                <Link to={'/orders'}>
                    <Button><ArrowBackIcon/></Button>
                </Link>
                <Button onClick={() => setEditOrder(true)}>
                    <EditIcon/>
                </Button>
                {
                    (order && order.latitute) &&  <Button bg={config.style.main} color={'white'} onClick={sendLocation}>
                        <SlLocationPin />
                    </Button>
                }
               
                <Spacer/>
                <Button fontSize={'sm'} onClick={onOpen} bg={config.style.main} color={'white'}>Yangi qo'shish</Button>
            </Flex>
        </Flex>
        <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Yangi gilam qo'shish</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Flex p={3} borderRadius={'20px'} border={'1px solid ' + config.style.light} direction={"column"} mt={3} gap={2}>
                <Flex>
                                <Text fontSize={'sm'}>Turi:</Text>
                                <Spacer />
                                <Select width={'150px'} fontSize={'sm'} onChange={e=>setSelectedType(e.target.value)}>
                                    <option value="">Turi</option>
                                    {
                                        orderTypes.length > 0 && orderTypes.map(type => (
                                            <option key={type.id} value={type.price}>{type.name}</option>
                                        ))
                                    }
                                </Select>
                            </Flex>
                            <Flex>
                                <Text fontSize={'sm'}>Narxi 1kv:</Text>
                                <Spacer />
                                <Input type="number" fontSize={'sm'} value={selectedType} w='150px' disabled={true}/>
                            </Flex>
                            <Flex>
                                <Text fontSize={'sm'}>Bo'yi:</Text>
                                <Spacer />
                                <Input type="number" fontSize={'sm'} w='150px'  onChange={e => setSelectedHeight(e.target.value)} />
                            </Flex>
                            <Flex>
                                <Text fontSize={'sm'}>Eni:</Text>
                                <Spacer />
                                <Input type="number" fontSize={'sm'} w='150px' onChange={e => setSelectedWidth(e.target.value)} />
                            </Flex>
                            <Flex>
                                <Text type="number" fontSize={'sm'}>Kvadrati:</Text>
                                <Spacer />
                                <Input fontSize={'sm'} w='150px' disabled={true} value={(selectedHeight * selectedWidth).toFixed(1)}/>
                            </Flex>

                            <Flex>
                                <Text fontSize={'sm'}>Narxi:</Text>
                                <Spacer />
                                <Input type="number" fontSize={'sm'} value={selectedHeight * selectedType * selectedWidth} w='150px' disabled={true} />
                            </Flex>

                            <Flex mt={5}>
                                <Spacer />
                                <Button bg={config.style.main} color={'white'} onClick={() => {
                                    addNewItem();
                                }}>
                                  Saqlash
                                </Button>
                            </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
        </>
    }

    </>
}

export default Show;