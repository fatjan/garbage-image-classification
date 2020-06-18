import * as tf from '@tensorflow/tfjs'
import modelImported from '@/static/model/model.json'

tf.loadLayersModel(modelImported).then(function(model) {
  window.model = model
})

export const actions = {
  notifFileTooBig({ dispatch }) {
    const alertMsg = {
      msg: 'Ukuran file melebihi batas maksimum.'
    }
    dispatch('ui/showAlert', alertMsg, { root: true })
  }
}
