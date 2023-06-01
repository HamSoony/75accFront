<template>
  <div>
    <b-button v-b-modal.modal-lg variant="primary">자산등록</b-button>
    <b-modal id="modal-lg" size="lg" hide-footer>
      <template #modal-header>
        <h2>자산 등록양식</h2>
      </template>
      <b-container style="margin-bottom: 10px">
        <b-form>
          <b-row class="mt-1">
            <b-col sm="2" class="text-sm-left"><b>사업장 </b></b-col>
            <b-col sm="4">
              <b-form-input
                  type="text"
                  v-model:value="asset.workplace"
                  @click="showWorkPlaceModal"
              />
            </b-col>

            <b-col sm="2" class="text-sm-left"><b>관리부서 </b></b-col>
            <b-col sm="4">
              <b-form-input
                  v-model:value="asset.department"
                  @click="showDepartmentModal"/>
            </b-col>
          </b-row>

          <b-row class="mt-1">
            <b-col sm="2" class="text-sm-left"><b>자산코드 </b></b-col>
            <b-col sm="4">
              <b-form-input
                  v-model="asset.assetCode"></b-form-input>
            </b-col>

            <b-col sm="2" class="text-sm-left"><b>자산명 </b></b-col>
            <b-col sm="4">
              <b-form-input
                  v-model="asset.assetName"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="mt-1">
            <b-col sm="2" class="text-sm-left"><b>자산분류코드 </b></b-col>
            <b-col sm="4">
              <b-form-input
                  id="assetTypeCode"
                  v-model:value="asset.acctCode"
                  @click="showAssetCodeModal"/>
            </b-col>
            <b-col sm="2" class="text-sm-left"><b>자산분류명 </b></b-col>
            <b-col sm="4">
              <b-form-input
                  v-model:value="asset.acctName"
                  @click="showAssetCodeModal"/>
            </b-col>
          </b-row>

          <b-row class="mt-1">
            <b-col sm="2" class="text-sm-left"><b>취득일자 </b></b-col>
            <b-col sm="4">
              <b-form-input
                  v-model="asset.progress"
                  type="date"
                  class="d-inline-block"
                  @change="calculate3"
              />
            </b-col>
            <b-col sm="2" class="text-sm-left"><b>상태 </b></b-col>
            <b-col sm="4">
              <b-form-select
                  v-model="asset.finalizeStatus"
                  :options="options">
                <template #first>
                  <b-form-select-option
                      :value="null" disabled
                  >-- Select an option --
                  </b-form-select-option>
                </template>
              </b-form-select>

            </b-col>

          </b-row>

          <b-row class="mt-1">
            <b-col sm="2" class="text-sm-left"><b>취득원가 </b></b-col>
            <b-col sm="4">
              <b-form-input
                  v-model="asset.acqCost"/>
            </b-col>
            <b-col sm="2" class="text-sm-left"><b>내용연수 </b></b-col>
            <b-col sm="4">
              <b-form-input
                  v-model="asset.usefullife "
                  @change="calculate1"/>
            </b-col>
          </b-row>

          <b-row class="mt-1">
            <b-col sm="2" class="text-sm-left"><b>개월수 </b></b-col>
            <b-col sm="4">
              <b-form-input
                  v-model="asset.month"
                  disabled
              />
            </b-col>
            <b-col sm="2" class="text-sm-left"><b>취득수량 </b></b-col>
            <b-col sm="4">
              <b-form-input
                  v-model="asset.acqQuantity"
              />
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col sm="2" class="text-sm-left"><b>증감수량 </b></b-col>
            <b-col sm="4">
              <b-form-input
                  v-model="asset.chanQuantity"
                  @keyup.stop="calculate2"/>
            </b-col>
            <b-col sm="2" class="text-sm-left"><b>잔존수량 </b></b-col>
            <b-col sm="4">
              <b-form-input v-model="asset.remanQuantity " disabled/>
            </b-col>
          </b-row>

          <b-row class="mt-1">
            <b-col sm="2" class="text-sm-left"><b>감가비율 </b></b-col>
            <b-col sm="4">
              <b-form-input v-model="asset.amorRate " disabled/>
            </b-col>
            <b-col sm="2" class="text-sm-left"><b>감가삼각비용 </b></b-col>
            <b-col sm="4">
              <b-form-input v-model="asset.depExpense " disabled/>
            </b-col>
          </b-row>
          <b-row class="mt-1">
            <b-col>
              <b-button
                  type="reset"
                  variant="outline-secondary"
              >
                Reset
              </b-button>
            </b-col>
          </b-row>

        </b-form>
        <b-row class="mt-1">
          <b-col sm="12" class="text-sm-right">
            <b-button
                class="mt-1"
                @click="saveAsset"
                style="margin-right: 10px">저장
            </b-button>
            <b-button
                class="mt-1"
                @click="$bvModal.hide('modal-lg')">취소
            </b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>

    <b-modal
        v-model="workPlaceModal"
        scrollable
        title="Scrollable Content"
        cancel-variant="outline-secondary"
    >
      <b-table
          hover
          selectable
          :select-mode="'single'"
          :fields="project"
          :items="workplaceList"
          @row-clicked="WorkplaceCodeClick"
      />
    </b-modal>

    <b-modal
        id="DepartmentModal"
        v-model="DepartmentModalState"
        ref="departmentModal"
        title="부서코드"
    >
      <p class="my-5">
        <DepartmentModal
            v-model:value="asset.department"
            @input="DepartmentModalRowClick"
        />
      </p>
    </b-modal>

    <b-modal
        id="AssetCodeModal"
        v-model="AssetCodeModalState"
        ref="assetCodeModal"
        title="자산분류코드"
    >
      <p class="my-5">
        <AssetCodeModal
            v-model:value="asset.acctCode"
            @input="AssetCodeModalRowClick"
        />
      </p>
    </b-modal>



  </div>
