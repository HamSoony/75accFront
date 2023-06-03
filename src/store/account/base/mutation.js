export default {


  // 자산분류코드 리스트
  SET_ASSET_TYPE_CODE(state, data) {
    let assetTypeCodeList = [];
    for(const code of data){
      const {acctCode,acctName} = code
      assetTypeCodeList.push({acctCode,acctName})
    }
    state.assetTypeCodeList = assetTypeCodeList
    console.log(state.assetTypeCodeList)
  },



// 자산 리스트
  SET_CURRENT_ASSET_LIST(state,findCurrentAssetList) {
    findCurrentAssetList.showDetails = false
    state.findCurrentAssetList = findCurrentAssetList
  },


  //자산 조회(코드네임)
  SET_FIND_ASSET_NAME(state,findAssetNameList) {
    state.findCurrentAssetList = findAssetNameList
  },

 //자산리스트 조회(부서)
  SET_FIND_ASSET_BY_DEPARTMENT(state, findAssetByDepartment){
    state.findCurrentAssetList = findAssetByDepartment
  },

  //자산리스트 조회(취득일자)
  SET_FIND_ASSET_BY_PROGRESS(state, findAssetByProgress){
    state.findCurrentAssetList = findAssetByProgress
  },

  //자산리스트 조회(자산분류코드)
  SET_FIND_ASSET_BY_ACCTCODE(state, findAssetByAcctCode){
    state.findCurrentAssetList = findAssetByAcctCode
  },

  /**
   * 모든계정코드 찾아오기
   * @param state
   * @param accountCodeList
   * @constructor
   */
  SET_ACCOUNT_CODE_LIST(state, accountList) {
    state.accountList = accountList
  },

  /**
   * 계정과목관리
   */
  SET_ACCOUNT_SUBJECT_LIST(state, accountSubjectList) {
    console.log(accountSubjectList)
    state.accountSubjectList=accountSubjectList

  },

  // 계정코드 셋팅
  SET_ACCOUNTCODE_LIST(state, accountCodeList) {
    state.accountCodeList = accountCodeList
  },
  // 계정코드 지우기
  CLEAR_CODE_LIST(state) {
    state.accountCodeList = []
  },
  // 거래처 셋팅
  SET_ACCOUNT_CUSTOMER_LIST(state, accountCustomerList) {
    state.accountCustomerList = accountCustomerList
  },
  CLEAR_CUSTOMER_CODE_LIST(state) {
    state.accountCustomerList = []
  },

  // 분개상세 코드 찾기
  SET_ACCOUNT_CONTROLL_CODE_LIST(state, accountControllCodeList) {
    state.accountControllCodeList = accountControllCodeList
  },
  // 초기화
  CLEAR_ACCOUNT_CONTROLL_CODE_LIST(state) {
    state.accountControllCodeList = []
  },
  /**
   * 계정별원장
   */
  SET_ACCOUNT_LEDGER_LIST(state, accountLederList) {
    state.accountLederList = accountLederList
  },
  CLEAR_ACCOUNT_LEDGER_LIST(state) {
    state.accountLederList = []
  },
  /**
   * 총계정원장
   */
  SET_GENERAL_ACCOUNT_LEDGER(state, generalAccountLedgerList) {
    state.generalAccountLedgerList = generalAccountLedgerList
  },
  CLEAR_GENERAL_ACCOUNT_LEDGER(state) {
    state.generalAccountLedgerList = []
  },
  /**
   * 거래처조회
   */
  SEARCH_CUSTOMER_INFO(state, customerList){
    state.customerList = customerList
  },
  setGrid(state, gridRow) {
    state.grid = gridRow
  },
  setTable(state, tableColumns) {
    state.tableColumns = tableColumns[0].tableColumns
  },


  DELETE_CUSTOMER_CODE(state,id){
    console.log('뮤테이션삭제',state.id)
    state.id = state.customerList.filter((item)=>item.id !== id);
  },
  ADD_CUSTOMER_CODE(state, customerData){
    console.log('뮤테이션오냐?^__^')
    state.customerList = state.customerList.concat(customerData)
  },

}
