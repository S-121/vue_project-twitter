import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
    isHomeSSEOnline: false,
    snackBarShow: false,
    snackBarText: ''
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
