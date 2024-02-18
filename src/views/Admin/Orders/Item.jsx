import { Box, Button, Flex, Select, Spacer, Text } from "@chakra-ui/react"
import { dater } from "../../../common/dater";
import { format } from "date-fns";
import { config } from "../../../config";
import { Link } from "react-router-dom";

const Item = ({order, setState}) => {
    const {statusList} = config
    return <Link to={`/orders/${order.id}`}>
        <Box mt={5}  borderRadius={5} border={'1px solid ' + config.style.light}>
            <Flex p={3} bg={config.style.light} onClick={() => setState({show: true, orderId: order.id})}>
                <Text fontSize={'sm'}>{order.slug}</Text>
                <Spacer/>
            </Flex>
            <Flex alignItems={'center'} px={3} py={1} borderTop={'1px solid ' + config.style.light} >
                <Text fontSize={'sm'}  onClick={() => setState({show: true, orderId: order.id})}>{dater.dater(format(order.created_at, 'd MMMM'))}</Text>
                <Spacer/>
                <Text fontSize={'sm'} bg={config.style.main} color={'white'} px={3} py={1} borderRadius={5}>
                    { statusList.find(status => status.id === order.status) ? (statusList.find(status => status.id === order.status)).name : 'Olish kerak'}
                </Text>
            </Flex>
        </Box>
    </Link>
}

export default Item;