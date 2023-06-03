<template>
  <div>
    <div style="padding: 20px;">
      <b-row>
        <b-col sm="1" style="padding-bottom: 10px"><b>관리부서</b></b-col>
        <b-col sm="3" style="padding-bottom: 10px">
          <b-form-input
              v-model="department"
              placeholder="Search"
              type="text"
              class="d-inline-block"
              style="font-size:1rem; font-weight: bold"
              @click="showDepartmentModal"
              @keyup.enter="searchDepartment"
          />
        </b-col>

        <b-col cols="1" style="padding-bottom: 10px"><b>자산명</b></b-col>
        <b-col cols="3" style="padding-bottom: 10px">
          <b-form-input
              v-model="assetName"
              placeholder="Search"
              type="text"
              class="d-inline-block"
              style="font-size:1rem; font-weight: bold"
              @keyup.enter="searchAssetName"
          />
        </b-col>
      </b-row>

      <b-row >
        <b-col cols="1"><b>자산분류코드</b></b-col>
        <b-col cols="3">
          <b-form-group>
            <b-form-input
                v-model="accountCode"
                placeholder="Search"
                type="text"
                class="d-inline-block"
                style="font-size:1rem; font-weight: bold"
                @click="showAssetCodeModal"
                @keyup.enter="searchAcctCode"
            >
            </b-form-input>
          </b-form-group>
        </b-col>

        <b-col cols="1"><b>취득일자</b></b-col>
        <b-col cols="3">
          <b-form-group>
            <b-form-input
                v-model="progress"
                placeholder="Search"
                type="date"
                class="d-inline-block"
                style="font-size:1rem;"
                @change="searchProgress"
            />
          </b-form-group>
        </b-col>

        <b-col cols="2">
          <inputAsset/>
        </b-col>

      </b-row>
    </div>

    <div>
      <b-table
          :items="findCurrentAssetList"
          :fields="columns2"
          class="text-sm-center; align-content-center;"
          striped responsive="sm"

      >
        <template #cell(showDetails)="row">
          <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
          </b-button>
        </template>

        <template #row-details="row">
          <b-card style="padding: 20px">
            <b-row class="my-1">
              <b-col sm="2" class="text-sm-left" style="font-size: 1.1rem;"><b>| 내용연수</b></b-col>
              <b-col sm="2">
                <b-form-input :value="row.item.usefullife" disabled class="text-sm-center"
                              style="font-size: 1.2rem;"></b-form-input>
              </b-col>
              <b-col sm="2" class="text-sm-left" style="font-size: 1.1rem;"><b>| 감가마지막년도</b></b-col>
              <b-col sm="2">
                <b-form-input :value="row.item.amorFinYear" disabled class="text-sm-center"
                              style="font-size: 1.2rem;"></b-form-input>
              </b-col>
              <b-col sm="2" class="text-sm-left" style="font-size: 1.1rem;"><b>| 개월수 </b></b-col>
              <b-col sm="2">
                <b-form-input :value="row.item.month" disabled class="text-sm-center"
                              style="font-size: 1.2rem;"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="2" class="text-sm-left" style="font-size: 1.1rem;"><b>| 취득수량 </b></b-col>
              <b-col sm="2">
                <b-form-input :value="row.item.acqQuantity" disabled class="text-sm-center" style="font-size: 1.2rem;"></b-form-input>
              </b-col>
              <b-col sm="2" class="text-sm-left" style="font-size: 1.1rem;"><b>| 잔존수량 </b></b-col>
              <b-col sm="2">
                <b-form-input :value="row.item.remanQuantity" disabled class="text-sm-center" style="font-size: 1.2rem;"></b-form-input>
              </b-col>
              <b-col sm="2" class="text-sm-left" style="font-size: 1.1rem;"><b>| 증감수량 </b></b-col>
              <b-col sm="2">
                <b-form-input :value="row.item.chanQuantity" disabled class="text-sm-center" style="font-size: 1.2rem;"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="2" class="text-sm-left" style="font-size: 1.1rem;"><b>| 감가법 </b></b-col>
              <b-col sm="2">
                <b-form-input :value="row.item.amorWay" disabled class="text-sm-center"
                              style="font-size: 1.2rem;"></b-form-input>
              </b-col>
              <b-col sm="2" class="text-sm-left" style="font-size: 1.1rem;"><b>| 감가비율 </b></b-col>
              <b-col sm="2">
                <b-form-input :value="row.item.amorRate" disabled class="text-sm-center"
                              style="font-size: 1.2rem;"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="2" class="text-sm-left" style="font-size: 1.1rem;"><b>| 취득원가 </b></b-col>
              <b-col sm="4">
                <b-form-input :value="row.item.acqCost" disabled class="text-sm-right"
                              style="font-size: 1.2rem;"></b-form-input>
              </b-col>
              <b-col sm="2" class="text-sm-left" style="font-size: 1.1rem;"><b>| 현재 장부가치 </b></b-col>
              <b-col sm="4">
                <b-form-input :value="0" disabled class="text-sm-right"
                              style="font-size: 1.2rem;"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="2" class="text-sm-left" style="font-size: 1.1rem;"><b>| 전기말 상각누가액 </b></b-col>
              <b-col sm="4">
                <b-form-input :value="0" disabled class="text-sm-right" style="font-size: 1.2rem;"></b-form-input>
              </b-col>
              <b-col sm="2" class="text-sm-left" style="font-size: 1.1rem;"><b>| 전기말 장부가액</b></b-col>
              <b-col sm="4">
                <b-form-input :value="0" disabled class="text-sm-right" style="font-size: 1.2rem;"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="2" class="text-sm-left" style="font-size: 1.1rem;"><b> | 감각삼각비용 </b></b-col>
              <b-col sm="4">
                <b-form-input :value="row.item.depExpense" disabled class="text-sm-right"
                              style="font-size: 1.2rem;"></b-form-input>
              </b-col>
              <b-col sm="2" class="text-sm-left" style="font-size: 1.1rem;"><b>| 잔존가치 </b></b-col>
              <b-col sm="4">
                <b-form-input :value="row.item.residValue" disabled class="text-sm-right"
                              style="font-size: 1.2rem;"></b-form-input>
              </b-col>
            </b-row>

            <b-row class="my-1">
              <b-col sm="2" class="text-sm-left" style="font-size: 1.1rem;"><b>| 당기말상각누계액</b></b-col>
              <b-col sm="4">
                <b-form-input :value="0" disabled class="text-sm-right"
                              style="font-size: 1.2rem;"></b-form-input>
              </b-col>
              <b-col sm="2" class="text-sm-left" style="font-size: 1.1rem;"><b>| 당기기말장부가액 </b></b-col>
              <b-col sm="4">
                <b-form-input :value="0" disabled class="text-sm-right"
                              style="font-size: 1.2rem;"></b-form-input>
              </b-col>
            </b-row>

            <b-button
                class="icon-align-right"
                @click="row.toggleDetails"
            >Hide Details
            </b-button>
          </b-card>
        </template>
      </b-table>
    </div>

    <!-- 자산분류코드 , 계정명 전용 모달-->
    <b-modal
        id="AssetCodeModal"
        v-model="AssetCodeModalState"
        ref="assetCodeModal"
        title="자산분류코드"
    >
      <p class="my-5">
        <AssetCodeModal
            v-model:value="accountCode"
            @input="AssetCodeModalRowClick"
        />
      </p>
    </b-modal>

    <!-- 관리부서 전용 모달-->
    <b-modal
        id="DepartmentModal"
        v-model="DepartmentModalState"
        ref="departmentModal"
        title="부서코드"
    >
      <p class="my-5">
        <DepartmentModal
            v-model:value="department"
            @input="DepartmentModalRowClick"
        />
      </p>
    </b-modal>

  </div>

