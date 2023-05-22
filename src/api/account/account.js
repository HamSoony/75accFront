/* eslint-disable import/prefer-default-export */

import { accountApi } from '@/api'

// Api
const SLIP_URL = '/account/slips'
const JOURNAL_URL = '/account/journal'

/**
 * 전표 ㅇㅇㅇㅇㅇ
 */
/**
 * 전체조회
 * @returns {*}
 */
function selectSlips() {
  return accountApi.get(`/account/onlyslips`)
}

/**
 * 한개조회
 * @param slipNo
 * @returns {*}
 */
function selectSlip(slipNo) {
  return accountApi.get(`/account/slip/${slipNo}`)
}

/**
 *
 *  삭제
 *  data속성을 추가안해주면 404오류뜬다!!! 주의
 *    map 구조로 날라간다. slipList : [{},{}]
 * @param slipList
 * @returns {*}
 */
function deleteSlip(slipList) {
  return accountApi.delete(`${SLIP_URL}`, {
    data: {
      slipList,
    },
  })
}

/**
 * 전표추가
 * @param slip
 * @returns {*}
 */
function registerSlip(slip) {
  return accountApi.post(`/account/slip`, slip)
}

/**
 * 전표수정
 * @param slip
 * @returns {*}
 */
function editSlip(slip) {
  return accountApi.put("/account/slip", slip)
}

/**
 * 전표승인
 */
function approvalSlip(slipIdList) {
  return accountApi.put(`/account/slipsApprove`, slipIdList)
}

/**
 * 전표반려
 */
function rejectSlip(slipIdList) {
  return accountApi.put(`/account/slipsReject`, slipIdList)
}


/**
 * 분개장검색
 * @param date 1
 */
function selectJournals({ startDate, endDate }) {
  return accountApi.get(`/account/journalsBetweenDate`, {
    params: {
      startDate,
      endDate,
    },
  })
}

/**
 * 승인 대기중인 전표 조회
 */
function watingApproveSlips() {
  return accountApi.get(`/account/slipsApprove`)
}

export {
  selectSlips, selectSlip, deleteSlip, registerSlip, editSlip, approvalSlip,
  selectJournals, watingApproveSlips, rejectSlip
}
