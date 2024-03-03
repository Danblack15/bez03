import api from '@/helpers/api'
import router from '@/router';
import Cookies from 'js-cookie';

export const Auth = {
    state: () => ({
        account: Cookies.get('account') ? Cookies.get('account') : {},
        token: Cookies.get('token') ? Cookies.get('token') : {},
        isAdmin: Cookies.get('account') ? JSON.parse(Cookies.get('account')).username === 'ADMIN' : false,
        delay: localStorage.delay ? localStorage.delay : null
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

        setDelay(state) {
            const diff = 10;

            state.delay = new Date(new Date().getTime() + diff*60000);
            localStorage.delay = state.delay;
        }
    },

    actions: {
        async login({ state, commit }, data) {
            if (state.delay) {
                let hourDiff = new Date(state.delay).getTime() - new Date().getTime();
                let minDiff = Math.ceil(hourDiff / 60 / 1000);

                commit('setHint', `Временная блокировка: ${minDiff} мин.`, { root: true });

                return;
            };
            
            try {
                const res = await api.post('auth', data /* {username: '', password: ''} */);

                if (res.data.status !== 'ok') {
                    commit('setHint', res.data.request.responseText, { root: true });
                    return;
                }

                Cookies.set('account', JSON.stringify(res.data.user));
                Cookies.set('token', res.data.token);

                router.push('/explore');

                localStorage.removeItem('stepOfDelay');
                localStorage.removeItem('delay');
                
            } catch (error) {
                if (error.response.status === 401) {
                    const stepOfDelayLocal = Number(localStorage.stepOfDelay) || 0;

                    if (stepOfDelayLocal < 2)
                        localStorage.stepOfDelay = stepOfDelayLocal + 1;
                    else {
                        commit('setHint', error.response.data, { root: true });
                        commit('setDelay');
                    }
                }

                if (!state.delay)
                    commit('setHint', error.response.data, { root: true });

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