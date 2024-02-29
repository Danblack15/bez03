import api from '@/helpers/api'
import Cookies from 'js-cookie';

export const Admin = {
    state: () => ({
        allUsers: [],
    }),

    getters: {
        getAllUsers(state) {
            return state.allUsers;
        },
    },

    mutations: {
        setAllUsers(state, data) {
            state.allUsers = data;
        },
    },

    actions: {
        async fetchAllUsers({ commit }) {
            try {
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                    }
                }
                
                const res = await api.get('admin/allUsers', config);

                if (res.data.status !== 'ok') {
                    return;
                }

                commit('setAllUsers', JSON.parse(res.data.data));
            } catch (error) {
                console.log(error);
            }
        },

        async blockUser({ commit, dispatch }, userData) {
            try {
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                    }
                }
                
                const res = await api.post(`admin/block/${userData[0]}?block=${!userData[1]}`, config);

                if (res.data.status !== 'ok') {
                    return;
                }

                dispatch('fetchAllUsers')
            } catch (error) {
                console.log(error);
            }
        },

        async addUser({ commit, dispatch }, newUserData) {
            try {
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                    }
                }
                
                const res = await api.post('register', newUserData, config);

                if (res.data.status !== 'ok') {
                    return;
                }

                dispatch('fetchAllUsers')
            } catch (error) {
                console.log(error);
            }
        }
    },

    namespaced: true,
}