<!--<template>-->
<!--  <div>-->
<!--    <table class="table table-row-spacing">-->
<!--      <thead>-->
<!--      <tr>-->
<!--        <th>-->
<!--          <MenuSlipForm-->
<!--              style="justify-content: end"-->
<!--              :active-button="activeButton"-->
<!--              :add-bt-status="addBtStatus"-->
<!--              :add-journal-bt="addJournalBt"-->
<!--              :saveBt="saveBt"-->
<!--              @submitResult="submit"-->
<!--          />-->
<!--        </th>-->
<!--      </tr>-->
<!--      </thead>-->

<!--      <tbody>-->
<!--      <tr>-->
<!--        <td>-->
<!--          <h1>전표</h1>-->
<!--          <b-table-->
<!--              :items="newSlipForm"-->
<!--              :fields="slipFiled"-->
<!--              striped-->
<!--          >-->
<!--          </b-table>-->

<!--          <h1>분개 </h1>-->
<!--          <b-table-->
<!--              :items="newJournalForm"-->
<!--              :fields="journalFiled"-->
<!--              striped-->
<!--              responsive-->
<!--              selectable-->
<!--              select-mode="single"-->
<!--              @row-clicked="JournalClicked"-->
<!--          >-->

<!--            <template #cell(acctInnerCode)="data">-->
<!--              <b-form-input v-if="newJournalForm[data.index].isEdit && selectedCell === 'accountCode'" type="text" v-model="newJournalForm[data.index].acctInnerCode" @blur="editCellBlur(data)" ></b-form-input>-->
<!--              <span v-else v-b-modal.cellAccountCode @click="setEditIndex(data.index)">{{data.value}}</span>-->
<!--            </template>-->
<!--            <template #cell(balanceDivision)="data">-->
<!--              <b-form-select v-if="newJournalForm[data.index].isEdit && selectedCell === 'balanceDivision'" type="text" v-model="newJournalForm[data.index].balanceDivision" @change="editCellBlur(data)">-->
<!--                <option v-for="option in options" :value="option.value">{{option.text}}</option>-->
<!--              </b-form-select>-->
<!--              <span v-else @click="editCellHandler(data, 'balanceDivision')">{{data.value}}</span>-->
<!--            </template>-->
<!--            <template #cell(cterCode)="data">-->
<!--              <b-form-input v-if="newJournalForm[data.index].isEdit && selectedCell === 'customerCode'" type="text" v-model="newJournalForm[data.index].cterCode" @blur="editCellBlur(data)" ></b-form-input>-->
<!--              <span v-else v-b-modal.CustomerCode2 @click="setEditIndex(data.index)">{{data.value}}</span>-->
<!--            </template>-->
<!--            <template #cell(leftDebtorPrice)="data">-->
<!--              <b-form-input v-if="newJournalForm[data.index].isEdit && selectedCell === 'leftDebtorPrice'" type="text" v-model="newJournalForm[data.index].leftDebtorPrice" @blur="editCellBlur(data)" ></b-form-input>-->
<!--              <span v-else @click="editCellHandler(data, 'leftDebtorPrice')">{{data.value}}</span>-->
<!--            </template>-->
<!--            <template #cell(rightCreditsPrice)="data">-->
<!--              <b-form-input v-if="newJournalForm[data.index].isEdit && selectedCell === 'rightCreditsPrice'" type="text" v-model="newJournalForm[data.index].rightCreditsPrice" @blur="editCellBlur(data)" ></b-form-input>-->
<!--              <span v-else @click="editCellHandler(data, 'rightCreditsPrice')">{{data.value}}</span>-->
<!--            </template>-->

<!--          </b-table>-->

<!--        </td>-->
<!--      </tr>-->



<!--      &lt;!&ndash;현금 관련-&ndash;&gt;-->
<!--      <tr v-if="JournalDetailConditions===`현금`">-->
<!--        <td >-->
<!--          <h1>분개상세 </h1>-->

