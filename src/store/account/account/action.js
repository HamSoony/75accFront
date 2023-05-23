import {
  deleteSlip,
  registerSlip,
  selectSlip,
  selectSlips,
  editSlip,
  approvalSlip,
  selectJournals,
  watingApproveSlips,
  rejectSlip,
} from '@/api/account/account'

export default {
  /**
   * 전표전체조회
   * @param commit
   * @returns {Promise<*>}
   * @constructor
   */
  async FETCH_ALL_SLIP({commit}) { // 객체로 넘어오면 {}
    try {
      const response = await selectSlips()

      commit('SET_SILP_LIST', response.data.SlipList)
      // eslint-disable-next-line no-undef
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
   * 전표한개조회
   * @param commit
   * @param slipNo
   * @returns {Promise<{slipNo: string, reportingEmpName: string, approvalDate: string, reportingEmpCode: string, slipStatus: string, accountPeriodNo: string, expenseReport: string, reportingDate: string, slipType: string, deptCode: string, status: string}|{}|*>}
   * @constructor
   */
  async FETCH_SLIP({commit}, slipNo) { // 객체로 넘어오면 {}
    try {
      let {data} = await selectSlip(slipNo)
      commit('SET_SILP', data.slip)
      return data.slip
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
   * 전표삭제
   * @param _
   * @param slipList
   * @returns {Promise<*>}
   * @constructor
   */
  async DELETE_SLIP(_, slipList) {
    try {
      return await deleteSlip(slipList)
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * 전표등록
   * @param _
   * @param slip
   * @returns {Promise<*>}
   * @constructor
   */
  async CREATE_SLIP(_, slip) { // 객체로 넘어오면 {}
    try {
      const response = await registerSlip(slip)
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },
  /**
   * 전표수정
   * @param _
   * @param slip
   * @returns {Promise<*>}
   * @constructor
   */
  async EDIT_SLIP(_, slip) { // 객체로 넘어오면 {}
    try {
      const response = await editSlip(slip)
      return response.data.slip
    } catch (err) {
      throw new Error(err)
    }
  },

  /*
   *전표 승인
   */
  async APPROVAL_SLIP(_, slipList) {
    try {
      const response = await approvalSlip(slipList)
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  /*
 *전표 반려
 */
  async REJECT_SLIP(_, slipList) {
    try {
      const response = await rejectSlip(slipList)
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * 분개장
   * @param commit
   * @param date
   * @returns {Promise<*>}
   * @constructor
   */
  async SEARCH_JOURNAL({commit}, date = {}) {
    try {
      const response = await selectJournals(date)
      commit('SET_JOURNAL_LIST', response.data.journal)
      return response
    } catch (err) {
      throw new Error(err)
    }
  },

  /**
   * 대기중인 전표 조회
   */
  async FETCH_WAITING_APPROVAL_SLIP({commit}) { // 객체로 넘어오면 {}
    try {
      const response = await watingApproveSlips()

      commit('SET_SILP_LIST', response.data.slip)
      // eslint-disable-next-line no-undef
      return response.data
    } catch (err) {
      throw new Error(err)
    }
  },

}
