import mutations from './mutation'
import actions from './action'

export default {
  namespaced: true,
  state: {
    budgetlist: [],
    monthBudget:[],
  },
  getters: {

  },

  mutations,
  actions,

}
