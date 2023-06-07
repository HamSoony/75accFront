import { accountApi } from '@/api'

const ACCOUNT_URL = '/accountledger'
const ACCOUNT_CODE_URL = '/account'
const CUSTOMER_URL = '/customer'
const CURRENT_ASSET_LIST_URL = '/currentAsset/assetList'
const CURRENT_ASSET_CODE_LIST_URL = '/account/account/accountList'
const FIND_CURRENT_ASSET_BY_CODE_LIST = '/currentAsset/findAssetByCodeList'
const FIND_CURRENT_ASSET_NAME = '/currentAsset/findAssetName'


/**
 * 자산 전체조회
 * @param assetList
 * @returns {*}
 */
function fetchCurrentAssetList() {
    return accountApi.get(`${CURRENT_ASSET_LIST_URL}`)
}

/**
 * 자산 조건(acctCode) 조회
 * @param
 * @returns {*}
 */
function fetchFindAssetByCodeList(acctCode) {
    return accountApi.get(`/currentAsset/findAssetByCodeList`, acctCode)
}

/**
 * 자산 조건(assetName) 조회
 * @param
 * @returns {*}
 */
function fetchFindAssetByNameList(assetName) {
    console.log(assetName)
    const data = accountApi.get("/currentAsset/findAssetName", {
        params:
            assetName,
    })
    console.log(data)
    return data
}

/**
 * 부서 (department) 조회
 * @param
 * @returns {*}
 */
function fetchFindAssetByDepartment(department) {
    console.log(department)
    const data = accountApi.get("/currentAsset/findDepartment", {
        params:
        department,
    })
    console.log(data)
    return data
}

/**
 * 취득일자 (progress) 조회
 * @param
 * @returns {*}
 */
function fetchFindAssetByProgress(progress) {
    console.log(progress)
    const data = accountApi.get("/currentAsset/findProgress", {
        params:
        progress,
    })
    console.log(data)
    return data
}

/**
 * 자산분류 코드(acctCode) 조회
 * @param
 * @returns {*}
 */
function fetchFindAssetByAcctCode(acctCode) {
    console.log(acctCode)
    const data = accountApi.get("/currentAsset/findAcctCode", {
        params:
        acctCode,
    })
    console.log(data)
    return data
}

/**
 * 자산분류코드 전체조회
 * @param assetTypeCode
 * @returns {*}
 */
function fetchAssetTypeCode() {
    return accountApi.get("/currentAsset/assetTypeCode")
}
/**
 * 자산 등록
 * @param newAsset
 * @returns {*}
 */
function saveAsset(data){
    console.log("api  : ")
    console.log( 'NEW :'+ data)
    return accountApi.post('/currentAsset/saveAsset', data)
}



/**
 * 계정코드 조건에 따라 조회
 * @param searchCode
 * @returns {*}
 */
function fetchAccountCode(searchCode) {
    return accountApi.get(`/account/accountList`)
}

/**
 * 계정코드 조건에 따라 조회
 * @param searchCode
 * @returns {*}
 */
function fetchAccountCodeBetween(payload) {
    return accountApi.get(`/account/between`,
        {
            params:{
                start:payload.start,
                end:payload.end
            }
        })
}

/**
 * 계정코드 전체조회
 * @param searchCode
 * @returns {*}
 */
function fetchAccountCodeList() {
    return accountApi.get(`${ACCOUNT_CODE_URL}/accountList`)
}


/**
 * 계정과목관리
 */
function fetchAccountSubjectList() {
    return accountApi.get(`${ACCOUNT_CODE_URL}/accountCodes`)
}


/**
 * 계정코드삭제
 * @param accountCode
 * @returns {*}
 */
function deleteAccountCode(accountInnerCode) {
    console.log(accountInnerCode)
    return accountApi.delete(`${ACCOUNT_CODE_URL}/${accountInnerCode}`)
}

/**
 * 계정과목 등록  requsetBody에 날라가 바로 bean에 맵핑되게 했다.
 * @param accountCode
 * @returns {*}
 */
function addAccountCode(accountCode) {
    return accountApi.post(`${ACCOUNT_CODE_URL}/accountCodes`, accountCode)
}


/**
 * 계정별원장
 */
function fetchAccountLedger(searchCode) {
    console.log(searchCode)
    const { accountCode, startDate, endDate } = searchCode
    return accountApi.get(`${ACCOUNT_URL}/${accountCode}`,
        {
            params: {
                startDate,
                endDate,
            },
        })
}

/**
 * 총계정원장
 */
function fetchGeneralAccountLedger(searchCode) {
    const { startDate, endDate } = searchCode
    return accountApi.get(`${ACCOUNT_URL}/accountledgerlist`,
        {
            params: {
                startDate,
                endDate,
            },
        })
}

/**
 * 고객사조회
 * @returns {*}
 */
function fetchAccountCustomerCode() {
    let workPlaceCode = sessionStorage.getItem('WorkplaceCode')
    return accountApi.get('customer/customerList', {
        params: {
            workPlaceCode
        }
    })
}
/**
 * 컨트롤 코드조회
 * @returns {*}
 */
function fetchAccountControllCode() {
    return accountApi.get('/base/accountControllerCodes')
}

/**
 * 거래처조회 임시
 */
function searchCustomerInfoList() {
    return accountApi.get(`${CUSTOMER_URL}/customers`)
}


function deleteCustomerCode(id){
    console.log(id)
    return accountApi.delete(`${CUSTOMER_URL}/customer`,
        {
            params:{id}
        })
}

function saveCustomer(newCustomer){
    console.log("api  : ")
    console.log(newCustomer)
    return accountApi.post(`${CUSTOMER_URL}/customer`,newCustomer)
}

export {
    fetchAccountCode,
    fetchAccountCustomerCode,
    fetchAccountControllCode,
    fetchAccountLedger,
    fetchGeneralAccountLedger,
    fetchAccountCodeList,
    deleteAccountCode,
    addAccountCode,
    searchCustomerInfoList,
    deleteCustomerCode,
    saveCustomer,
    fetchAssetTypeCode,
    fetchFindAssetByDepartment,
    fetchFindAssetByProgress,
    fetchFindAssetByAcctCode,
    saveAsset,
    fetchCurrentAssetList,
    fetchFindAssetByCodeList,
    fetchFindAssetByNameList,
    fetchAccountSubjectList,
    fetchAccountCodeBetween
}
