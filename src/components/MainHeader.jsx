import { Text } from "@chakra-ui/react";
import { config } from "../config";

const MainHeader = ({title}) => {
    return <Text fontSize={'xl'} fontWeight={600} bg={config.style.light} px={4} py={3} borderRadius={5} mb={5}>
        {title}
    </Text>
}
export default MainHeader;