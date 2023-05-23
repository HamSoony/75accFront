const BudgetRoute = [
    {
        path: '/acc/budget/budgetapplicationform',
        name: 'BudgetApplicationPage',
        component: () => import('@/views/account/budget/BudgetApplicationPage.vue'),
        meta: {
            pageTitle: '예산관리',
            breadcrumb: [
                {
                    text: '예산신청입력',
                    active: true,
                },
            ],
        },
    }
]
export default BudgetRoute
