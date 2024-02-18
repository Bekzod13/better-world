import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'
import {authApi} from "../data/authApi";
import {userApi} from "../data/userApi";

const initialState = {
    token: null,
    user: null,
    company: null,
    isAuthorized: false,
    staffs: [],
    orders: [],
    roles: [],
    permissions: {},
};

export const useUserStore = create()(
    persist(
        (set, get) => ({
            app: initialState,
            init: async () => {
                const token = get().app.token;

                if(token === null)
                {
                    set({ app: initialState });
                    return;
                }

                try {
                    const user = await userApi.getUser();
                    if(user === undefined || user === null)
                    {
                        set({ app: initialState });
                        return;
                    }

                    const permissionsObject = {};
            
                    if(user.data.permissions)
                    {
                        const permissionsArray = user.data.permissions.split('|');
                        permissionsArray.forEach(action => {
                            permissionsObject[action] = true;
                        });

                    }

                    const staffs = await userApi.getList();
                    if(staffs !== undefined)
                    {
                        set(state => ({
                            app: {
                                ...state.app,
                                error: null,
                                user: user.data,
                                staffs: staffs.data,
                                isAuthorized: true,
                                permissions: permissionsObject
                            },
                        }));
                    }

                    set(state => ({
                        app: {
                            ...state.app,
                            error: null,
                            user: user.data,
                            isAuthorized: true,
                        },
                    }));



                }catch (error) {
                    console.log(error)
                }
            },
            login: async (phone, password) => {
                const response = await authApi.login(phone, password);
                if(response)
                {
                    set(state => ({ app: { ...state.app, token: response.data}}));
                    await get().init();
                }
            },
            logout: () => {
                set({ app: initialState });
            },
            addStaffMethod: async (data) => {
                const response = await userApi.addStaff(data);
                if(response)
                {
                    await get().init();
                    return true;
                }
            }
        }),
    {
            name: 'app-storage',
            storage: createJSONStorage(() => localStorage),
        }
    ),
);