import AccountRoute from './AccountRoute'
import StatementRoute from './StatementRoute'
import assetRoute from './assetRoute'
import BudgetRoute from './BudgetRoute'

const ERP = '/account'
const accountRouter = [

  {
    path: `${ERP}/home`,
    name: 'accountHome',
    component: () => import('@/views/account/Home.vue'),
    meta: {
      pageTitle: 'ACC',
      breadcrumb: [
        {
          text: 'ACC Home',
          active: true,
        },
      ],
    },
  },
  {
    path: '/account-page',
    name: 'account-page',
    component: () => import('@/views/SecondPage.vue'),
    meta: {
      pageTitle: 'Second Page',
      breadcrumb: [
        {
          text: 'Second Page',
          active: true,
        },
      ],
    },
  },


  // 계정과목관리
  {
    path: '/acc/base/accountCodeManager',
    name: 'accountCodeManager',
    // eslint-disable-next-line import/no-unresolved
    component: () => import('@/views/account/base/AccountCodeManagerPage.vue'),
    meta: {
      pageTitle: '계정과목관리',
      breadcrumb: [
        {
          text: '기초정보관리',
          active: true,
        },
        {
          text: '계정과목관리',
          active: true,
        },
      ],
    },
  },

  {
    path: '/acc/base/customerManager',
    name: 'customerManager',
    component: () => import('@/views/account/base/CustomerManagerPage.vue'),
    meta: {
      pageTitle: '거래처관리',
      breadcrumb: [
        {
          text: '기초정보관리',
          active: true,
        },
        {
          text: '거래처관리',
          active: true,
        },
      ],
    },
  },
  ...AccountRoute,
  ...StatementRoute,
  ...assetRoute,
  ...BudgetRoute
]
export default accountRouter
