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
        :rows="accountCustomerList"

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
          label: 'customerCode',
          field: 'customerCode',
        },
        {
          label: 'customerName',
          field: 'customerName',
        },
      ],
      searchCustomerCode: '',
      searchCustomerName: '',
      value:{}
    }
  },
  computed: {
    ...mapState('account/base', ['accountCustomerList']),

  },
  created() {
  this.FETCH_ACCOUNT_CUSTOMER_CODE()
  },
  // 모달창이 없어질떄 호출
  beforeDestroy() {
    this.CLEAR_CUSTOMER_CODE_LIST()
  },
  methods: {
    ...mapMutations('account/base', ['CLEAR_CUSTOMER_CODE_LIST']),
    ...mapActions('account/base', ['FETCH_ACCOUNT_CUSTOMER_CODE']),

    // 전체검색
    searchCustomerCode() {
      this.FETCH_ACCOUNT_CUSTOMER_CODE()
    },
    // 테이블 선택한 아이템 가져오기
    onRowSelected(selectedItem) {

      console.log("selectedItem",selectedItem)
      const cterCode = selectedItem.row.customerCode
      const cterName = selectedItem.row.customerName
      this.value = { "cterCode":cterCode,"cterName":cterName }
      console.log("value",this.value)
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
