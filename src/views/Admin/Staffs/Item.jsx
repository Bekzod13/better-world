import { Box, Flex, Spacer, Text } from "@chakra-ui/react"
import { config } from "../../../config";

const Item = ({item}) => {
    return <Box border={'1px solid '+ config.style.light} mb={5} borderRadius={5} p={3}>
        <Flex alignItems={'center'} mb={2}>
            <Text fontSize={'sm'} textTransform={'capitalize'} >{item.firstname}</Text>
            <Spacer/>
            <Text fontSize={'sm'} bg={config.style.main} color={'white'} px={2} py={1} borderRadius={5}>{item.role}</Text>
        </Flex>
        <Flex alignItems={'center'}>
        <Text fontSize={'sm'} textTransform={'capitalize'} >{item.lastname}</Text>
            <Spacer/>
            <a href={`tel:${item.phone}`}>
                <Text color={'blue'} fontSize={'sm'} textDecoration={'underline'} px={2} py={1} borderRadius={5}>{item.phone}</Text>
            </a>
        </Flex>
    </Box>
}

export default Item;