</template>

<script>
import {VueGoodTable} from 'vue-good-table';
import {size} from "lodash";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import inputAsset from '../asset/inputAsset.vue'
import AssetCodeModal from "@/components/account/modal/AssetCodeModal.vue";
import DepartmentModal from "@/components/account/modal/DepartmentModal.vue";
import Vue from "vue";

export default {
  data() {
    return {
      assetCode: '',
      accountCode: '',
      progress: '',
      assetName: '',
      department:'',
      AssetCodeModalState:false,
      DepartmentModalState:false,
      showModal: false,
      selected: null,
      accountCodeList: [],
      fields: ['acctInnerCode', 'acctName'],

      columns2: [
        {'assetCode': '자산코드'},
        {'acctCode': '자산분류코드'},
        {'acctName': '자산분류명'},
        {'assetName': '자산명'},
        {'progress': '취득일자'},
        {'workplace': '사업장'},
        {'department': '관리부서'},
        {'finalizeStatus': '상태'},
        {'showDetails': '상세보기'}
      ],
      rows: [],
      searchValue: '',
    };

  },
  components: {
    inputAsset, AssetCodeModal, DepartmentModal

  },
  computed: {
    /**
     * 이렇게 변수에 할당해서 사용한다면 위의 data에 선언필요 x
     */
    ...mapState('account/base', ['findCurrentAssetList']),

    ...mapGetters('account/base',
        ['GET_CURRENT_ASSET_LIST',
          'GET_FIND_ASSET_NAME',
        ]),

  },
  beforeDestroy() {
    this.CLEAR_ACCOUNT_LEDGER_LIST()
  },

  created() {
    this.FETCH_CURRENT_ASSET_LIST()
  },

  methods: {
    ...mapActions('account/base',
        ['FETCH_CURRENT_ASSET_LIST', 'FETCH_FIND_ASSET_NAME',
        'FETCH_FIND_ASSET_BY_DEPARTMENT', 'FETCH_FIND_ASSET_BY_PROGRESS',
        'FETCH_FIND_ASSET_BY_ACCTCODE']),

    ...mapMutations('account/base', ['CLEAR_ACCOUNT_LEDGER_LIST']),

    async searchAssetName() {
      if (this.assetName === '') {
        Vue.$toast.info('자산명을 입력해주세요')
        await this.FETCH_CURRENT_ASSET_LIST()
        return
      }
      const assetName = {
        assetName: this.assetName
      }
      await this.FETCH_FIND_ASSET_NAME(assetName)
      // if (this.assetName !== assetName) {
      //   Vue.$toast.info('검색결과가 존재하지 않습니다')
      //   console.log("payload :" + assetName)
      // }
    },

    async searchDepartment(){
      if (this.department === '') {
        Vue.$toast.info('부서명을 입력해주세요')
        await this.FETCH_CURRENT_ASSET_LIST()
        return
      }
      const department = {
        department: this.department
      }
      await this.FETCH_FIND_ASSET_BY_DEPARTMENT(department)
      // if (this.assetName !== assetName) {
      //   Vue.$toast.info('검색결과가 존재하지 않습니다')
        console.log("payload :" + department)
      // }
    },

    async searchProgress(){
      if (this.progress === '') {
        Vue.$toast.info('취득일자를 입력해주세요')
        await this.FETCH_CURRENT_ASSET_LIST()
        return
      }
      const progress = {
        progress: this.progress.replace(/-/g, '')
      }
      await this.FETCH_FIND_ASSET_BY_PROGRESS(progress)
      // if (this.assetName !== assetName) {
      //   Vue.$toast.info('검색결과가 존재하지 않습니다')
      //   console.log("payload :" + assetName)
      // }
    },
    async searchAcctCode(){
      if (this.accountCode === '') {
        Vue.$toast.info('자산분류코드를 입력해주세요')
        await this.FETCH_CURRENT_ASSET_LIST()
        return
      }
      const acctCode = {
        acctCode: this.accountCode
      }
      await this.FETCH_FIND_ASSET_BY_ACCTCODE(acctCode)
      // if (this.assetName !== assetName) {
      //   Vue.$toast.info('검색결과가 존재하지 않습니다')
      //   console.log("payload :" + assetName)
      // }
    },

    showAssetCodeModal(){
      this.AssetCodeModalState = true;
    },

    AssetCodeModalRowClick(payload){
      this.accountCode=payload.acctCode
    },

    showDepartmentModal() {
      this.DepartmentModalState = true;
      console.log(this.DepartmentModal)
    },

    DepartmentModalRowClick(payload) {
      this.department=payload.deptName
    },


  },
}
</script>

<style lang="scss" scoped>
.custom-search {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}

.test {
  display: flex;

  div {
    padding-right: 10px;
  }
}

.my-1 {
  padding-inline: 10px;
}

.b-container {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 100%;
}

.b-container2 {
  width: 100%;
  margin-top: 10px;
  background-color: white;

  .table td,
  .table th {
    font-size: 10px;
  }
}

.table {
  margin-top: 15px;
  background-color: white;
}


.form {
  border-radius: 8px;
  margin-top: 20px;
  padding-left: 40px;
  background-color: white;
  font-weight: bold;

  div {
    margin-bottom: 10px;
  }

  .secondRow {
    margin-bottom: 0px;
  }
}

.important {
  font-size: 20px;
  font-weight: bold;
}

</style>
