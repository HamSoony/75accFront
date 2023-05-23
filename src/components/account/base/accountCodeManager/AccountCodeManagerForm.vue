<template>
  <div style="font-family: '배달의민족 도현">

    <div>
      <b-row >
          <b-col>
            <b-form-select
                v-model="selectedAcctName"
                :options="GET_ACCOUNT_LEDER_TREE_LIST"
                style="width: 200px "
                @change="selectedCode"
            >
            </b-form-select>
          </b-col>

        <b-col class="pb-2" >
          <b-button-group style="float: right">
          <b-button
              variant="primary"
              @click="addAccountCode" >
            추가
          </b-button>
          <b-button
              variant="primary"
              @click="updateModal">
            수정
          </b-button>
          <b-button
              variant="primary"
              @click="removeAccountCode">
            삭제
          </b-button>
          </b-button-group>
        </b-col>

      </b-row>
    </div>

    <div>
      <vue-good-table
          ref="myTable"
          :columns="columns"
          :rows="filterAccountCodeList"
          :fixed-header="true"
          max-height="600px"
          :select-options="{ enabled: true }"

      >
<!--        <div slot="table-actions">-->
<!--          <button @click="addAccountCode">-->
<!--            추가-->
<!--          </button>-->
<!--          <button @click="updateModal">-->
<!--            수정-->
<!--          </button>-->
<!--          <button @click="removeAccountCode">-->
<!--            삭제-->
<!--          </button>-->

<!--        </div>-->
      </vue-good-table>
      <div />
      <div />
    </div>
    <b-modal
        id="AccountControllCode"
        ref="accountModal"
        title="계정코드추가"
        @ok="addNewAccountCode"
    >
    <div >
      <label for="input-small">계정과목명</label>
      <b-form-input
          id="input-small"
          v-model="newAcctName"
          size="default"
          placeholder="계정과목명"
      />

      <label for="input-small" class="mt-1">성격</label>
      <b-form-input
          id="input-small"
          v-model="newAcctCharacter"
          size="default"
          placeholder="성격"
      />
    </div>
    </b-modal>

    <b-modal
        id="AccountUpdate"
        ref=""
        title="계정과목수정"
        @ok="updateAccountCode"
    >

      <label for="input-small">계정과목명</label>
      <b-form-input
          id="input-small"
          v-model="newAcctName"
          size="default"
      />

      <label for="input-small" class="mt-1">성격</label>
      <b-form-input
          id="input-small"
          v-model="newAcctCharacter"
          size="default"
      />

    </b-modal>

  </div>
</template>

<script>

import {
  BAvatar, BFormSelect, BTable, BFormInput,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapActions, mapGetters, mapState } from 'vuex'

