export default {
  isHomeSSEOnlineAction (context, payload) {
    context.commit('isHomeSSEOnlineCommit', payload)
  },
  snackBarShowAction (context, payload) {
    context.commit('snackBarShowCommit', payload)
  },
  snackBarTextAction (context, payload) {
    context.commit('snackBarTextCommit', payload)
  },

}
