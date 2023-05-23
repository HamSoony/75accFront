
import { accountApi } from '@/api'

// Api
const BUDGET_URL = '/budget'

function fetchDetailPreviousyeBudget({ reportDate, deptCode, acctInnerCode}) {
    return accountApi.get(`${BUDGET_URL}/pybudgetstatus`, {
        params: {
            reportDate,
            deptCode,
            acctInnerCode,
        },
    })
}

function fetchsaveBudget(saveBudgetDate){
    return accountApi.post(`${BUDGET_URL}/saveBudget`, saveBudgetDate)
}


export {
    fetchDetailPreviousyeBudget,fetchsaveBudget
}
