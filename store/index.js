export const actions = {
  notifFileTooBig({ dispatch }) {
    const alertMsg = {
      msg: 'Ukuran file melebihi batas maksimum.'
    }
    dispatch('ui/showAlert', alertMsg, { root: true })
  }
}
