<template>
  <div>
    <b-container style="padding: 20px; ">
    <b-row>
      <b-col sm="1" style="padding-bottom: 10px"><b>자산코드</b></b-col>
      <b-col sm="3" style="padding-bottom: 10px">
        <b-form-input
            v-model="assetCode"
            placeholder="Search"
            type="text"
            class="d-inline-block"
            style="font-size:1rem; font-weight: bold"
            @input="advanceSearch1"
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
              @click="searchAccountCode"
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
              style="font-size:1rem; "
          />
        </b-form-group>
      </b-col>

      <b-col cols="2">
        <inputAsset/>
      </b-col>

    </b-row>
    </b-container>

    <div>
      <b-table
          :items="findCurrentAssetList"
          :fields="columns2"
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
    <!-- 계정코드 , 계정명 전용 모달-->
    <b-modal
        id="accountCode"
        ref="accountModal"
        title="계정코드 찾기"
    >
      <p class="my-5">
        <AccountCodeModal
            v-model:value="accountCode"
            condition="accountCode"
        />
      </p>
    </b-modal>
  </div>
</template>

<script>
import {VueGoodTable} from 'vue-good-table';
import {size} from "lodash";
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import AccountCodeModal from '../modal/AccountCodeModal'
import inputAsset from '../asset/inputAsset.vue'
import Vue from "vue";


export default {
  data() {
    return {
      assetCode: '',
      accountCode: '',
      progress: '',
      assetName: '',

      showModal: false,
      selected: null,
      accountCodeList: [],
      fields: ['acctInnerCode', 'acctName'],
      dpts: {
        'administration': '총무부',
        'sales': '영업부',
        'Production': '생산부',
        'Procurement ': '구매부',
        'Human Resources ': '인사부',
        'Development ': '개발부',
        'Planning': '기획부',
        'Public Relations': '홍보부',
        'Technical ': '기술부'
      },
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
      columns: [
        {
          label: '자산코드',
          field: 'assetCode.assetCode',
          width: '16%',
          tdClass: 'text-center',
          thClass: 'text-center',
        },
        {
          label: '자산분류코드',
          field: 'acctCode',
          width: '16%',
          style: 'text-align: center; , font-size: 12px;',
          tdClass: 'text-center',
          thClass: 'text-center',
        },
        {
          label: '자산분류명',
          field: 'acctName',
          width: '16%',
          tdClass: 'text-center',
          thClass: 'text-center',
        },
        {
          label: '자산명',
          field: 'assetName',
          width: '16%',
          tdClass: 'text-center',
          thClass: 'text-center',
        },
        {
          label: '인수날짜',
          field: 'progress', // acquisitionDate
          width: '16%',
          tdClass: 'text-center',
          thClass: 'text-center',

        },
        {
          label: '상태',
          field: 'finalizeStatus',
          width: '16%',
          tdClass: 'text-center',
          thClass: 'text-center',
        }
      ],
      rows: [],
      searchValue: '',
    };

  },
  components: {
    AccountCodeModal, inputAsset

  },
  computed: {
    /**
     * 이렇게 변수에 할당해서 사용한다면 위의 data에 선언필요 x
     */
    ...mapState('account/base',
        ['findCurrentAssetList',
          'accountLederList',
        ]),

    ...mapGetters('account/base',
        ['GET_CURRENT_ASSET_LIST',
          'GET_ASSET_CODE_LIST',
          'GET_FIND_ASSET_NAME',
          'GET_ACCOUNT_LEDER_LIST'
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
        ['FETCH_CURRENT_ASSET_LIST',
          'FETCH_ASSET_CODE_LIST',
          'FETCH_FIND_ASSET_NAME'
        ]),
    ...mapMutations('account/base',
        ['CLEAR_ACCOUNT_LEDGER_LIST',
        ]),
    async searchAssetName() {
      if (this.assetName === '') {
        // Vue.$toast.info('자산명을 입력해주세요')
        await this.FETCH_CURRENT_ASSET_LIST()
        return
      }
      const assetName = {
        assetName: this.assetName
      }
      await this.FETCH_FIND_ASSET_NAME(assetName)
      // if (this.assetName === assetName) {
      //   Vue.$toast.info('검색결과가 존재하지 않습니다')
      // }
      // console.log("Test : " + response.status)
    },

    /**
     * 계정과목 모달 띄우기
     */

    searchAccountCode() {
      this.$root.$emit('bv::show::modal', 'accountCode', '#focusThisOnClose')
    },

    advanceSearch1(){

    }
    /**
     *
     * 안내문구 클릭시 alert창을 띄워서 처리
     * 상위항목의 accountInnerCode를 통해  하위항목 계정코드를 찾을수가 있다.
     * @param value
     */
    // selectedCode(value) {
    //   if (!value) {
    //     alert('저를 선택하시면 안됩니다')
    //     return
    //   }
    //   this.assetType = value.assetCodeList
    //   console.log("필터 :" + this.assetType)
    //   console.log("FCL :" + value.assetCodeList)
    //   console.log("FCL :" + this.GET_ASSET_CODE_LIST )
    // },
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
