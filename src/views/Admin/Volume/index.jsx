import { Box, Flex, Spacer, Text } from "@chakra-ui/react"
import MainHeader from "../../../components/MainHeader";
import { useEffect, useState, useColorModeValue } from "react";
import { companyApi } from "../../../data/companyApi";
import { useUserStore } from "../../../store/userStore";
import Item from "./Item";

const Volume = () => {
    const user = useUserStore(state => state.app.user);
    const [groupData, setGroupData] = useState({});
    const getVolume = async () => {
        const response = await companyApi.getWorkVolume(user.company_id);
        if(response && response.data)
        {
            const groupedData = {};
                response.data.forEach(item => {
                    const washedAtDate = item.washed_at.split('T')[0];
                    if (!groupedData[washedAtDate]) {
                      groupedData[washedAtDate] = [];
                    }
                    groupedData[washedAtDate].push(item);
                  });
          
                  setGroupData(groupedData);
        }
    }
    useEffect(() => {
        getVolume();
    }, [])

    return <Box>
        <MainHeader title={'Ish hajmi'}/>
        <Box>
            <Box  width={'100%'}>
                {Object.keys(groupData).map(date => (
                    <Item date={date} key={date} groupData={groupData} />
                ))}
            </Box>
        </Box>
    </Box>
}

export default Volume;