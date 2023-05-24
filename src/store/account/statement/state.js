import mutations from '@/store/account/statement/mutation'
import actions from '@/store/account/statement/action'

export default {
  namespaced: true,
  state: {
    detailTrialBalanceList: [],
    cashJournalList: [],
    totaltrialList: [],
    incomeList: [],
    financialPositions: [],
    monthIncomeList: [],
    cashFlowList: [],
    costList: [],

  },
  getters: {
  },
  mutations,
  actions,

}
