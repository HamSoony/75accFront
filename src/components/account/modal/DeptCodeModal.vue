<template>

  <div>
    <b-form-input
        v-model="searchDeptCode"
        style="width : 84%; display : inline-flex"
        placeholder="부서코드입력"
    />

    <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        style=" float: right"
        @click="searchCode"
    >
      검색
    </b-button>

    <b-table
      :fields="fields"
      :items="departmentList"
      striped
      hover
      select-mode="single"
      selectable
      @row-selected="onRowSelected"
      />

  </div>

</template>

<script>
import {mapActions, mapMutations, mapState} from "vuex";

export default {
  name: "DeptCodeModal",

  data(){
    return{
      searchDeptCode: '',
      searchDeptName: '',
      fields: ['deptCode', 'deptName'],
      deptCode: '',
    }
  },

  computed: {
    /**
     * 이렇게 변수에 할당해서 사용한다면 위의 data에 선언필요 x
     */
    ...mapState('account/budget', ['budgetlist']),
    ...mapState('hr/department', ['departmentList']),
  },

  created() {
    const compCode = sessionStorage.getItem("CompanyCode")
    const wpCode = sessionStorage.getItem("WorkplaceCode")
    const payload = {compCode: compCode, wpCode: wpCode}
    this.GET_DEPARTMENT_LIST(payload)
  },

  methods:{
    // ...mapMutations('account/budget', ['']),
    ...mapActions('account/budget', ['']),
    ...mapActions('hr/department', ['GET_DEPARTMENT_LIST']),

    searchCode() {

    },
    onRowSelected(selectedItem) {
      console.log(selectedItem)
      this.deptCode = selectedItem[0].deptCode
      this.$emit('input', this.deptCode)
    },
  },

}
</script>

<style scoped>

</style>
