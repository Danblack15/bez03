import { createStore } from 'vuex'

import { Auth } from './modules/auth'
import { Admin } from './modules/admin'
import { Users } from './modules/users'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: Auth,
    admin: Admin,
    users: Users
  }
})
