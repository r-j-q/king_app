import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutaions'
import user from './module/user'
import group from './module/group'
import saveInLocal from './plugin/saveInLocal'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
	user,
	group
  },
  state,
  mutations,
  actions,
  getters,
  plugins: [ saveInLocal ]
})
