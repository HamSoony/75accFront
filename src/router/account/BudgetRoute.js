const BudgetRoute = [
    {
        path: '/acc/budget/budgetapplicationform',
        name: 'BudgetApplicationPage',
        component: () => import('@/views/account/budget/BudgetApplicationPage.vue'),
        meta: {
            pageTitle: '예산관리',
            breadcrumb: [
                {
                    text: '예산신청',
                    active: true,
                },
            ],
        },
    },
    {
        path: '/acc/budget/budgetingform',
        name: 'BudgetingPage',
        component: () => import('@/views/account/budget/BudgetingPage.vue'),
        meta: {
            pageTitle: '예산관리',
            breadcrumb: [
                {
                    text: '예산편성',
                    active: true,
                },
            ],
        },
    }
]
export default BudgetRoute
