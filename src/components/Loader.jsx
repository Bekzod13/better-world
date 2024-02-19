import { SpinnerIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/react";
import { config } from "../config";

const Loader = () => {
    return <Flex width={'100%'} height={'100vh'} zIndex={'10'} bg={'white'} justifyContent={'center'} alignItems={'center'}>
        <Flex className="loader" width={50} height={50} justifyContent={'center'} alignItems={'center'} color={config.style.main}>
            <SpinnerIcon/>
        </Flex>
    </Flex>
}

export default Loader;