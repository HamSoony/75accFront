<template>
  <div style="font-family: 'Franklin Gothic Demi'">
    <div class="custom-search">
  <h1>예산신청</h1>
      <b-row>
        <b-col md="4">
          <b-form-group>
            <label>부서명</label>
            <b-form-input
                v-model="deptCode"
                placeholder="Search"
                type="text"
                class="d-inline-block"
                @click="searchDeptCode"
            />
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group>
            <label>날짜</label>
            <b-form-input
                v-model="searchDate"
                placeholder="Search"
                type="date"
                class="d-inline-block"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-button
              variant="relief-primary"
              style="margin: 24px"
              @click="searchCostList"
          >
            조회
          </b-button>
        </b-col>
      </b-row>
    </div>
    <b-modal
    id="deptCode"
    title="부서 검색"
    >
      <p class="my-5">
        <DeptCodeModal
            v-model:value="deptCode"
            condition="deptCode"
        />
      </p>
    </b-modal>
    <!-- 예산테이블 -->
    <b-row>

      <b-col>
    <b-row>
      <b-col>
        <div class="table-container">
        <b-table
          :fields="budgetfields"
          :items="accountList"
          selectable
          select-mode="single"
          striped
          responsive
          hover
          @row-clicked="budgetCodeSelect"
          >
        </b-table>
        </div>
      </b-col>
    </b-row>
      </b-col>

      <!-- 예산 입력 및 확인-->
      <b-col>

        <b-row>
          <b-form-group>
            <b-card>
              <h2 style="font-size: 24px; font-weight: bold;">당기</h2>
              <b-row class="mb-sm-2">
                <b-col sm="1" class="text-sm-right"><b>1월</b></b-col>
                <b-col sm="2">
                  <b-form-input v-model="january"></b-form-input>
                </b-col>
                <b-col sm="1" class="text-sm-right"><b>2월</b></b-col>
                <b-col sm="2">
                  <b-form-input v-model="february"></b-form-input>
                </b-col>
                <b-col sm="1" class="text-sm-right"><b>3월</b></b-col>
                <b-col sm="2">
                  <b-form-input v-model="march"></b-form-input>
                </b-col>
                <b-col sm="1" class="text-sm-right"><b>1분기</b></b-col>
                <b-col sm="2">
                  <b-form-input disabled :value="firstQuarterTotal" ></b-form-input>
                </b-col>
              </b-row>

              <b-row class="mb-sm-2">
                <b-col sm="1" class="text-sm-right"><b>4월</b></b-col>
                <b-col sm="2">
                  <b-form-input v-model="april"></b-form-input>
                </b-col>
                <b-col sm="1" class="text-sm-right"><b>5월</b></b-col>
                <b-col sm="2">
                  <b-form-input v-model="may"></b-form-input>
                </b-col>
                <b-col sm="1" class="text-sm-right"><b>6월</b></b-col>
                <b-col sm="2">
                  <b-form-input v-model="june"></b-form-input>
                </b-col>
                <b-col sm="1" class="text-sm-right"><b>2분기</b></b-col>
                <b-col sm="2">
                  <b-form-input disabled :value="secondQuarterTotal"></b-form-input>
                </b-col>
              </b-row>

              <b-row class="mb-sm-2">
                <b-col sm="1" class="text-sm-right"><b>7월</b></b-col>
                <b-col sm="2">
                  <b-form-input v-model="july"></b-form-input>
                </b-col>
                <b-col sm="1" class="text-sm-right"><b>8월</b></b-col>
                <b-col sm="2">
                  <b-form-input v-model="august"></b-form-input>
                </b-col>
                <b-col sm="1" class="text-sm-right"><b>9월</b></b-col>
                <b-col sm="2">
                  <b-form-input v-model="september"></b-form-input>
                </b-col>
                <b-col sm="1" class="text-sm-right"><b>3분기</b></b-col>
                <b-col sm="2">
                  <b-form-input disabled :value="thirdQuarterTotal" ></b-form-input>
                </b-col>
              </b-row>

              <b-row class="mb-sm-2">
                <b-col sm="1" class="text-sm-right"><b>10월</b></b-col>
                <b-col sm="2">
                  <b-form-input v-model="october"></b-form-input>
                </b-col>
                <b-col sm="1" class="text-sm-right"><b>11월</b></b-col>
                <b-col sm="2">
                  <b-form-input v-model="november"></b-form-input>
                </b-col>
                <b-col sm="1" class="text-sm-right"><b>12월</b></b-col>
                <b-col sm="2">
                  <b-form-input v-model="december"></b-form-input>
                </b-col>
                <b-col sm="1" class="text-sm-right"><b>4분기</b></b-col>
                <b-col sm="2">
                  <b-form-input disabled :value="fourthQuarterTotal"></b-form-input>
                </b-col>
              </b-row>
        <b-row>
          <b-col sm="3" class="text-sm-right" ><b>합계</b></b-col>
          <b-col sm="4">
            <b-form-input disabled :value="QuarterTotal"></b-form-input>
          </b-col>
          <b-col sm="3" class="text-right">
            <b-button
                variant="relief-primary"
                @click="saveBudget"
            >
              저장
            </b-button>
          </b-col>
        </b-row>

            </b-card>
          </b-form-group>
        </b-row>

      <b-row>
        <b-form-group>
          <b-card>
            <h2 style="font-size: 24px; font-weight: bold;">전기</h2>
          <b-row class="mb-sm-2">
            <b-col sm="1" class="text-sm-right"><b>1월</b></b-col>
            <b-col sm="2">
              <b-form-input disabled v-model="oldJanuary"></b-form-input>
            </b-col>
            <b-col sm="1" class="text-sm-right"><b>2월</b></b-col>
            <b-col sm="2">
              <b-form-input disabled v-model="oldFebruary"></b-form-input>
            </b-col>
            <b-col sm="1" class="text-sm-right"><b>3월</b></b-col>
            <b-col sm="2">
              <b-form-input disabled v-model="oldMarch" ></b-form-input>
            </b-col>
            <b-col sm="1" class="text-sm-right"><b>1분기</b></b-col>
            <b-col sm="2">
              <b-form-input disabled :value="oldFirstQuarterTotal" ></b-form-input>
            </b-col>
          </b-row>

            <b-row class="mb-sm-2">
              <b-col sm="1" class="text-sm-right"><b>4월</b></b-col>
              <b-col sm="2">
                <b-form-input disabled v-model="oldApril"></b-form-input>
              </b-col>
              <b-col sm="1" class="text-sm-right"><b>5월</b></b-col>
              <b-col sm="2">
                <b-form-input disabled v-model="oldMay"></b-form-input>
              </b-col>
              <b-col sm="1" class="text-sm-right"><b>6월</b></b-col>
              <b-col sm="2">
                <b-form-input disabled v-model="oldJune"></b-form-input>
              </b-col>
              <b-col sm="1" class="text-sm-right"><b>2분기</b></b-col>
              <b-col sm="2">
                <b-form-input disabled :value="oldSecondQuarterTotal" ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="mb-sm-2">
              <b-col sm="1" class="text-sm-right"><b>7월</b></b-col>
              <b-col sm="2">
                <b-form-input disabled v-model="oldJuly"></b-form-input>
              </b-col>
              <b-col sm="1" class="text-sm-right"><b>8월</b></b-col>
              <b-col sm="2">
                <b-form-input disabled v-model="oldAugust"></b-form-input>
              </b-col>
              <b-col sm="1" class="text-sm-right"><b>9월</b></b-col>
              <b-col sm="2">
                <b-form-input disabled v-model="oldSeptember"></b-form-input>
              </b-col>
              <b-col sm="1" class="text-sm-right"><b>3분기</b></b-col>
              <b-col sm="2">
                <b-form-input disabled :value="oldThirdQuarterTotal" ></b-form-input>
              </b-col>
            </b-row>

            <b-row class="mb-sm-2">
              <b-col sm="1" class="text-sm-right"><b>10월</b></b-col>
              <b-col sm="2">
                <b-form-input disabled v-model="oldOctober"></b-form-input>
              </b-col>
              <b-col sm="1" class="text-sm-right"><b>11월</b></b-col>
              <b-col sm="2">
                <b-form-input disabled v-model="oldNovember"></b-form-input>
              </b-col>
              <b-col sm="1" class="text-sm-right"><b>12월</b></b-col>
              <b-col sm="2">
                <b-form-input disabled v-model="oldDecember"></b-form-input>
              </b-col>
              <b-col sm="1" class="text-sm-right"><b>4분기</b></b-col>
              <b-col sm="2">
                <b-form-input disabled :value="oldFourthQuarterTotal"></b-form-input>
              </b-col>
            </b-row>

            <b-row>
              <b-col sm="3" class="text-sm-right" ><b>합계</b></b-col>
              <b-col sm="4">
                <b-form-input disabled :value="oldQuarterTotal"></b-form-input>
              </b-col>
            </b-row>

            </b-card>
        </b-form-group>
        </b-row>

      </b-col>

    </b-row>
  </div>
