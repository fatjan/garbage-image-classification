// store module for User Interface
export const state = () => ({
  snackbar: false,
  snackbarText: '',
  snackbarColor: '#131e46',
  snackTimeout: 7000
})

// mutations defined as object
export const mutations = {
  setState(state, params) {
    const keys = Object.keys(params)
    keys.forEach((key) => (state[key] = params[key]))
  }
}
export const actions = {
  showAlert({ commit }, params) {
    commit('setState', {
      snackbar: true,
      snackbarText: params.msg,
      snackTimeout: params.timeout > 0 ? params.timeout : 7000,
      snackbarColor:
        typeof params.color !== 'undefined' ? params.color : '#131e46'
    })
  }
}
