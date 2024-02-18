import {
    Text,
    Spacer,
    Flex,
      Box
  } from "@chakra-ui/react";
import { dater } from "../../../common/dater";
import { format } from "date-fns";
import { config } from "../../../config";

const Item = ({date, groupData}) => {
    return <Box key={date} width={'100%'} border={'1px solid ' + config.style.light } mb={5} borderRadius={5}>
        <Text borderBottom={'1px solid ' + config.style.light} textAlign={'center'} py={2}>{dater.dater(format(new Date(date), 'dd MMMM'))}</Text>
        <Box p={3}>
            {groupData[date].map((item, index) => (
                <Flex key={item.type}>
                <p>{index + 1}. {item.type}</p>
                <Spacer/>
                <p> {item.meter_square} kv m</p>
                </Flex>
            ))}
        </Box>
        <Flex p={3} borderTop={'1px solid ' + config.style.light}>
            <p>Jami: </p>
            <Spacer/>
            <p> {(groupData[date].reduce((summ, item) => Number(summ) + Number(item.meter_square), 0)).toFixed(2)} kv m</p>
        </Flex>
    </Box>
}

export default Item;