<!--          <b-row>-->
<!--            프로젝트-->
<!--            <b-col md="1" ><input type="text" v-model:value="newJournalDetailForm.wpCode" @click="showWorkPlaceModal" /></b-col>-->
<!--            <b-col md="2"><input size="10" type="text" v-model:value="newJournalDetailForm.wpName" @click="showWorkPlaceModal" /></b-col>-->
<!--            자금과목-->
<!--            <b-col md="1"><input type="text" v-model:value="newJournalDetailForm.deptCode" @click="showDepartmentModal" /></b-col>-->
<!--            <b-col md="3"><input type="text" size="10" v-model:value="newJournalDetailForm.deptName" @click="showDepartmentModal" /></b-col>-->
<!--            품번-->
<!--            <b-col md="1"><input type="text" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--          </b-row>-->

<!--          <b-row class="mt-1">-->
<!--            요청일-->
<!--            <b-col md="2" ><input type="date" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--            상환일-->
<!--            <b-col md="2"><input type="date" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--            환종-->
<!--            <b-col md="1" ><input type="text"  size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--            <b-col md="2" class="pl-2"><input type="text" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--            환율-->
<!--            <b-col md="2"><input type="text" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--          </b-row>-->

<!--          <b-row class="mt-1">-->
<!--            외화금액-->
<!--            <b-col md="2.5" class="pr-5" ><input type="text" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--            이자율-->
<!--            <b-col md="2.5" class="pr-5"><input type="text" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--            사용자정의-->
<!--            <b-col md="2.5"><input type="text" size="15" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--            <b-col md="2.5" class="pr-5"><input type="text"  size="9" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--            사용자정의-->
<!--            <b-col md="2.5"><input type="text" size="15" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--            <b-col md="2.5"><input type="text"  size="9" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--          </b-row>-->


<!--        </td>-->
<!--      </tr>-->

<!--      &lt;!&ndash;업무용 승합차&ndash;&gt;-->
<!--      <tr v-if="JournalDetailConditions===`업무용승용차`">-->
<!--        <td >-->
<!--          <h1>분개상세 </h1>-->

<!--          <b-row>-->
<!--            프로젝트-->
<!--            <b-col md="1" ><input type="text" v-model:value="newJournalDetailForm.wpCode" @click="showWorkPlaceModal" /></b-col>-->
<!--            <b-col md="2"><input size="10" type="text" v-model:value="newJournalDetailForm.wpName" @click="showWorkPlaceModal" /></b-col>-->
<!--            사용부서-->
<!--            <b-col md="1"><input type="text" v-model:value="newJournalDetailForm.deptCode" @click="showDepartmentModal" /></b-col>-->
<!--            <b-col md="3"><input type="text" size="10" v-model:value="newJournalDetailForm.deptName" @click="showDepartmentModal" /></b-col>-->
<!--            품번-->
<!--            <b-col md="1"><input type="text" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--          </b-row>-->

<!--          <b-row class="mt-1">-->
<!--            요청일-->
<!--            <b-col md="2" ><input type="date" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--            상환일-->
<!--            <b-col md="2"><input type="date" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--            환종-->
<!--            <b-col md="1" ><input type="text"  size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--            <b-col md="2" class="pl-2"><input type="text" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--            환율-->
<!--            <b-col md="2"><input type="text" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--          </b-row>-->

<!--          <b-row class="mt-1">-->
<!--            외화금액-->
<!--            <b-col md="2.5" class="pr-5" ><input type="text" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--            이자율-->
<!--            <b-col md="2.5" class="pr-5"><input type="text" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--            업무용승용차-->
<!--            <b-col md="2.5"><input type="text" size="15" v-model:value="newJournalDetailForm.accountControlName" :disabled="false" /></b-col>-->
<!--            <b-col md="2.5" class="pr-5"><input type="text"  size="9" v-model:value="newJournalDetailForm.accountControlName" :disabled="false" /></b-col>-->
<!--            사용자정의-->
<!--            <b-col md="2.5"><input type="text" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--            <b-col md="2.5"><input type="text"  size="9" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>-->
<!--          </b-row>-->


<!--        </td>-->
<!--      </tr>-->





<!--      <tr>-->
<!--        <td>-->

