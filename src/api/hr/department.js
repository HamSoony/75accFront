/* eslint-disable import/prefer-default-export */

import { hrApi } from '../index'

function getDepartmentList(searchOption) {
    console.log(searchOption)
    return hrApi.get('/department/departments', {
        params: {
            ...searchOption,
        },
    })
}

export { getDepartmentList }