// eslint-disable-next-line import/extensions
import Vue from 'vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components

    // eslint-disable-next-line vue/no-unused-components
    BAvatar,
    BFormInput,
    BFormSelect,

    // eslint-disable-next-line vue/no-unused-components
    BTable,

    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
  },

  data() {
    return {
      pageLength: 10,

      columns: [

        {
          label: '계정과목코드',
          field: 'acctInnerCode',
        },
        {
          label: '계정과목명',
          field: 'acctName',
        },
        {
          label: '성격',
          field: 'acctCharacter',
        },

      ],
      selectedAcctName: null,
      filterAccountCodeList: [],
      acctInnerCode: '',
      parentAcctInnerCode:'',
      groupCode:'',
      newAcctName: '',
      newAcctCharacter: '',
      selectMode: 'single',


    }
  },
  computed: {
    /**
     * 이렇게 변수에 할당해서 사용한다면 위의 data에 선언필요 x
     */
    ...mapState('account/base', [ 'accountSubjectList']),
    ...mapGetters('account/base', ['GET_ACCOUNT_LEDER_TREE_LIST']),

  },
  /**
   * 컴포넌트가 사라질때 호출되는 훅
   */
  created() {
    this.FETCH_ACCOUNT_SUBJECT_LIST()
  },

  methods: {
    ...mapActions('account/base', ['FETCH_ACCOUNT_SUBJECT_LIST',
      'DELETE_ACCOUNT_CODE', 'ADD_ACCOUNT_CODE', 'UPDATE_ACCOUNT_CODE']),

    /**
     *
     * 안내문구 클릭시 alert창을 띄워서 처리
     * 상위항목의 accountInnerCode를 통해  하위항목 계정코드를 찾을수가 있다.
     * @param value
     */
    selectedCode(value) {
      if (!value) {
        alert('선택된값이 없습니다.')
        return
      }
      // console.log(value)
      const [firstNo, lastNo] = value.acctInnerCode.split('-')

      this.filterAccountCodeList = this.accountSubjectList.filter(v => v.acctInnerCode >= firstNo && v.acctInnerCode <= lastNo)

      console.log(this.filterAccountCodeList)
    },
    /**
     * 추가  모달창을 띄우는 역할
     */
    addAccountCode() {
      if (this.filterAccountCodeList.length === 0) {
        alert('어디에 선택하실지 정해주세요')
        return
      }
      this.$root.$emit('bv::show::modal', 'AccountControllCode', '#focusThisOnClose')
      console.log('추가')
    },

    updateModal(){
      const selectCodeName = this.$refs.myTable.selectedRows.map(v => v.acctName)
      const selectCodeCharacter = this.$refs.myTable.selectedRows.map(v => v.acctCharacter)
      this.newAcctName = selectCodeName[0]
      this.newAcctCharacter = selectCodeCharacter[0]
      this.$root.$emit('bv::show::modal', 'AccountUpdate', '#focusThisOnClose')
    },


    // newCode 맨 앞의 숫자가 0이면 공백으로 처리하기 때문에 0을 살려주는 함수
    numberPad(str, width) {
      // eslint-disable-next-line no-param-reassign
      str = str.toString()
      return str.length >= str
          ? str
          : new Array(width - str.length + 1).join('0') + str
    },
    /**
     * 모달창 ok 눌렀을때  , slice는 원본배열을 가만히 나둠
     */
    async addNewAccountCode() {
      if (this.newAcctName === '' && this.newAcctCharacter === '') {
        alert('모든 항목을 입력하세요')
        return
      }
      const {
        acctInnerCode, parentAcctInnerCode, acctDivision, groupCode
      } = this.filterAccountCodeList.slice(-1)[0]

      const newData = {
        acctInnerCode: this.numberPad(Number(acctInnerCode) + 1, 4),
        parentAcctInnerCode: parentAcctInnerCode,
        acctCode: this.numberPad(Number(acctInnerCode) + 1, 4),
        acctName: this.newAcctName,
        acctCharacter: this.newAcctCharacter,
        acctDivision, groupCode,
      }
      const response = await this.ADD_ACCOUNT_CODE(newData)
      if (response.status === 200) {
        // alert(response.data.errorMsg)
        alert("등록되었습니다")
        this.filterAccountCodeList.push(newData)
      } else {
        alert('등록에 실패하셨습니다')
      }
      this.newAcctName = ''
      this.newAcctCharacter = ''
    },
    /**
     * 삭제
     *  $refs.[ref 명].selectedRows로 체크한 행을 가져올수있다!
     */
    async removeAccountCode() {
      if (this.$refs.myTable.selectedRows.length === 0) {
        Vue.$toast.info('삭제할 항목을 선택하세요')
        return
      }
      // eslint-disable-next-line no-restricted-globals
      if (!confirm('정말로 삭제하시겠습니까?')) {
        return
      }
      const deleteCodeList = this.$refs.myTable.selectedRows.map(v => v.acctInnerCode)
      const updateList = await this.DELETE_ACCOUNT_CODE(deleteCodeList)
      alert(`계정과목코드 ${deleteCodeList.join(',')} 삭제되었습니다`)

      this.filterAccountCodeList=this.filterAccountCodeList.filter(item => !deleteCodeList.includes(item.acctInnerCode));

    },

    //계정과목수정
    async updateAccountCode(){

      const {
        acctInnerCode, parentAcctInnerCode, acctCode, acctDivision,
      } = this.filterAccountCodeList.slice(-1)[0]

      const updateData = {
        acctInnerCode: acctInnerCode,
        parentAcctInnerCode: parentAcctInnerCode,
        acctCode: acctCode,
        acctName: this.newAcctName,
        acctCharacter: this.newAcctCharacter,
        acctDivision: acctDivision
      }
      const response = await this.UPDATE_ACCOUNT_CODE(updateData)
      if (response.status === 200) {
        alert("수정되었습니다")
        //this.filterAccountCodeList.push(updateData)
        const lastIndex = this.filterAccountCodeList.length - 1;
        this.$set(this.filterAccountCodeList, lastIndex, updateData);

      } else {
        alert('다시 입력해주세요')
      }
      this.newAcctName = ''
      this.newAcctCharacter = ''

    }

  },
}
</script>
<style lang="css">

</style>
