<template>
  <div>
    <b-form-input
        v-model="searchAccountCode"
        style="width : 84%; display : inline-flex"
        placeholder="계정코드입력"
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
        striped
        hover
        select-mode="single"
        selectable
        :fields="fields"
        :items="assetTypeCodeList"
        :filter="searchAccountCode"
        @row-selected="onRowSelected"
    />
  </div>

</template>

<script>
import { BButton, BFormInput, BTable } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { mapActions, mapMutations, mapState } from 'vuex'
import Vue from 'vue'
import {fetchAccountCodeList} from "@/api/account/base";

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
      fields: ['acctCode', 'acctName'],
      value: {},

    }
  },

  computed: {
    ...mapState('account/base', ['accountList', 'assetTypeCodeList']),
  },
  created() {
    this.FETCH_ACCOUNT_CODE_LIST(),
        this.FETCH_ASSET_TYPE_CODE()
  },

  // 모달창이 없어질떄 호출
  beforeDestroy() {
    this.CLEAR_CODE_LIST()
  },
  methods: {
    ...mapMutations('account/base', ['CLEAR_CODE_LIST']),
    ...mapActions('account/base',
        ['FETCH_ACCOUNT_CODE','FETCH_ACCOUNT_CODE_LIST','FETCH_ASSET_TYPE_CODE']),

    // 검색버튼
    searchCode() {
      if (this.searchAccountCode === '') {
        Vue.$toast.info('검색어를 입력해주세요')

        return
      }
      const searchCode = {
        acctCode: this.searchAccountCode,
        acctName: this.searchAccountCode,
      }
      this.FETCH_ASSET_TYPE_CODE(searchCode)
    },
    // 선택된 로우
    onRowSelected(selectedItem) {
      const { acctCode, acctName } = selectedItem[0]
      this.value = { acctCode, acctName }
      this.$emit('input', this.value)
    },

  },



}
</script>

<style scoped>

</style>
