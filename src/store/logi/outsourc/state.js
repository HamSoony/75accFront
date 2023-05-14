import mutations from './mutation'
import actions from './action'

export default {
    namespaced: true,
    state: {
        estimateList: [],
        estimateDetailList: [],
        grid: [],
        detailGrid: [],
        tableColumns: [],
        detailTableColumns: [],
        editEstimateDetail: [],
        outsourceGrid:[],
        outsourceInfoGrid:[],
        outFowardInfoGrid:[],
        inspectionInfo:[],
    },
    getters: {
    },

    mutations,

    actions,

}
