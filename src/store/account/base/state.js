import mutations from './mutation'
import actions from './action'

export default {
  namespaced: true,
  state: {
    accountCodeList: [],
    accountSubjectList:[],
    accountList: [],
    accountCustomerList: [],
    accountControllCodeList: [],
    accountLederList: [],
    generalAccountLedgerList: [],
    customerList: [],
    id:'',
    assetTypeCodeList: [],
    findAssetName: [],
    findCurrentAssetList:[],
    findAssetByCodeList:[],
    findAssetByNameList:[],

  },
  getters: {
    /**
     *  기존 배열에서  차변 대변 누계를 포함한 객체를 만들어 추가하는 겟터!
     *  slice = 얕은 복사본을 새로운 배열 객체로 반환합니다. 원본 배열은 바뀌지 않습니다.
     *   slice(-2) 뒤에서 부터 2개를 뽑아온다.
     * @param state
     */
    GET_ACCOUNT_LEDER_LIST(state) {
      if (state.accountLederList?.length > 0) {
        const lastAccount = state.accountLederList.slice(-2)
        const object = {
          reportingDate: '누계',
          leftDebtorPrice: lastAccount[0].totalPrice,
          rightCreditsPrice: lastAccount[1].totalPrice,
        }
        return [...state.accountLederList, object]
      }
      return state.accountLederList
    },
    /**
     *  필터를 이용하여 제일 상단 애들을 뽑은 후 select를 이용하기위해 각각의 객체에 text라는 속성을 부여했다!!!.
     *  shift를 통해 계정이라는 선택항목을 없애고
     * unshift를 통해 안내문구가 나오도록 표시
     * @param state
     * @returns {(*&{text: *})[]}
     * @constructor
     */
    GET_ACCOUNT_LEDER_TREE_LIST(state) {
      // console.log('루트', state.accountCodeList2)
      const rootList = state.accountSubjectList.filter(value => value.leaf === '0').map(v => ({ value: v, text: v.acctName }))
      rootList.shift()
      rootList.unshift({ value: null, text: '계정과목을 선택해주세요' })
      return rootList
    },

    GET_ASSET_CODE_LIST(state) {
      // const assetCodeList = state.assetCodeList.filter(value => value.leaf === '0')
      //     .map(v => ({ value: v, text: v.acctName }))

      const assetCodeList = [];
      for (const asset of state.assetCodeList){
        assetCodeList.push(asset.acctName)
      }
      console.log("TEST : " + assetCodeList)
      //assetCodeList.shift()
      //assetCodeList.unshift({ value: null, text: '계정과목을 선택해주세요' })
      return assetCodeList
    },

    GET_ASSET_TYPE_CODE(state) {
      const assetTypeCode = state.assetTypeCode
      return assetTypeCode
    },

    GET_CURRENT_ASSET_LIST(state) {
      const findCurrentAssetList=state.findCurrentAssetList;
      return findCurrentAssetList
    },

    // GET_FIND_ASSET_BY_CODE_LIST({commit}, acctCode) {
    //   const findAssetByCodeList = Promise.resolve(acctCode);
    //   return findAssetByCodeList;
    // },
    //
    GET_FIND_ASSET_NAME(state) {
      const findAssetName =state.findAssetName;
      return findAssetName;
    },


  },

  mutations,

  actions,

}
