import Vue from 'vue'
import Vuex from 'vuex'
import uuid from 'uuid'
import mediaDevices from './mediaDevices'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mediaDevices
  },
  state: {
    scannedList: []
  },
  mutations: {
    saveScannedText (state, text) {
      state.scannedList.push({
        id: uuid(),
        text: text,
        scanDate: new Date()
      })
    },
    removeScannedText (state, id) {
      state.scannedList = state.scannedList.filter(t => t.id !== id)
    }
  }
})
