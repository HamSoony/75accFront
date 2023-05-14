<template>
  <div>

    <b-col md="10">
      <b-form-group
          label="검색"
          label-for="label"
      >

        <b-form-input
            id="label"
            placeholder="Search"
            type="text"
            class="d-inline-block"
            @input="advanceSearch3"
        />
      </b-form-group>
    </b-col>

    <vue-good-table
        :columns="columns"
        :rows="departmentList"

        :search-options="{
        enabled: true,
        externalQuery: searchCustomerCode,
         }"
        :select-options="{
        enabled: false,
        selectionInfoClass: 'custom-class',
      }"
        theme="black-rhino"

        @on-row-click="onRowSelected"
    >

      !-- pagination -->
      <template
          slot="pagination-bottom"
          slot-scope="props"
      >
      </template>
    </vue-good-table>
  </div>

</template>

<script>
import { BButton, BTable } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  components: {
    BTable,
    BButton,

  },

  directives: {
    Ripple,
  },
  data() {
    return {
      columns: [
        {
          label: '부서 코드',
          field: 'deptCode',
        },
        {
          label: '부서 이름',
          field: 'deptName',
        },
      ],
      searchCustomerCode: '',
      searchCustomerName: '',
      value:{}
    }
  },
  computed: {
    ...mapState('hr/department', ['departmentList']),

  },
  created() {
    const compCode = sessionStorage.getItem("CompanyCode")
    const wpCode = sessionStorage.getItem("WorkplaceCode")
    const payload = {compCode: compCode, wpCode: wpCode}
    this.GET_DEPARTMENT_LIST(payload)
  },
  // 모달창이 없어질떄 호출
  beforeDestroy() {

  },
  methods: {
    ...mapMutations('account/base', ['CLEAR_CUSTOMER_CODE_LIST']),
    ...mapActions('hr/department', ['GET_DEPARTMENT_LIST']),

    // 전체검색
    searchCustomerCode() {
      this.GET_DEPARTMENT_LIST()
    },
    // 테이블 선택한 아이템 가져오기
    onRowSelected(selectedItem) {

      console.log("deptdata",selectedItem)
      const { deptCode,deptName } = selectedItem.row
      this.value = { deptCode,deptName }
      console.log("this.value",this.value)
      this.$emit('input', this.value)
    },

    advanceSearch3(val) {
      this.searchCustomerCode = val
    },



  },

}
</script>

<style scoped>

</style>
