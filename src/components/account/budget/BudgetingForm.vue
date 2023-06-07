<template>
  <div style="font-family: 'Franklin Gothic Demi'">
    <div class="custom-search">
      <h1> {{year}}년 예산편성</h1>
      <b-row>
        <b-col mb="3">
          <b-form-group>
            <label>예산코드</label>
            <b-form-input
                v-model="searchBudgetCode"
                placeholder="Search"
                type="text"
                class="d-inline-block"
            />
          </b-form-group>
        </b-col>
        <b-col mb="3">
          <b-button
              variant="relief-primary"
              style="margin: 24px"
          >
            검색
          </b-button>
        </b-col>
        <b-col mb="3">
          <b-form-group >
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
        <b-col mb="3">
          <b-button
              variant="relief-primary"
              style="margin: 24px"
              @click="searchCostList"
          >
            예산신청내역 조회
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
                  :filter="searchBudgetCode"
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
              <h2 style="font-size: 24px; font-weight: bold;">당기예산편성</h2>
              <b-row >
                <div class="d-flex flex-wrap">
                  <div
                      v-for="(month, index) in months"
                      :key="index"
                      class="col-12 col-md-4 d-flex align-items-center justify-content-start mb-1 mb-md-1"
                  >
                    <div class="d-flex align-items-center">
                      <b-form-input
                          :placeholder="month"
                          class="mr-2"
                          v-model="monthsData[index]"
                          :value="monthsData[index]"
                      />
                      <label style="font-size: 15px; white-space: nowrap;">{{ month }}</label>
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-wrap">
                <div v-for="(quarter, index) in quarters"
                     :key="index"
                     class=" col-12 col-md-3 d-flex align-items-center justify-content-start mb-1 mb-md-1"
                >
                  <b-form-input
                      disabled
                      class="mr-2"
                      :value="quarterTotals[index]"
                  />
                  <label style="font-size: 15px; white-space: nowrap;">{{ quarter }}</label>
                </div>
                </div>
              </b-row>


              <b-row class="align-items-center justify-content-center">
                <b-col sm="4" >
                  <b-form-input disabled :value="QuarterTotal" />
                </b-col>
                <b-col sm="2" class="text-right"><b>합계</b></b-col>
                <b-col sm="3" class="text-right">
                  <b-button variant="relief-primary" @click="saveBudget">
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
              <h2 style="font-size: 24px; font-weight: bold;">당기예산신청 내역</h2>
              <b-row >
                <div class="d-flex flex-wrap">
                  <div
                      v-for="(month, index) in months"
                      :key="index"
                      class="col-12 col-md-4 d-flex align-items-center justify-content-start mb-1 mb-md-1"
                  >
                    <div class="d-flex align-items-center">
                      <b-form-input
                          disabled
                          :placeholder="month"
                          class="mr-2"
                          v-model="oldMonthsData[index]"
                          :value="oldMonthsData[index]"
                      />
                      <label style="font-size: 15px; white-space: nowrap;">{{ month }}</label>
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-wrap">
                  <div v-for="(quarter, index) in quarters"
                       :key="index"
                       class=" col-12 col-md-3 d-flex align-items-center justify-content-start mb-1 mb-md-1"
                  >
                    <b-form-input
                        disabled
                        class="mr-2"
                        :value="oldquarterTotals[index]"
                    />
                    <label style="font-size: 15px; white-space: nowrap;">{{ quarter }}</label>
                  </div>
                </div>
              </b-row>
                <b-row class="align-items-center justify-content-center">
                  <b-col sm="4" >
                    <b-form-input disabled :value="oldQuarterTotal" />
                  </b-col>
                  <b-col sm="2" class="text-right"><b>합계</b></b-col>
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
      year: '',

      monthsData: { january: '', february: '', march: '',
      april: '', may: '', june: '',
      july: '', august: '', september: '',
      october: '', november: '', december: ''},

      oldMonthsData: { oldJanuary: '', oldFebruary: '', oldMarch: '',
      oldApril: '', oldMay: '', oldJune: '',
      oldJuly: '', oldAugust: '', oldSeptember: '',
      oldOctober: '', oldNovember: '', oldDecember: ''},

      months: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
      quarters: ['1분기', '2분기', '3분기', '4분기' ],
      searchBudgetCode: '',
    }
  },
  computed: {
    /**
     * 이렇게 변수에 할당해서 사용한다면 위의 data에 선언필요 x
     */
    ...mapState('account/budget', ['monthBudget']),
    ...mapState('account/base', ['accountList']),

    quarterTotals() {
      const quarterTotals = [];
      for (let i = 0; i < this.quarters.length; i++) {
        const selectedQuarter = this.quarters[i];
        if (selectedQuarter === '1분기') {
          quarterTotals.push(
              parseInt(this.monthsData[0]) + parseInt(this.monthsData[1]) + parseInt(this.monthsData[2])
          );
        } else if (selectedQuarter === '2분기') {
          quarterTotals.push(
              parseInt(this.monthsData[3]) + parseInt(this.monthsData[4]) + parseInt(this.monthsData[5])
          );
        } else if (selectedQuarter === '3분기') {
          quarterTotals.push(
              parseInt(this.monthsData[6]) + parseInt(this.monthsData[7]) + parseInt(this.monthsData[8])
          );
        } else if (selectedQuarter === '4분기') {
          quarterTotals.push(
              parseInt(this.monthsData[9]) + parseInt(this.monthsData[10]) + parseInt(this.monthsData[11])
          );
        } else {
          quarterTotals.push(0);
        }
      }
      return quarterTotals;
    },
    QuarterTotal() {
      let total = 0;
      for (let i = 0; i < 12; i++) {
        total += parseInt(this.monthsData[i]);
      }
      return total;
    },
    oldquarterTotals() {
      const quarterTotals = [];
      for (let i = 0; i < this.quarters.length; i++) {
        const selectedQuarter = this.quarters[i];
        if (selectedQuarter === '1분기') {
          quarterTotals.push(
              parseInt(this.oldMonthsData[0]) + parseInt(this.oldMonthsData[1]) + parseInt(this.oldMonthsData[2])
          );
        } else if (selectedQuarter === '2분기') {
          quarterTotals.push(
              parseInt(this.oldMonthsData[3]) + parseInt(this.oldMonthsData[4]) + parseInt(this.oldMonthsData[5])
          );
        } else if (selectedQuarter === '3분기') {
          quarterTotals.push(
              parseInt(this.oldMonthsData[6]) + parseInt(this.oldMonthsData[7]) + parseInt(this.oldMonthsData[8])
          );
        } else if (selectedQuarter === '4분기') {
          quarterTotals.push(
              parseInt(this.oldMonthsData[9]) + parseInt(this.oldMonthsData[10]) + parseInt(this.oldMonthsData[11])
          );
        } else {
          quarterTotals.push(0);
        }
      }
      return quarterTotals;
    },
    oldQuarterTotal(){
      let total = 0;
      for (let i = 0; i < 12; i++) {
        total += parseInt(this.oldMonthsData[i]);
      }
      return total;
    },
  },

  created() {
    this.FETCH_ACCOUNT_CODE_LIST();
    //오늘 날짜 구하기
      const today = new Date();
      const year = today.getFullYear();
      this.year = year
      const month = (today.getMonth() + 1).toString().padStart(2, '0');
      const day = today.getDate().toString().padStart(2, '0');
      this.searchDate = `${year}-${month}-${day}`;
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
      if (this.deptCode === ''){
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
      console.log(response)

      if (response.status === 200) {
        Vue.$toast.info('당기신청 내역 조회완료')
      }else{
        Vue.$toast.info('검색결과가 존재하지 않습니다')
        this.CLEAR_COST_LIST()
      }

      this.oldMonthsData[0] = this.monthBudget[0].m1Budget
      this.oldMonthsData[1] = this.monthBudget[0].m2Budget
      this.oldMonthsData[2] = this.monthBudget[0].m3Budget
      this.oldMonthsData[3] = this.monthBudget[0].m4Budget
      this.oldMonthsData[4] = this.monthBudget[0].m5Budget
      this.oldMonthsData[5] = this.monthBudget[0].m6Budget
      this.oldMonthsData[6] = this.monthBudget[0].m7Budget
      this.oldMonthsData[7] = this.monthBudget[0].m8Budget
      this.oldMonthsData[8] = this.monthBudget[0].m9Budget
      this.oldMonthsData[9] = this.monthBudget[0].m10Budget
      this.oldMonthsData[10] = this.monthBudget[0].m11Budget
      this.oldMonthsData[11] = this.monthBudget[0].m12Budget

      Vue.set(this.oldMonthsData); // v-for에 적용된 v-model에 압데잍를 하지 못해서 Vue.set()을 이용하여 데이터 셋팅

    },
    // 저장버튼
    async saveBudget(){
      const lastDigit = parseInt(this.year.toString().slice(-1));
      const acctPeriodNo = lastDigit + 1;

      const budgetingCode = 2;

      const workplaceCode = sessionStorage.getItem("WorkplaceCode")
      const deptCode = this.deptCode
      const acctInnerCode = this.budgetCode

      const m1Budget = this.monthsData[0]
      const m2Budget = this.monthsData[1]
      const m3Budget = this.monthsData[2]
      const m4Budget = this.monthsData[3]
      const m5Budget = this.monthsData[4]
      const m6Budget = this.monthsData[5]
      const m7Budget = this.monthsData[6]
      const m8Budget = this.monthsData[7]
      const m9Budget = this.monthsData[8]
      const m10Budget = this.monthsData[9]
      const m11Budget = this.monthsData[10]
      const m12Budget = this.monthsData[11]

      const saveBudgetDate = {acctPeriodNo, workplaceCode, deptCode, acctInnerCode, budgetingCode,
        m1Budget, m2Budget, m3Budget, m4Budget, m5Budget, m6Budget, m7Budget, m8Budget, m9Budget
        , m10Budget, m11Budget, m12Budget}
      console.log(saveBudgetDate)
      const response = await this.FETCH_CURRENTBUDGET_LIST( saveBudgetDate )

      if(response.status === 200) {
        Vue.$toast.info('당기 편성 완료')
      }

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