</template>

<script>

import {
  BAvatar, BButton, BCol, BFormGroup, BFormInput, BFormSelect, BPagination, BRow, BTable,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import Vue from 'vue'
import DeptCodeModal from'../modal/DeptCodeModal.vue'
// eslint-disable-next-line import/extensions


export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BButton,
    // eslint-disable-next-line vue/no-unused-components
    BAvatar,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BRow,
    BCol,
    // eslint-disable-next-line vue/no-unused-components
    BTable,
    // eslint-disable-next-line vue/no-unused-components
    ToastificationContent,
    DeptCodeModal,
  },

  data() {
    return {
      budgetfields:[
        {key: 'acctInnerCode', label: '예산코드'},
        {key: 'acctName', label: '예산과목명'},
      ],
      columns: [
        {
          label: '예산코드',
          field: 'acctInnerCode',
        },
        {
          label: '예산과목명',
          field: 'acctName',
        },
      ],
      rows: [],
      searchTerm: '',
      searchDate: '',
      deptCode:'',
      budgetCode:'',
      selectMode: 'single',

      january: '', february: '', march: '',
      april: '', may: '', june: '',
      july: '', august: '', september: '',
      october: '', november: '', december: '',

      oldJanuary: '', oldFebruary: '', oldMarch: '',
      oldApril: '', oldMay: '', oldJune: '',
      oldJuly: '', oldAugust: '', oldSeptember: '',
      oldOctober: '', oldNovember: '', oldDecember: '',

    }
  },
  computed: {
    /**
     * 이렇게 변수에 할당해서 사용한다면 위의 data에 선언필요 x
     */
    ...mapState('account/budget', ['monthBudget']),
    ...mapState('account/base', ['accountList']),
    firstQuarterTotal() {
      return parseInt(this.january) + parseInt(this.february) + parseInt(this.march);
    },
    secondQuarterTotal() {
      return parseInt(this.april) + parseInt(this.may) + parseInt(this.june);
    },
    thirdQuarterTotal() {
      return parseInt(this.july) + parseInt(this.august) + parseInt(this.september);
    },
    fourthQuarterTotal() {
      return parseInt(this.october) + parseInt(this.november) + parseInt(this.december);
    },
    QuarterTotal(){
      return this.firstQuarterTotal+this.secondQuarterTotal+this.thirdQuarterTotal+this.fourthQuarterTotal
    },
    oldFirstQuarterTotal() {
      return parseInt(this.oldJanuary) + parseInt(this.oldFebruary) + parseInt(this.oldMarch);
    },
    oldSecondQuarterTotal() {
      return parseInt(this.oldApril) + parseInt(this.oldMay) + parseInt(this.oldJune);
    },
    oldThirdQuarterTotal() {
      return parseInt(this.oldJuly) + parseInt(this.oldAugust) + parseInt(this.oldSeptember);
    },
    oldFourthQuarterTotal() {
      return parseInt(this.oldOctober) + parseInt(this.oldNovember) + parseInt(this.oldDecember);
    },
    oldQuarterTotal(){
      return this.oldFirstQuarterTotal+this.oldSecondQuarterTotal+this.oldThirdQuarterTotal+this.oldFourthQuarterTotal
    },

  },

  created() {
    this.FETCH_ACCOUNT_CODE_LIST();
  },

  methods: {
    ...mapMutations('account/statement', ['CLEAR_COST_LIST']),
    ...mapActions('account/budget', ['FETCH_PREVIOUSYEARBUDGET_LIST', 'FETCH_CURRENTBUDGET_LIST']),
    ...mapActions('account/base', ['FETCH_ACCOUNT_CODE_LIST']),

    /**
     * 조회버튼
     * 204 상태를 서버에서 보내준다 ( NO-CONTNET) 검색시 아무것도 발견하지 못했을때
     * 유효성체크
     */
    async searchCostList() {
      if (this.searchDate === '') {
        Vue.$toast.info('검색일자를 정해주세요.')
        return
      } else if (this.deptCode === ''){
        Vue.$toast.info('부서를 선택해주세요.')
        return
      } else if (this.budgetCode === ''){
        Vue.$toast.info('예산코드를 선택해주세요.')
        return
      }
      const searchData = {
        reportDate: this.searchDate,
        deptCode: this.deptCode,
        acctInnerCode: this.budgetCode,
      }
      console.log(searchData)
      const response = await this.FETCH_PREVIOUSYEARBUDGET_LIST(searchData)
      if (response.status === 204) {
        Vue.$toast.info('검색결과가 존재하지 않습니다')
        this.CLEAR_COST_LIST()
      }

          this.oldJanuary = this.monthBudget[0].m1Budget
          this.oldFebruary = this.monthBudget[0].m2Budget
          this.oldMarch = this.monthBudget[0].m3Budget
          this.oldApril = this.monthBudget[0].m4Budget
          this.oldMay = this.monthBudget[0].m5Budget
          this.oldJune = this.monthBudget[0].m6Budget
          this.oldJuly = this.monthBudget[0].m7Budget
          this.oldAugust = this.monthBudget[0].m8Budget
          this.oldSeptember = this.monthBudget[0].m9Budget
          this.oldOctober = this.monthBudget[0].m10Budget
          this.oldNovember = this.monthBudget[0].m11Budget
          this.oldDecember = this.monthBudget[0].m12Budget
    },
    // 저장버튼
    async saveBudget(){
      const year = new Date(this.searchDate).getFullYear()
      const lastDigit = parseInt(year.toString().slice(-1))
      const acctPeriodNo = lastDigit + 2

      const budgetingCode = 1

      const workplaceCode = sessionStorage.getItem("WorkplaceCode")
      const deptCode = this.deptCode
      const acctInnerCode = this.budgetCode

      const m1Budget = this.january
      const m2Budget = this.february
      const m3Budget = this.march
      const m4Budget = this.april
      const m5Budget = this.may
      const m6Budget = this.june
      const m7Budget = this.july
      const m8Budget = this.august
      const m9Budget = this.september
      const m10Budget = this.october
      const m11Budget = this.november
      const m12Budget = this.december

      const saveBudgetDate = {acctPeriodNo, workplaceCode, deptCode, acctInnerCode, budgetingCode,
        m1Budget, m2Budget, m3Budget, m4Budget, m5Budget, m6Budget, m7Budget, m8Budget, m9Budget
      , m10Budget, m11Budget, m12Budget}
      console.log(saveBudgetDate)
     await this.FETCH_CURRENTBUDGET_LIST( saveBudgetDate )

    },
    searchDeptCode(){
      this.$root.$emit('bv::show::modal', 'deptCode', '#focusThisOnClose')
      console.log("부서검색모달 오픈")
    },
    budgetCodeSelect(selectData){
      console.log(selectData)
      this.budgetCode = selectData.acctInnerCode
    },
  },
}
</script>

<style lang="css">

.table-container {
  height: 800px; /* 스크롤 영역의 높이 */
  overflow-y: auto; /* 수직 스크롤 생성 */
}

</style>
