import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    roomId: '',
    memberId: 'madori2',
    isExist: false,
    isEditable: false
  }
})
