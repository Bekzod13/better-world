import {api_client} from "../common/api_client";

export const orderApi = {
    async getOrders(company_id, limit, offset)
    {
        return await api_client.fetch({method: 'get', path: `orders/company/${company_id}?limit=${limit }&offset=${(offset - 1) * limit}`, body: null});
    },

    async getOrderById(id){
        return await api_client.fetch({method: 'get', path: `orders/${id}`, body: null});
    },

    async addOrder(data){
        return await api_client.fetch({method:'post', path: 'orders', body: data});
    },

    async editOrder(data){
        return await api_client.fetch({method: 'post', path: 'orders/edit', body: data});
    },

    async searchOrder(company_id, search){
        return await api_client.fetch({method: 'get', path: `orders/company/${company_id}?${search}`, body: null});
    },

    async sendLocation(order_id){
        return await api_client.fetch({method: 'get', path: `orders/send-location?order_id=${order_id}`, body: null});
    }
}