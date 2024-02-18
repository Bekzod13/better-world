import { Button, Flex, Spacer, Text, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure  } from "@chakra-ui/react"
import { config } from "../../../config";
import { EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { companyApi } from "../../../data/companyApi";
import { useUserStore } from "../../../store/userStore";

const Item = ({item, getTypes}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalItem, setModalItem] = useState(item);
    const [price, setPrice] = useState(item.price);
    const user = useUserStore(state => state.app.user);

    const editItem = async () => {
        const data = {
            id: item.id,
            company_id: user.company_id,
            price: Number(price)
        };
        const response = await companyApi.editCompanyOrderType(data);
        if(response)
        {
            getTypes();
            onClose();
        }
    }

    return <>
    <Modal isOpen={isOpen} onClose={onClose} size={'full'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tahrirlash</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Flex p={3} borderRadius={'20px'} direction={"column"} mt={3} gap={2}>
            <Flex alignItems={'center'}>
                <Text fontSize={'sm'}>{modalItem.name}</Text>
                <Spacer />
                <Input type="number" width={150} value={price} onChange={e => setPrice(e.target.value)} />
            </Flex>
            <Flex mt={5}>
                <Spacer />
                <Button bg={config.style.main} color={'white'} onClick={() => {
                    editItem()
                }}>Saqlash</Button>
            </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
    </Modal>
    <Flex py={2} px={3} mb={5} bg={config.style.light} borderRadius={5} alignItems={'center'}>
        <Text fontSize={'sm'}>{item.name}</Text>
        <Spacer/>
        <Text fontSize={'sm'}>{item.price} sum</Text>
        <Button bg={config.style.main} color={'white'} ml={5} onClick={onOpen}>
            <EditIcon/>
        </Button>
    </Flex>
    </>
}

export default Item;