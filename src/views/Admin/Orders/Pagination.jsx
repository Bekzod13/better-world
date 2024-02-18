import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";

const Pagination = ({state, currentPage, totalPages, handlePageChange}) => {
    return <>
        {
            state.ordersCount > 10 &&
                <Flex justifyContent={'center'} gap={2} pt={5} mb={16}>
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ArrowBackIcon/>
                    </Button>
                    <Button fontSize={'sm'}> page {currentPage} of {totalPages} </Button>
                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ArrowForwardIcon/>
                    </Button>
          </Flex>
        }
    </>
}
export default Pagination;