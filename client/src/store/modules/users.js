import api from '@/helpers/api'
import router from '@/router';
import Cookies from 'js-cookie';

export const Users = {
    state: () => ({
        userData: null
    }),

    getters: {
        getUserData(state) {
            return state.userData;
        }
    },

    mutations: {
        setNewUserData(state, newData) {
            state.userData = newData;
        }
    },

    actions: {
        async changePassword({ commit }, userData) {
            try {
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                    }
                }

                userData.username = JSON.parse(Cookies.get('account')).username;

                const res = await api.post('admin/changePass', userData, config);

                commit('setHint', res.data, { root: true });

            } catch (error) {
                commit('setHint', error.response.data, { root: true });
                console.log(error);
            }
        },

        async getUserData({ commit }, userName) {
            try {
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                    }
                }

                const res = await api.get(`auth/${userName}`, config);

                if (res.data.status !== 'ok') {
                    return;
                }

                if (res.data.user?.block) {
                    Cookies.remove('account');
                    Cookies.remove('token');

                    router.push('/');
                }

                commit('setNewUserData', res.data.user);
            } catch (error) {
                Cookies.remove('account');
                Cookies.remove('token');

                router.push('/');
                
                console.log(error);
            }
        },
    },

    namespaced: true,
}