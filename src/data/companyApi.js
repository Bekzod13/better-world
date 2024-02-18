import {api_client} from "../common/api_client";

export const companyApi = {
    async getCompanyRoles(id)
    {
        return await api_client.fetch({method: 'get', path: `role/${id}`, body: null});
    },

    async getCompanyOrderTypes(id){
        return await api_client.fetch({method: 'get', path: `order-item-type/${id}`, body: null});
    },

    async addCompanyOrderType(data){
        return await api_client.fetch({method: 'post', path: 'order-item-type', body: data});
    },

    async editCompanyOrderType(data){
        return await api_client.fetch({method: 'put', path: `order-item-type`, body: data});
    },

    async getWorkVolume(id){
        return await api_client.fetch({method: 'get', path: `statistics/work-volume/${id}`, body: null})
    },

    async getCompanyRolesById(id){
        return await api_client.fetch({method: 'get', path: `role/show/${id}`, body: null});
    },

    async getCompanyPermissions(){
        return await api_client.fetch({method: 'get', path: 'permissions', body: null});
    },

    async setCompanyPermission(data){
        return await api_client.fetch({method: 'post', path: 'role/give-permissions', body: data});
    }
}