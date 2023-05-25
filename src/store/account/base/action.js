import {
  fetchAccountCode,
  fetchAccountCustomerCode,
  fetchAccountControllCode,
  fetchAccountLedger,
  fetchGeneralAccountLedger,
  fetchAccountCodeList,
  deleteAccountCode,
  addAccountCode,
  searchCustomerInfoList, deleteCustomerCode,
  saveCustomer,
  fetchAssetCodeList,
  fetchCurrentAssetList,
  saveAsset,
  fetchFindAssetByCodeList,
  fetchFindAssetByNameList,
  fetchAccountSubjectList,
} from '@/api/account/base'

export default {
  /**
   * 모든계정코드 찾기
   * @param commit
   * @returns {Promise<*>}
   * @constructor
   */
  async FETCH_ACCOUNT_CODE_LIST({ commit }) {
    try {
      const { data } = await fetchAccountCodeList()
      console.log(data)
      console.log(data.accountList)
      commit('SET_ACCOUNT_CODE_LIST', data.accountList)
      return data
    } catch (err) {
      throw new Error(err)
    }
  },
  async FETCH_ACCOUNT_SUBJECT_LIST({ commit }) {
    try {
      const { data } = await fetchAccountSubjectList()
      // console.log(data.accountCodeList)
      commit('SET_ACCOUNT_SUBJECT_LIST', data.accountCodeList)
      return data
    } catch (err) {
      throw new Error(err)
    }
  },

  async FETCH_ASSET_CODE_LIST({ commit }) {
    try {
      const { data } = await fetchAssetCodeList()
      commit('SET_ASSET_CODE_LIST', data.accountCodeList)
      console.log( "Test : " + data)
      return data
    } catch (err) {
      throw new Error(err)
    }
  },

  async FETCH_CURRENT_ASSET_LIST({ commit }) {
    try {
      const { data } = await fetchCurrentAssetList()
      commit('SET_CURRENT_ASSET_LIST', data)
      console.log(data)
    } catch (err) {
      throw new Error(err)
    }
  },

  async FETCH_FIND_ASSET_NAME({ commit }, assetName) {
    try {
      console.log(assetName)
      const {data} = await fetchFindAssetByNameList(assetName)
      console.log(data)
      commit('SET_FIND_ASSET_NAME', data)
    } catch (err) {
      throw new Error(err)
    }
  },
  async SAVE_ASSET({commit}, newAsset){
    try {
      console.log( "new " + newAsset)
      await saveAsset(newAsset)

    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * 계정코드 삭제
   * APPROVAL_SLIP을 주석을 참조하시면 이accountCodeList해하실수 있습니다.
   * @param _
   * @param accountCode
   * @returns {Promise<*>}
   * @constructor
   */
  async DELETE_ACCOUNT_CODE(_, deleteCodeList) {
    try {
      const updateList = []
      await deleteCodeList.reduce((pre, code) => pre.then(async () => {
            const response = await deleteAccountCode(code)
            updateList.push(response.data)
          }),
          Promise.resolve())

      return updateList
    } catch (err) {
      throw new Error(err)
    }
  },
  // 해당 계정추가
  async ADD_ACCOUNT_CODE(_, accountCode) {
    try {
      console.log('계정추가확인',accountCode)
      return await addAccountCode(accountCode)
    } catch (err) {
      return err
    }
  },

  async UPDATE_ACCOUNT_CODE(_, accountCode) {
    try {
      console.log('계정과목수정',accountCode)
      return await addAccountCode(accountCode)
    } catch (err) {
      return err
    }
  },

  // 해당 계정과목 찾기
  async FETCH_ACCOUNT_CODE({ commit }, searchCode) { // 객체로 넘어오면 {}
    try {
      const { data } = await fetchAccountCode(searchCode)
      commit('SET_ACCOUNTCODE_LIST', data.accountList)
      return data
    } catch (err) {
      throw new Error(err)
    }
  },

  // 고객사 찾기
  async FETCH_ACCOUNT_CUSTOMER_CODE({ commit }) { // 객체로 넘어오면 {}
    try {
      const { data } = await fetchAccountCustomerCode()
      console.log(data)
      commit('SET_ACCOUNT_CUSTOMER_LIST', data.customerList)
      return data
    } catch (err) {
      throw new Error(err)
    }
  },
  // 분개상세 코드 찾기
  async FETCH_ACCOUNT_CONTROLL_CODE({ commit }) { // 객체로 넘어오면 {}
    try {
      const { data } = await fetchAccountControllCode()
      console.log(data)
      commit('SET_ACCOUNT_CONTROLL_CODE_LIST', data.accountControllCodeList)
      return data
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
   * 계정별원장
   */
  async FETCH_ACCOUNT_LEDGER({ commit }, searchData) {
    try {
      const response = await fetchAccountLedger(searchData)
      console.log(response)
      commit('SET_ACCOUNT_LEDGER_LIST', response.data.accountLederList)
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
   * 총계정원장
   */
  async FETCH_GENERAL_ACCOUNT_LEDGER({ commit }, searchData) {
    try {
      const response = await fetchGeneralAccountLedger(searchData)
      console.log(response)
      commit('SET_GENERAL_ACCOUNT_LEDGER', response.data)
      return response
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
   * 거래처조회 조현준
   */
  async SEARCH_CUSTOMER_INFO_LIST({commit}){
    try {

      const {data} = await searchCustomerInfoList()
      console.log(data)
      commit('SEARCH_CUSTOMER_INFO', data)
    } catch (err){
      throw new Error(err)
    }
  },

  async DELETE_CUSTOMER_CODE({commit}, id){
    try {
      console.log('커스터머코드',id)
       await deleteCustomerCode(id)
      commit('DELETE_CUSTOMER_CODE',id)
      return null
    } catch (err){
      throw new Error(err)
    }
  },

  async SAVE_CUSTOMER_CODE({commit}, newCustomer){
    try {
      console.log('커스터머',newCustomer)
      await saveCustomer(newCustomer)
     // commit('DELETE_CUSTOMER_CODE',customerCode)
     // return data
    } catch (err){
      throw new Error(err)
    }
  }

}
