import axios from "axios";
import {config} from '../config/index';
import {useUserStore} from '../store/userStore';

export const api_client = {
    async fetch({method = 'get', path, body}){
        // const logout = useUserStore((state) => state.logout);
        const token = useUserStore.getState().app.token;

        const axios_parameters = {
            method: method,
            url: `${config.base_url}${path}`,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        };

        if(body !== null || !body)
        {
            axios_parameters.data = body;
        }

        try{
            const response = await axios(axios_parameters);
            if (response.status === 200 || response.status === 201)
            {
                return response.data;
            }

        }catch (e) {
            if(String(e) === 'AxiosError: Request failed with status code 401' || String(e) === 'AxiosError: Request failed with status code 403')
            {
                localStorage.removeItem('app-storage');
                window.location.reload();
            }else{
                console.log(e + ' app has error');
            }
        }
    }
}