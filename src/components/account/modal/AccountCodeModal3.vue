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
        :rows="accountCodeList"

        :search-options="{
        enabled: true,
        externalQuery: searchAccountCode,
         }"
        :select-options="{
        enabled: false,
        selectionInfoClass: 'custom-class',
      }"
        :pagination-options="{
        enabled: true,
        perPage:pageLength
      }"
        theme="black-rhino"

        @on-row-click="onRowSelected"
    >

      !-- pagination -->
      <template
          slot="pagination-bottom"
          slot-scope="props"
      >
        <div class="d-flex justify-content-between flex-wrap">
          <div>
            <b-pagination
                :value="1"
                :total-rows="props.total"
                :per-page="pageLength"
                first-number
                last-number
                align="right"
                prev-class="prev-item"
                next-class="next-item"
                class="mt-1 mb-0"
                @input="(value)=>props.pageChanged({currentPage:value})"
            >
              <template #prev-text>
                <feather-icon
                    icon="ChevronLeftIcon"
                    size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                    icon="ChevronRightIcon"
                    size="18"
                />
              </template>
            </b-pagination>
          </div>
        </div>
      </template>
    </vue-good-table>
  </div>

</template>

<script>
import { BButton, BFormInput, BTable } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { mapActions, mapMutations, mapState } from 'vuex'
import Vue from 'vue'

export default {
  components: {
    BTable,
    BButton,
    BFormInput,

  },
  directives: {
    Ripple,
  },
  props: ['condition'],
  data() {
    return {
      searchAccountCode: '',
      searchAccountName: '',
      columns: [
        {
          label: '계정코드',
          field: 'acctInnerCode',
        },
        {
          label: '계정이름',
          field: 'acctName',
        },
          ],
      value: {},
      pageLength: 10,


    }
  },

  computed: {
    ...mapState('account/base', ['accountCodeList']),

  },
  created() {
    const payload = {start:"0101", end:"0145"}
    this.FETCH_ACCOUNT_CODE_BETWEEN(payload)
  },

  // 모달창이 없어질떄 호출
  beforeDestroy() {
    this.CLEAR_CODE_LIST()
  },
  methods: {
    ...mapMutations('account/base', ['CLEAR_CODE_LIST']),
    ...mapActions('account/base', ['FETCH_ACCOUNT_CODE_BETWEEN','FETCH_ACCOUNT_CODE_LIST']),

    // 검색버튼
    searchCode() {
        if (this.searchAccountCode === '') {
          Vue.$toast.info('검색어를 입력해주세요')

          return
        }
        const searchCode = {
          accountCode: this.searchAccountCode,
          accountName: this.searchAccountCode,
        }
        this.FETCH_ACCOUNT_CODE(searchCode)
    },
    // 선택된 로우
    onRowSelected(selectedItem) {
      // if (this.condition === 'accountCode') {
      //   const { accountCode } = selectedItem[0]
      //   this.$emit('input', accountCode)
      //   const { accountName } = selectedItem[0]
      //   this.$emit('input', accountName)
      // }
      console.log("계정코드 선택"+ selectedItem.row)
      console.log("계정코드 선택 accountCode"+ selectedItem.row.acctName)
      console.log("계정코드 선택 accountInnerCode"+ selectedItem.row.acctInnerCode)
      const { acctInnerCode,acctName } = selectedItem.row
      this.value = { acctInnerCode,acctName }
      this.$emit('input', this.value)
    },

    advanceSearch3(val) {
      this.searchAccountCode = val},

  },



}
</script>

<style scoped>

</style>
