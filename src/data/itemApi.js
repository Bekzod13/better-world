import {api_client} from "../common/api_client";

export const itemApi = {
    async addItem(data){
        return await api_client.fetch({method: 'post', path: `order-items`, body: data});
    },

    async editItem(data){
        return await api_client.fetch({method:'post', path: 'order-items/edit', body: data});
    }

}