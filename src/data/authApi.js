import {api_client} from "../common/api_client";

export const authApi = {
    async login({phone, password})
    {
        const data = {
            phone: phone,
            password: password
        }

        return await api_client.fetch({method:'post', path: 'auth/login', body: data});
    }
}