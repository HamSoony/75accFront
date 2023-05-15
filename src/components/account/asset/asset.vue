<template>
  <b-col>
    <b-container class="b-container" >
      <b-row align-v="center">
        <b-col sm="1" style="padding-bottom: 10px">자산코드</b-col>
        <b-col sm="3" style="padding-bottom: 10px">
          <b-form-input
              placeholder="Search"
              type="text"
              class="d-inline-block"
              @input="advanceSearch1"
          />
        </b-col>
        <b-col cols="1" style="padding-bottom: 10px">자산명</b-col>
        <b-col cols="3" style="padding-bottom: 10px" >
          <b-form-input
              placeholder="Search"
              type="text"
              class="d-inline-block"
              @input="advanceSearch2"
          />
        </b-col>

        <div class="w-100"></div>

        <b-col cols="1" >자산분류코드</b-col>
        <b-col cols="3" >
          <b-form-select
              id="name"
              v-model="selected"
              :options="GET_ASSET_CODE_LIST"
              width="70%"
              @change="selectedCode"
          >
            <b-form-select-option :value="null">계정과목을 선택해주세요</b-form-select-option>
          </b-form-select>
        </b-col>

        <b-col cols="1">인수날짜</b-col>
        <b-col cols="3">
          <b-form-group>
            <b-form-input
                placeholder="Search"
                type="date"
                class="d-inline-block"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>

    <b-container>
      <vue-good-table
        :columns="columns"
        :rows="findCurrentAssetList"
        :line-numbers="false"
        :select-options="{
          enabled: true,
          selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
          selectionInfoClass: 'custom-class',
          selectionText: '개가 선택되었습니다',
          clearSelectionText: 'clear',
          disableSelectInfo: false, // disable the select info panel on top
          selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
        }"
        :pagination-options="{
          enabled: true,
          perPage:pageLength
        }"
        @on-selected-rows-change="selectionChanged"
        theme="polar-bear"
    />


      <!--      <b-row>-->
      <!--        <b-col class="table">-->
      <!--          <div>-->
      <!--            <vue-good-table-->
      <!--                :columns="columns"-->
      <!--                :rows="rows"-->
      <!--                :line-numbers="true"-->
      <!--            />-->
      <!--          </div>-->
      <!--        </b-col>-->
      <!--      </b-row>-->
    </b-container>
  </b-col>
</template>

<script>
import {VueGoodTable} from 'vue-good-table';
import {size} from "lodash";
import {mapActions, mapGetters, mapState} from "vuex";
import Vue from "vue";
export default {
  data(){
    return {
      assetType: [],
      selected: null,
      accountCodeList: [],
      fields: ['accountInnerCode', 'accountName'],
      dpts: {
        'administration' : '총무부',
        'sales' : '영업부',
        'Production': '생산부',
        'Procurement ': '구매부',
        'Human Resources ': '인사부',
        'Development ': '개발부',
        'Planning': '기획부',
        'Public Relations': '홍보부',
        'Technical ': '기술부'
      },
      columns: [
        {
          label: '자산코드',
          field: 'assetCode',
          width: '16%',
          tdClass :'text-center',
          thClass :'text-center',
        },
        {
          label: '자산분류코드',
          field: 'acctCode',
          width: '16%',
          style: 'text-align: center; , font-size: 12px;',
          tdClass :'text-center',
          thClass :'text-center',
        },
        {
          label: '자산분류명',
          field: 'acctName',
          width: '16%',
          tdClass :'text-center',
          thClass :'text-center',
        },
        {
          label: '자산명',
          field: 'assetName',
          width: '16%',
          tdClass :'text-center',
          thClass :'text-center',
        },
        {
          label: '인수날짜',
          field: 'progress', // acquisitionDate
          width: '16%',
          tdClass :'text-center',
          thClass :'text-center',

        },
        {
          label: '상태',
          field: 'finalizeStatus',
          width: '16%',
          tdClass :'text-center',
          thClass :'text-center',
        }
      ],
      rows: [],
      searchValue : '',
    };

  },
  computed: {
    /**
     * 이렇게 변수에 할당해서 사용한다면 위의 data에 선언필요 x
     */
    ...mapState('account/base', ['findCurrentAssetList']),
    ...mapGetters('account/base', ['GET_CURRENT_ASSET_LIST', 'GET_ASSET_CODE_LIST']),

  },

  created() {
    this.FETCH_CURRENT_ASSET_LIST(), this.FETCH_ASSET_CODE_LIST()
  },

  methods: {
    ...mapActions('account/base', ['FETCH_CURRENT_ASSET_LIST', 'FETCH_ASSET_CODE_LIST']),
    selectionChanged(params){
      console.log("params: " + params)
    },
    advanceSearch1(val) {
      this.searchValue = val
    },
    advanceSearch2(val) {
      this.searchValue = val
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
.custom-search{
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}
.test{
  display:flex;
  div{ padding-right: 10px; }
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
.b-container2{
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

</sty
