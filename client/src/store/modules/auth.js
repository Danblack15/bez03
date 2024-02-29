import api from '@/helpers/api'
import router from '@/router';
import Cookies from 'js-cookie';

export const Auth = {
    state: () => ({
        account: Cookies.get('account') ? Cookies.get('account') : {},
        token: Cookies.get('token') ? Cookies.get('token') : {},
        isAdmin: Cookies.get('account') ? JSON.parse(Cookies.get('account')).username === 'ADMIN' : false
    }),

    getters: {
        getAccount(state) {
            return JSON.parse(state.account);
        },

        getToken(state) {
            return state.token;
        },

        getIsAdmin(state) {
            return state.isAdmin;
        }
    },

    mutations: {
        setAccount(state, data) {
            state.account = data;
        },

        setToken(state, data) {
            state.token = data;
        },
    },

    actions: {
        async login({ commit }, data) {
            try {
                // commit('setLoading', true, { root: true });
                const res = await api.post('auth', data /* {username: '', password: ''} */);

                if (res.data.status !== 'ok') {
                    // commit('setLoading', false, { root: true });
                    // commit('setHint', res.data.msg, { root: true });
                    return;
                }

                Cookies.set('account', JSON.stringify(res.data.user));
                Cookies.set('token', res.data.token);

                // commit('setLoading', false, { root: true });
                router.push('/explore');
            } catch (error) {
                // commit('setLoading', false, { root: true });
                console.log(error);
            }
        },

        async logout({ commit }) {
            Cookies.remove('account');
            Cookies.remove('token');

            router.push('/');
        },
    },

    namespaced: true,
}