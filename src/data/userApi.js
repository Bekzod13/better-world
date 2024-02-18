import {api_client} from "../common/api_client";

export const userApi = {
    async getUser(){
        return await api_client.fetch({method: 'post', path: 'auth/me', body: null});
    },
    async getList(){
        return await api_client.fetch({method: 'get', path: 'users', body: null});
    },
    async addStaff(data) {
        return await  api_client.fetch({method:'post', path: 'users', body: data});
    },
    async changePassword(data){
        return await api_client.fetch({method:'post', path: 'auth/change-password', body: data});
    }
}