<!--          <h1> 총 합 </h1>-->
<!--          <b-row>-->
<!--            <b-col>-->
<!--              <b-table :items="leftJournalList"-->
<!--                       :fields="totalLeftForm"-->
<!--                       striped-->
<!--                       responsive-->
<!--                       v-model=leftJournalList-->

<!--              />-->
<!--            </b-col>-->
<!--            <b-col>-->
<!--              <b-table-->
<!--                  :items="rightJournalList"-->
<!--                  :fields="totalRightForm"-->
<!--                  striped-->
<!--                  responsive-->
<!--                  v-model=rightJournalList-->
<!--              />-->
<!--            </b-col>-->
<!--          </b-row>-->

<!--        </td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->




<!--    <div>-->
<!--      &lt;!&ndash; 모달은 id 이용&ndash;&gt;-->
<!--      &lt;!&ndash; 전표추가 모달&ndash;&gt;-->
<!--      &lt;!&ndash;하나의 inputForm 태그 사용 < 조건을 props로 내려줌>&ndash;&gt;-->
<!--      <b-modal-->
<!--          id="openAddSlipModal"-->
<!--          title="전표추가"-->
<!--          @ok="completeSilpForm"-->
<!--      >-->
<!--        <p class="my-5">-->
<!--          <InputForm-->
<!--              ref="inputSlipForm"-->
<!--              modal-status="addSlip"-->
<!--          />-->
<!--        </p>-->
<!--      </b-modal>-->
<!--      &lt;!&ndash; 분개추가 모달 &ndash;&gt;-->
<!--      <b-modal-->
<!--          id="openAddJounalModal"-->
<!--          title="분개추가"-->
<!--          @ok="completeJounalForm"-->
<!--      >-->
<!--        <p class="my-5">-->
<!--          <InputForm-->
<!--              ref="inputJounalForm"-->
<!--              modal-status="addJounal"-->
<!--          />-->
<!--        </p>-->
<!--      </b-modal>-->
<!--      &lt;!&ndash;분개상세 모달 &ndash;&gt;-->
<!--      <b-modal-->
<!--          id="openAddJounalDetailModal"-->
<!--          title="분개상세추가"-->
<!--          @ok="completeJounalDetailForm"-->
<!--      >-->
<!--        <p class="my-5">-->
<!--          <InputForm-->
<!--              ref="inputJounalDetailForm"-->
<!--              modal-status="addJounalDetail"-->
<!--          />-->
<!--        </p>-->
<!--      </b-modal>-->

<!--      &lt;!&ndash; 계정코드 모달&ndash;&gt;-->
<!--      <b-modal-->
<!--          id="cellAccountCode"-->
<!--          ref="accountModal"-->
<!--          :title="'계정코드찾기'"-->
<!--      >-->
<!--        <p class="my-5">-->
<!--          <AccountCodeModal2-->
<!--              v-model:value="resultAccountCode"-->
<!--              :condition="'accountCode'"-->
<!--          />-->
<!--        </p>-->
<!--      </b-modal>-->

<!--      <b-modal-->
<!--          id="CustomerCode2"-->
<!--          ref="accountModal"-->
<!--          title="거래처코드"-->
<!--      >-->
<!--        <p class="my-5">-->
<!--          <AccountCustomerCodeModal2-->
<!--              v-model:value="resultCustomerCode"-->

<!--          />-->
<!--        </p>-->
<!--      </b-modal>-->

<!--      <b-modal-->
<!--          v-model="workPlaceModal"-->
<!--          scrollable-->
<!--          title="Scrollable Content"-->
<!--          cancel-variant="outline-secondary"-->
<!--      >-->
<!--        <b-table-->
<!--            hover-->
<!--            selectable-->
<!--            :select-mode="'single'"-->
<!--            :fields="project"-->
<!--            :items="workplaceList"-->
<!--            @row-clicked="WorkplaceCodeClick"-->
<!--        />-->
<!--      </b-modal>-->

