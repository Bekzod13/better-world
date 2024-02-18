import { Box, Button, Flex, Input, Select } from "@chakra-ui/react"
import MainHeader from "../../../components/MainHeader";
import { config } from "../../../config";
import { useEffect, useReducer, useState } from "react";
import { orderApi } from "../../../data/orderApi";
import { useUserStore } from "../../../store/userStore";
import Pagination from "./Pagination";
import Item from "./Item";
import AddOrder from "./AddOrder";
import Show from "./Show";
import { companyApi } from "../../../data/companyApi";

const Orders = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const user = useUserStore(state => state.app.user);
    const statusList = config.statusList;
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const [searchStatus, setSearchStatus] = useState(null);

    const [state, setState] = useReducer(
        (state, newState) => ({
          ...state,
          ...newState,
        }),
        {
            orders: [],
            orderTypes: [],
            addOrder: false,
            show: false,
            orderId: null,
        },
    );

    const getOrders = async () => {
        const response = await orderApi.getOrders(user.company_id, 10, currentPage);
        if(response && response.data)
        {
            setState({orders: response.data.data, ordersCount: Number(response.data.total)});
        }
    }
    useEffect(()=>{
        getOrders();
    }, [currentPage, state.addOrder]);

    const itemsPerPage = 10;
    const totalPages = Math.ceil(state.ordersCount / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

// SEARCH

    const debounce = (func, delay) => {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const search = async (term) => {
        let query='';
        if(term === '' && searchStatus !== null)
        {
            query = `status=${searchStatus}`;
        }
        else if(searchStatus === null && term !== ''){
            query = `slug=${term}`
        }else if (searchStatus !== null && term !== '')
        {
            query = `slug=${term}&status=${searchStatus}`
        }
        if(query !== '')
        {
            const response = await orderApi.searchOrder(user.company_id, query);
            if(response.data.data)
            {
                setState({orders: response.data.data, ordersCount: Number(response.data.total)});
            }else{
                setState({orders: []});
            }
        }
    };

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        setDebouncedSearchTerm(event.target.value);
    };
    const debouncedSearch = debounce(search, 500);
    useEffect(() => {
        debouncedSearch(debouncedSearchTerm);
    }, [debouncedSearchTerm, searchStatus]);

    useEffect(() => {
        const getOrderTypes = async () => {
            const response = await companyApi.getCompanyOrderTypes(user.company_id);
            if(response)
            {
                setState({orderTypes: response.data});
            }
        }
        getOrderTypes();
    },[]);

    return <>
    {
        state.show ? <Show orderTypes={state.orderTypes} orderId={state.orderId} setState={setState} statusList={statusList} />:
            state.addOrder ? 
            <AddOrder setState={setState} />:
            <Box>
                <MainHeader title={'Buyurtmalar'} />
                <Flex>
                    <Input fontSize={'sm'} placeholder="Qidiring..." mr={2}  value={searchTerm}  onChange={handleInputChange} />
                    <Select fontSize={'sm'} width={'max-content'} onChange={e=>setSearchStatus(e.target.value)}>
                        <option>Tanlash</option>
                        {
                            statusList.map(option => (
                                <option key={option.id} value={option.id}>{option.name}</option>
                            ))
                        }
                    </Select>
                </Flex>
                <Box>
                    {
                        state.orders ? state.orders.map(order => (
                            <Item order={order} key={order.id} setState={setState} />
                        )): "Buyurtma yo'q"
                    }
                </Box>
                <Pagination currentPage={currentPage} state={state} handlePageChange={handlePageChange} totalPages={totalPages} />
                <Flex bg={'white'} position={'fixed'} zIndex={10} width={'100%'} bottom={0} right={0} justifyContent={'end'} p={2} >
                    <Button bg={config.style.main} color={'white'} onClick={() => setState({addOrder: true})} width={'200px'} fontSize={'sm'} >Yangi qo'shish</Button>
                </Flex>
            </Box>
    }
   
    </>
 
}

export default Orders;