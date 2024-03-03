import { createStore } from 'vuex'

import { Auth } from './modules/auth'
import { Admin } from './modules/admin'
import { Users } from './modules/users'

export default createStore({
  state: {
    hint: null
  },
  getters: {
    getHint(state) {
      return state.hint;
    }
  },
  mutations: {
    setHint(state, value) {
      state.hint = value;

      setTimeout(() => {
        state.hint = null;
      }, 3000);
    }
  },
  actions: {
    setNewHint({ commit }, textHint) {
      commit('setHint', textHint);
    }
  },
  modules: {
    auth: Auth,
    admin: Admin,
    users: Users
  }
})