<!--      <b-modal-->
<!--          id="DepartmentModal"-->
<!--          v-model="DepartmentModalState"-->
<!--          ref="departmentModal"-->
<!--          title="거래처코드"-->
<!--      >-->
<!--        <p class="my-5">-->
<!--          <DepartmentModal-->
<!--              v-model:value="departmentSelectedData"-->
<!--              @input="DepartmentModalRowClick"-->

<!--          />-->
<!--        </p>-->
<!--      </b-modal>-->




<!--    </div>-->

<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import { BTable } from 'bootstrap-vue'-->
<!--import {mapActions, mapState} from 'vuex'-->
<!--import MenuSlipForm from './MenuSlipForm.vue'-->
<!--import InputForm from './InputForm.vue'-->
<!--import { slipFiled, journalFiled, JournaldetailFiled } from '../fields'-->
<!--import AccountCodeModal2 from '@/components/account/modal/AccountCodeModal2.vue'-->
<!--import AccountCustomerCodeModal2 from '@/components/account/modal/AccountCustomerCodeModal2'-->
<!--import DepartmentModal from '@/components/account/modal/DepartmentModal'-->
<!--import departmentModal from "@/components/account/modal/DepartmentModal.vue";-->
<!--export default {-->
<!--  components: {-->
<!--    BTable,-->
<!--    MenuSlipForm,-->
<!--    InputForm,-->
<!--    AccountCodeModal2,-->
<!--    AccountCustomerCodeModal2,-->
<!--    DepartmentModal-->
<!--  },-->

<!--  data() {-->
<!--    return {-->
<!--      resultAccountCode: '',-->
<!--      resultCustomerCode: '',-->
<!--      dataIndex:'',-->
<!--      example:'accountCode',-->
<!--      totalForm:[-->
<!--        { key: 'left', label: '차변' },-->
<!--        { key: 'right', label: '대변' },-->
<!--      ],-->
<!--      totalLeftForm:[-->
<!--        { key: 'acctInnerCode', label: '코드' },-->
<!--        { key: 'acctName', label: '과목' },-->
<!--        { key: 'leftDebtorPrice', label: '차변' },-->
<!--      ],-->
<!--      totalRightForm:[-->
<!--        { key: 'acctInnerCode', label: '코드' },-->
<!--        { key: 'acctName', label: '과목' },-->
<!--        { key: 'rightCreditsPrice', label: '대변' },-->
<!--      ],-->
<!--      leftJournalList:[],-->
<!--      rightJournalList:[],-->

<!--      options: [-->
<!--        { value: '대변', text: '대변' },-->
<!--        { value: '차변', text: '차변' },-->
<!--      ],-->
<!--      project: [-->
<!--        { key: 'id', label: '코드' },-->
<!--        { key: 'wpName', label: '이름' },-->
<!--      ]-->
<!--      ,-->
<!--      selectedJournal: [],-->

<!--      detailDisabled:true,-->

<!--      workPlaceModal:false,-->

<!--      DepartmentModalState:false,-->

<!--      departmentSelectedData:{},-->

<!--      JournalDetailConditions:"",-->







<!--      /**-->
<!--       * 그리드 필드-->
<!--       */-->
<!--      slipFiled,-->
<!--      journalFiled,-->
<!--      JournaldetailFiled,-->
<!--      /**-->
<!--       * 그리드에 보여지는 객체-->
<!--       */-->
<!--      newSlipForm: [],-->
<!--      newJournalForm: [],-->
<!--      newJournalDetailForm: {-->
<!--        wpCode:'',-->
<!--        wpName:'',-->
<!--        deptCode:'',-->
<!--        deptName:''-->
<!--      },-->
<!--      /**-->
<!--       * 모든 결과를 담는 객체-->
<!--       */-->
<!--      resultSlipForm: {-->
<!--        journals: [],-->
<!--      },-->

<!--      /**-->
<!--       * 선택한 분개 구분위해 사용-->
<!--       */-->
<!--      id: 1,-->
<!--      currentId: '',-->

<!--      /**-->
<!--       *  버튼 활성화-->
<!--       */-->
<!--      activeButton: 'addSlip',-->
<!--      addBtStatus: false,-->
<!--      addJournalBt: false,-->

<!--      selectedCell: null,-->
<!--      saveBt:false,-->
<!--    }-->
<!--  },-->

<!--  created() {-->
<!--    this.GET_WORKPLACE_CODE(sessionStorage.getItem('CompanyCode'))-->
<!--  },-->

<!--  computed: {-->

<!--    // 핵심입니다!!!   모듈명 .   [받아오는값]-->
<!--    ...mapState('auth', ['workplaceList']),-->
<!--  },-->

<!--  methods: {-->
<!--    ...mapActions('account/account', ['CREATE_SLIP', 'FETCH_SLIP']),-->
<!--    ...mapActions('auth', ['GET_WORKPLACE_CODE']),-->
<!--    /**-->
<!--     * 모달 ok버튼 클릭시 실행되는 함수-->
<!--     * 전표-->
<!--     */-->
<!--    completeSilpForm() {-->
<!--      this.newSlipForm.push(this.$refs.inputSlipForm.slipForm)-->
<!--      this.resultSlipForm = {...this.$refs.inputSlipForm.slipForm, ...this.resultSlipForm}-->
<!--      this.addBtStatus = true-->
<!--      this.newSlipForm = this.newSlipForm.map(item => ({...item, isEdit: false}));-->
<!--    },-->
<!--    /**-->
<!--     *  분개 모달완료시 실행-->
<!--     */-->
<!--    completeJounalForm() {-->
<!--      this.newJournalForm.push({...this.$refs.inputJounalForm.journalForm,-->
<!--        id: this.id,-->
<!--        journalDetail: {-->
<!--          wpCode:'',-->
<!--          wpName:'',-->
<!--          deptCode:'',-->
<!--          deptName:''-->
<!--        }-->
<!--      })-->
<!--      this.resultSlipForm.journals.push({-->
<!--        ...this.$refs.inputJounalForm.journalForm,-->
<!--        id: this.id,-->
<!--        journalDetail: {-->
<!--          wpCode:'',-->
<!--          wpName:'',-->
<!--          deptCode:'',-->
<!--          deptName:''-->
<!--        }-->
<!--      })-->
<!--      this.id += 1-->




<!--      //분개 총합 계산-->
<!--      this.totalJournal()-->

<!--    },-->

<!--    /**-->
<!--     *   분개테이블의 행 클릭시 실행되는함수(해당 분개의 상세를 만들기위한 목적)-->
<!--     *    this.$root.$emit(모달오픈  , 모달 아이디)-->
<!--     */-->
<!--    /**-->
<!--     * 저장-->
<!--     */-->
<!--    async submit() {-->
<!--      /**-->
<!--       * 차변 대변 입력값이 같지 않을경우 경고 및 재작성요구-->
<!--       */-->
<!--      console.log("resultSlipForm",this.resultSlipForm)-->
<!--      const addLeftPrice = this.resultSlipForm.journals.map(v => Number(v.leftDebtorPrice)).reduce((pre, curr) => pre + curr, 0)-->
<!--      const addRightPrice = this.resultSlipForm.journals.map(v => Number(v.rightCreditsPrice)).reduce((pre, curr) => pre + curr, 0)-->

<!--      const newSlipNo = await this.CREATE_SLIP(this.resultSlipForm)-->
<!--      console.log(newSlipNo)-->
<!--      this.openAlert(newSlipNo)-->
<!--    },-->

<!--    /**-->
<!--     * 성공시 호출되는 alert창-->
<!--     * 새로 생긴 전표를 router를 이용하여 보냄-->
<!--     */-->
<!--    openAlert(newSlipNo) {-->
<!--      this.$swal.fire({-->
<!--        title: '전표작성 성공!',-->
<!--        text: `전표번호${newSlipNo}`,-->
<!--        icon: 'info',-->
<!--        showCancelButton: true,-->
<!--        confirmButtonColor: '#3085d6',-->
<!--        cancelButtonColor: '#d33',-->
<!--        confirmButtonText: '해당 전표를 보시겠습니까?',-->
<!--      }).then(result => {-->
<!--        if (result.isConfirmed) {-->
<!--          this.$router.push({name: 'journalForm', params: {SlipNo: newSlipNo}})-->
<!--        }-->
<!--      })-->
<!--    },-->


<!--    editCellHandler(data, name) {-->
<!--      console.log("data =",data)-->
<!--      this.newJournalForm = this.newJournalForm.map(item => ({...item, isEdit: false}));-->
<!--      this.newJournalForm[data.index].isEdit = true;-->
<!--      this.selectedCell = name-->
<!--      console.log("newJournalForm?", this.newJournalForm)-->
<!--    },-->

<!--    // 수정이 끝나고 blur 될 떄 실행-->
<!--    editCellBlur(data) {-->
<!--      console.log("this.resultSlipForm",this.resultSlipForm)-->
<!--      delete this.newJournalForm[data.index].isEdit-->
<!--      this.resultSlipForm.journals[data.index] = {...this.newJournalForm[data.index]}-->
<!--      this.leftJournalList = this.resultSlipForm.journals.filter(item => item.balanceDivision === '차변')-->
<!--      this.rightJournalList = this.resultSlipForm.journals.filter(item => item.balanceDivision === '대변')-->
<!--      this.selectedCell = null;-->

<!--      //분개 총합 계산-->
<!--      this.totalJournal()-->
<!--      console.log("세션스토리지",sessionStorage.getItem("CompanyCode"))-->
<!--    },-->

<!--    // 몇번 쨰 분개인지 알기 위한 메소드-->
<!--    setEditIndex(index) {-->
<!--      this.dataIndex = index-->
<!--      console.log("this.dataIndex", this.dataIndex)-->

<!--    },-->

<!--    // 분개 총 합 구하는 메소드-->
<!--    totalJournal() {-->
<!--      // 분개 총합-->
<!--      this.leftJournalList = this.resultSlipForm.journals.filter(item => item.balanceDivision === '차변')-->
<!--      this.rightJournalList = this.resultSlipForm.journals.filter(item => item.balanceDivision === '대변')-->


<!--      //차변 총합-->
<!--      let letfTotal = 0-->
<!--      this.leftJournalList.forEach(v => letfTotal += parseInt(v.leftDebtorPrice))-->
<!--      this.leftJournalList[this.leftJournalList.length] = {accountCode: "합계", leftDebtorPrice: letfTotal}-->

<!--      //대변 총합-->
<!--      let rightTotal = 0-->
<!--      if (this.rightJournalList.length !== 0) {-->
<!--        this.rightJournalList.forEach(v => rightTotal += parseInt(v.rightCreditsPrice))-->
<!--      }-->
<!--      console.log("rightJournalList", rightTotal)-->
<!--      this.rightJournalList[this.rightJournalList.length] = {accountCode: "합계", rightCreditsPrice: rightTotal}-->


<!--      // 차변 대변 비교-->
<!--      if (letfTotal === rightTotal) {-->
<!--        this.saveBt=true;-->
<!--      } else if (letfTotal > rightTotal) {-->
<!--        let sum = rightTotal - letfTotal-->
<!--        this.rightJournalList[this.rightJournalList.length - 1].rightCreditsPrice = "(" + sum + ") " + rightTotal-->
<!--        this.saveBt=false;-->
<!--      } else {-->
<!--        let sum = letfTotal - rightTotal-->
<!--        this.leftJournalList[this.leftJournalList.length - 1].leftDebtorPrice = "(" + sum + ") " + letfTotal-->
<!--        this.saveBt=false;-->
<!--      }-->

<!--    },-->

<!--    // 분개 로우 클릭시 분개 상세-->
<!--    JournalClicked(item,index){-->
<!--      console.log("item",item)-->
<!--      this.dataIndex=index-->
<!--      this.selectedJournal=item-->
<!--      this.newJournalDetailForm.wpCode=item.journalDetail.wpCode-->
<!--      this.newJournalDetailForm.wpName=item.journalDetail.wpName-->
<!--      this.newJournalDetailForm.deptCode=item.journalDetail.deptCode-->
<!--      this.newJournalDetailForm.deptName=item.journalDetail.deptName-->
<!--      if(item.acctName.includes("현금")){-->
<!--        this.JournalDetailConditions = "현금"-->

<!--      }-->
<!--      else if(item.acctName.includes("보험")){-->
<!--        this.JournalDetailConditions = "업무용승용차"-->
<!--      }-->
<!--      console.log("JournalClicked", this.selectedJournal)-->

<!--    }-->
<!--    ,-->

<!--    // 사업장코드모달 열기-->
<!--    showWorkPlaceModal() {-->
<!--      console.log("프로젝트",this.workplaceInfo)-->
<!--      this.workPlaceModal = true;-->
<!--    },-->

<!--    WorkplaceCodeClick(payload) {-->
<!--      this.newJournalDetailForm.wpName=payload.wpName-->
<!--      this.newJournalDetailForm.wpCode = payload.id-->
<!--      console.log("this.dataIndex",payload)-->
<!--      console.log("newJournalForm",this.newJournalForm)-->
<!--      this.newJournalForm[this.dataIndex].journalDetail.wpName=payload.wpName-->
<!--      this.newJournalForm[this.dataIndex].journalDetail.wpCode=payload.id-->
<!--      this.resultSlipForm.journals[this.dataIndex].journalDetail.wpName=payload.wpName-->
<!--      this.resultSlipForm.journals[this.dataIndex].journalDetail.wpCode=payload.id-->
<!--      console.log("워크플레이스코드 클릭",this.resultSlipForm)-->
<!--      console.log("데이터 집어넣고",this.resultSlipForm.journals[this.dataIndex].journalDetail)-->

<!--    },-->

<!--    showDepartmentModal() {-->
<!--      this.DepartmentModalState = true;-->
<!--    },-->

<!--    DepartmentModalRowClick(payload) {-->
<!--      this.newJournalDetailForm.deptCode=payload.deptCode-->
<!--      this.newJournalDetailForm.deptName = payload.deptName-->
<!--      this.newJournalForm[this.dataIndex].journalDetail.deptCode=payload.deptCode-->
<!--      this.newJournalForm[this.dataIndex].journalDetail.deptName=payload.deptName-->
<!--      this.resultSlipForm.journals[this.dataIndex].journalDetail.deptCode=payload.deptCode-->
<!--      this.resultSlipForm.journals[this.dataIndex].journalDetail.deptName=payload.deptName-->


<!--    }-->
<!--  },-->

<!--  watch: {-->
<!--    resultAccountCode : function(val){-->
<!--      console.log("resultAccountCode",val);-->
<!--      console.log("this.newJournalForm",this.newJournalForm)-->
<!--      this.newJournalForm[this.dataIndex].acctInnerCode=val.acctInnerCode-->
<!--      this.newJournalForm[this.dataIndex].acctName=val.acctName-->
<!--      this.resultSlipForm.journals[this.dataIndex].acctInnerCode=val.acctInnerCode-->
<!--      this.resultSlipForm.journals[this.dataIndex].acctName=val.acctName-->

<!--    },-->
<!--    resultCustomerCode : function(val){-->
<!--      console.log("resultAccountCode",val);-->
<!--      console.log("this.newJournalForm",this.newJournalForm)-->
<!--      this.newJournalForm[this.dataIndex].cterCode=val.cterCode-->
<!--      this.newJournalForm[this.dataIndex].cterName=val.cterName-->
<!--      this.resultSlipForm.journals[this.dataIndex].cterCode=val.cterCode-->
<!--      this.resultSlipForm.journals[this.dataIndex].cterName=val.cterName-->
<!--    },-->


<!--  }-->


<!--}-->

<!--</script>-->

<!--<style lang="scss" scoped>-->
<!--.repeater-form {-->
<!--  overflow: hidden;-->
<!--  transition: .35s height;-->
<!--}-->

<!--.table-row-spacing tbody tr {-->
<!--  margin-bottom: 10px;-->
<!--  background-color: #fff6f3;-->
<!--  border-bottom: white 3px solid;-->
<!--  border-top: white 3px solid;-->
<!--}-->




<!--</style>-->
