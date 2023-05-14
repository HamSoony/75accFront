import { $themeConfig } from '@themeConfig'
import axios from 'axios'
import {hrApi, sys} from '@/api'

export default {
  namespaced: true,
  state: {
    companyList: [],
    workplaceList: [],
    isVerticalMenuCollapsed: $themeConfig.layout.menu.isCollapsed,
  },
  getters: {},
  mutations: {
    getCompanyCode(state, response) {
      state.companyList = response.data
      console.log("컴퍼니코드리스트",state.companyList)
    },
    getWorkplaceCode(state, response) {
      state.workplaceList = response.data
      console.log("워크플레이스코드",state.workplaceList)
    },
  },
  actions: {
    async GET_COMPANY_CODE({ commit }) {
      console.log(123213213)
      const response = await hrApi.get('/company/searchCompany') // http://localhost:8282/hr/company/searchCompany
      console.log(response)
      commit('getCompanyCode', response)
    },

    async GET_WORKPLACE_CODE({ commit }, payload) {
      console.log("payload",payload)
      if (payload !== '') {
        const response = await hrApi.get('/workplace/searchWorkplace', {
          params: {
            companyCode: payload,
          },
        })
        commit('getWorkplaceCode', response)
      }
    },
    async AUTHORITY_REQUEST(_, payload) {
      const {
        compCode, wpCode, userId, userPassword,
      } = payload
      const { data } = await sys.post('/login', {
        compCode,
        wpCode,
        userId,
        userPassword,
      })
      console.log("logindata",data)
      return data
    },
  },
}
