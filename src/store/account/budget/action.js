import {
    fetchDetailPreviousyeBudget,fetchsaveBudget

} from '@/api/account/budget'

export default {

    async FETCH_PREVIOUSYEARBUDGET_LIST({ commit },searchData) {
        try {
            const response = await fetchDetailPreviousyeBudget(searchData)
            console.log(response.data)

             commit('SET_PREVIOUSYEARBUDGET_LIST', response.data.RESULT)
             return response
        } catch (err) {
            throw new Error(err)
        }
    },

    async FETCH_CURRENTBUDGET_LIST({ commit },saveBudgetDate ){
        try {
            console.log(saveBudgetDate)
            const response = await fetchsaveBudget(saveBudgetDate)
            return response
        } catch (err) {
            throw new Error(err)
        }
    },
}
