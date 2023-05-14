const assetRoute = [
  {
    path: '/acc/asset/assetSearch',
    name: 'assetSearch',
    component: () => import('@/views/account/asset/AssetSearch.vue'),
    meta: {
      pageTitle: '고정자산',
      breadcrumb: [
        {
          text: '고정자산조회',
          active: true,
        },

      ],
    },
  },
  {
    path: '/acc/asset/assetInput',
    name: 'assetInput',
    component: () => import('@/views/account/asset/AssetInput.vue'),
    meta: {
      pageTitle: '고정자산',
      breadcrumb: [
        {
          text: '고정자산등록',
          active: true,
        },

      ],
    },
  },
]
export default assetRoute