import { $themeConfig } from '@themeConfig'
import router from '@/router/index'
import mutations from '@/store/hr/affair/mutation'
import company from './company/state'
import emp from './affair/state'
import department from './department/state'

export default {
  namespaced: true,
  modules: {
    emp,
    company,
    department
  },
  state: {
    connect: false,
  },
  getters: {
  },

  mutations,

/*  mutations: {
    login(state) {
      state.connect = true
      console.log('뮤테이션')
      router.push({ name: 'home' })
    },
  },
  modules: {
    company,
  },
  }, */
}
