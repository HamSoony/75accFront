import {getDepartmentList} from "@/api/hr/department";

export default {
  async GET_DEPARTMENT_LIST({ commit }, searchOption) {
    try {
      const res = await getDepartmentList(searchOption)
      const departmentList = res.data.departments
      //console.log(res)
      commit('setDepartmentList', departmentList)

      // return res
    } catch (err) {
      throw new Error(err)
    }
  },
}