</template>

<script>

import {mapActions, mapState} from "vuex";
import {BTable} from "bootstrap-vue";
import DepartmentModal from "@/components/account/modal/DepartmentModal.vue";
import AssetCodeModal from "@/components/account/modal/AssetCodeModal.vue";


export default {
  name: 'inputAsset',
  data() {
    return {
      selected: null,
      options: [
        {value: '미상각', text: '미상각'}, {value: '진행', text: '진행'}, {value: '마감', text: '마감'}
      ],
      workPlaceModal: false,
      DepartmentModalState: false,
      AssetCodeModalState:false,
      project: [
        { key: 'id', label: '코드' },
        { key: 'wpName', label: '이름' },
      ],
      asset: {
        assetCode: '',
        acctCode: '',
        acctName: '',
        assetName: '',
        progress: '',
        finalizeStatus: 'null',
        workplace: '',
        department: '',
        usefullife: '',
        acqQuantity: '',
        chanQuantity: '',
        remanQuantity: '',
        amorWay: '',
        acqCost: '',
        residValue: '',
        amorRate: '',
        month: '',
        amorFinYear: '',
        depExpense: ''
      }
    }
  },
  computed: {
    ...mapState('auth', ['workplaceList']),

  },
  components: {
    AssetCodeModal,
    DepartmentModal
  },

  created() {
    this.GET_WORKPLACE_CODE(sessionStorage.getItem('CompanyCode'))

  },

  methods: {
    ...mapActions('account/base', ['SAVE_ASSET','FETCH_ASSET_CODE']),
    ...mapActions('auth', ['GET_WORKPLACE_CODE']),




    async saveAsset() {
      if (this.asset === '') {
        console.log('데이터 값을 입력하세요')
      } else {
        this.$store.dispatch('account/base/SAVE_ASSET', this.asset)
        this.$bvModal.hide('modal-lg');
      }
    },

    calculate1() {
      this.asset.amorRate = 1 / this.asset.usefullife;
      console.log("cal1" + this.asset.amorRate)
      console.log('work :' + this.workplaceList)
      this.asset.depExpense = this.asset.acqCost / this.asset.usefullife;
      console.log("cal2" + this.asset.amorRate)

    },
    calculate2() {
      this.asset.remanQuantity = this.asset.acqQuantity - this.asset.chanQuantity
    },
    calculate3() {
      console.log("cal3" + this.asset.progress)
      const value = this.asset.progress.slice(5, 7)
      console.log("calTest" + value)
      this.asset.month = 12 - value
    },

    showWorkPlaceModal() {
      console.log("프로젝트", this.workplaceInfo)
      this.workPlaceModal = true;
    },

    WorkplaceCodeClick(payload) {
      this.asset.workplace=payload.wpName
      console.log("this.dataIndex",payload)
    },

    showDepartmentModal() {
      this.DepartmentModalState = true;
      console.log(this.DepartmentModal)
    },

    DepartmentModalRowClick(payload) {
      this.asset.department=payload.deptName
    },

    showAssetCodeModal(){
      this.AssetCodeModalState = true;
    },

    AssetCodeModalRowClick(payload){
      this.asset.acctCode=payload.acctCode
      this.asset.acctName=payload.acctName
    }
  },

  //

}
</script>

<style scoped>

</style>
