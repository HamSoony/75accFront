<template>
  <div style="font-family: 'Franklin Gothic Demi'">
    <div class="custom-search">
      <b-row>
        <b-col md="4">
          <b-form-group>
            <label>검색</label>
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
            @click="searchCostListList"
          >
            조회
          </b-button>
        </b-col>
      </b-row>

    </div>

    <!-- table -->

    <b-table
        :fields="fields"
        :items="costList"
    >

      <template #thead-top="data">
        <b-tr>
          <b-th></b-th>
          <b-th colspan="2" class="text-center">당&nbsp;&nbsp;&nbsp;&nbsp;기</b-th>
          <b-th colspan="2" class="text-center">전&nbsp;&nbsp;&nbsp;&nbsp;기</b-th>
        </b-tr>
      </template>

      <template v-slot:cell(cost)="data">
        <div class="text-center">{{ data.value }}</div>
      </template>
      <template v-slot:cell(costSummary)="data">
        <div class="text-center">{{ data.value | formatNumber }}</div>
      </template>
      <template v-slot:cell(earlyCost)="data">
        <div class="text-center">{{ data.value }}</div>
      </template>
      <template v-slot:cell(earlyCostSummary)="data">
        <div class="text-center">{{ data.value | formatNumber }}</div>
      </template>
    </b-table>


<!--    <div>-->
<!--      <vue-good-table-->
<!--        ref="myTable"-->
<!--        :columns="columns"-->
<!--        :rows="costList"-->
<!--        :pagination-options="{-->
<!--          enabled: true,-->
<!--          perPage:pageLength-->
<!--        }"-->
<!--        theme="black-rhino"-->
<!--      >-->
<!--        &lt;!&ndash; pagination &ndash;&gt;-->
<!--        <template-->
<!--          slot="pagination-bottom"-->
<!--          slot-scope="props"-->
<!--        >-->
<!--          <div class="d-flex justify-content-between flex-wrap">-->
<!--            <div class="d-flex align-items-center mb-0 mt-1">-->
<!--              <span class="text-nowrap">-->
<!--                Showing 1 to-->
<!--              </span>-->
<!--              <b-form-select-->
<!--                v-model="pageLength"-->
<!--                :options="['12','24','36']"-->
<!--                class="mx-1"-->
<!--                @input="(value)=>props.perPageChanged({currentPerPage:value})"-->
<!--              />-->
<!--              <span class="text-nowrap"> of {{ props.total }} entries </span>-->
<!--            </div>-->
<!--            <div>-->
<!--              <b-pagination-->
<!--                :value="1"-->
<!--                :total-rows="props.total"-->
<!--                :per-page="pageLength"-->
<!--                first-number-->
<!--                last-number-->
<!--                align="right"-->
<!--                prev-class="prev-item"-->
<!--                next-class="next-item"-->
<!--                class="mt-1 mb-0"-->
<!--                @input="(value)=>props.pageChanged({currentPage:value})"-->
<!--              >-->
<!--                <template #prev-text>-->
<!--                  <feather-icon-->
<!--                    icon="ChevronLeftIcon"-->
<!--                    size="18"-->
<!--                  />-->
<!--                </template>-->
<!--                <template #next-text>-->
<!--                  <feather-icon-->
<!--                    icon="ChevronRightIcon"-->
<!--                    size="18"-->
<!--                  />-->
<!--                </template>-->
<!--              </b-pagination>-->
<!--            </div>-->
<!--          </div>-->
<!--        </template>-->
<!--      </vue-good-table>-->
<!--    </div>-->

  </div>
</template>

<script>

import {
  BAvatar, BButton, BCol, BFormGroup, BFormInput, BFormSelect, BPagination, BRow, BTable,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { mapActions, mapMutations, mapState } from 'vuex'
import Vue from 'vue'
// eslint-disable-next-line import/extensions
import AccountCodeModal from '../../modal/AccountCodeModal'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    AccountCodeModal,
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
  },

  data() {
    return {
      pageLength: 12,

      fields:[
        {key: 'accountName', label: '과목'},
        {key: 'cost', label: '세부금액', thClass: "text-center"},
        {key: 'costSummary', label: '합계금액', thClass: "text-center",},
        {key: 'earlyCost', label: '세부금액', thClass: "text-center"},
        {key: 'earlyCostSummary', label: '합계금액', thClass: "text-center"},
      ],

      columns: [
        {
          label: '과목',
          field: 'accountName',
        },
        {
          label: '당기',
          field: '1',

        },
        {
          label: '세부금액',
          field: 'cost',
        },
        {
          label: '합계금액',
          field: 'costSummary',
        },
        {
          label: '전기',
          field: '2',
        },
        {
          label: '세부금액',
          field: 'earlyCost',
        },
        {
          label: '합계금액',
          field: 'earlyCostSummary',
        },
      ],
      rows: [],
      searchTerm: '',
      searchDate: '',
    }
  },
  computed: {
    /**
     * 이렇게 변수에 할당해서 사용한다면 위의 data에 선언필요 x
     */
    ...mapState('account/statement', ['costList']),

  },
  /**
   * 컴포넌트가 사라질때 호출되는 훅
   */
  beforeDestroy() {
    this.CLEAR_COST_LIST()
  },

  methods: {
    ...mapMutations('account/statement', ['CLEAR_COST_LIST']),
    ...mapActions('account/statement', ['FETCH_COST_LIST']),

    /**
     * 날짜에 따른 일 월계표 조회
     * 204 상태를 서버에서 보내준다 ( NO-CONTNET) 검색시 아무것도 발견하지 못했을때
     * 유효성체크
     */
    async searchCostListList() {
      if (this.searchDate === '') {
        Vue.$toast.info('검색일자를 정해주세요~')
        return
      }
      const response = await this.FETCH_COST_LIST(this.searchDate)
      if (response.status === 204) {
        Vue.$toast.info('검색결과가 존재하지 않습니다')
        this.CLEAR_COST_LIST()
      }
    },

  },
}
// 숫자 천단위구분 콤마
  Vue.filter('formatNumber', function(value) {
    if (value == null) {
      return '';
    }
    return Number(value).toLocaleString();
  });

</script>

<style lang="css">

</style>
