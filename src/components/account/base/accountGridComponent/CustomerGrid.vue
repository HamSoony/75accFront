<template>
  <b-card
      no-body
      style="font-family: '배달의민족 도현'; max-height: 1000px"

  >

    <div class="m-2">
      <b-row>
        <!-- Table Top -->
        <b-col
            cols="12"
            md="10"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
        >
          <template v-for="button in buttonlist">
            <b-button
                variant="primary"
                size="md"
                class="mr-1"
                @click="button.clickEvent"
            >
              {{ button.value }}
            </b-button>
          </template>
        </b-col>
        <b-col cols="12" md="2" class="text-md-right">
          <b-button style="white-space: nowrap;" @click="exlcelFile">
            엑셀로 내보내기
          </b-button>
        </b-col>
      </b-row>
    </div>

    <b-row />
    <div
        style="overflow-y: auto; overflow-x: auto; max-height: 100%; "

    >
      <b-table
          ref="table"
          :items="customerList"
          :fields="tableColumnsData"
          style="overflow: auto; width: 100%; max-height: 100% "
          show-empty
          empty-text="No matching records found"
          selectable
          :select-mode="selectMode"
          :sticky-header="true"
          @row-selected="onRowSelected"
          @row-clicked="itemCodeClick"
      />
    </div>
    <div class="mx-2 mb-2">
      <b-row />
    </div>
    <transition
        name="fade"
        mode="out-in"
    >
      <TableEditModal
          v-if="tableEditModal"
          :table-row-data="tableColumnsData"
          @close="closeEditModal"
          @input-modal="inputModal"
          @ok="inputDataModal"
      />
      <TableChangeModal
          v-if="tableChangeModal"
          :table-row-data="tableColumnsData"
          :item="item"
          @close="closeEditModal"
          @edit-modal="editModal"
          @ok="inputDataModal"
      />
    </transition>
  </b-card>
</template>

<script>
import TableEditModal from '@/components/common/modal/TableEditModal.vue'
import TableChangeModal from '@/components/common/modal/TableChangeModal.vue'
import Xlsx from 'xlsx'
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BAvatar,
  BBadge,
  BButton,
  BCard,
  BCol, BDropdown, BDropdownItem, BFormDatepicker,
  BFormInput, BInputGroup, BInputGroupAppend,
  BLink,
  BMedia, BPagination,
  BRow,
  BTable,
  BTableLite, BTooltip
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import SearchCustomerCode from '@/components/logistic/sales/SearchCustomerComponent.vue'
import {mapMutations, mapState} from 'vuex'

export default {
  components: {
    TableEditModal,
    TableChangeModal,
    BCardCode,
    BTableLite,
    vSelect,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BTooltip,
    BFormDatepicker,
    BInputGroup,
    BInputGroupAppend,

    SearchCustomerCode,
  },
  props: ['title', 'buttonlist', 'datepicker', 'searchCustomer', 'gridType', 'columnWidth', 'onlyOne'],
  computed: {
    // ...mapActions('logi/sales', ['searchContract']), 메소드에 선언해야함
    ...mapState({
      grid: state => state.grid,
      tableColumns: state => state.tableColumns,
      customerList: state => state.account.base.customerList
      /*       customerList: state => state['account/base/customerList'] */
    }),
  },
  data() {
    return {
      wpCode:'',
      cterName:'',
      cterCeo:'',
      businessLicenseNumber:'',
      cterBusinessConditions:'',
      cterBusinessItems:'',
      cterBasicAddress:'',
      gridData: [],
      tableColumnsData: [],
      startDate: '',
      endDate: '',
      searchMethod: '',
      registMethod: '',
      selectMode: 'single',
      customerCode:'',
      id:'',
      item : {},

      selectOption: [
        'single', 'multiple',
      ],
      componentState: '',
      tableEditModal: false,
      tableChangeModal: false,
    }
  },
  watch: {
    grid() {
      if (this.gridType === 'grid') {
        this.gridData = this.grid
      }
    },
  },
  created() {
    if (this.buttonlist !== undefined) {
      this.buttonlist.map(e => {
        if (e.event === 'add') {
          e.clickEvent = this.addButton
        } else if (e.event === 'search') {
          e.clickEvent = this.searchButton
        } else if (e.event === 'delete') {
          e.clickEvent = this.deleteButton
        } else if (e.event === 'save') {
          e.clickEvent = this.saveButton
        } else if (e.event === 'edit') {
          e.clickEvent = this.editButton
        }
      })
    }
    if (this.gridType === 'grid') {
      this.gridData = this.grid
      this.tableColumnsData = this.tableColumns
      this.componentState = 'grid'
    }
  },
  mounted() {
    /*    if (this.columnWidth === undefined) {
      this.$refs.table.style.width = this.columnWidth
    } */
  },
  methods: {
    ...mapMutations('account/base', ['ADD_CUSTOMER_CODE']),
    addButton() {
      console.log('추가버튼')
      this.tableEditModal = true
    },
    saveButton() {
      console.log('저장버튼')
      this.$emit('regist-data')
    },
    searchButton() {
      console.log('조회버튼')
      this.$emit('find-data')
      // this.$store.dispatch(this.method)
    },
    deleteButton(item) {
      console.log('삭제버튼')
      console.log('그리드에서item:',item)
      console.log('넘길거: ', this.id)
      let customerCode=this.id

      if(!customerCode){
        alert("행을 누르세용~~~")
        return
      }
      this.$emit('delete-data',customerCode)
    },
    editButton() {
      console.log('수정버튼')
      this.tableChangeModal = true
      console.log(this.item)
    },
    onRowSelected(val) {
      this.$emit('row-selected', val)
    },
    closeEditModal() {
      this.tableEditModal = false
      this.tableChangeModal = false
    },
    inputModal(rowData) {
      const row = {}
      row.rowData = rowData
      console.log(rowData)
      console.log("모달 rowData:::",row.rowData)
      row.gridType = this.gridType
      console.log("모달 gridType:::",row.gridType)
/*
      if (this.onlyOne === 'true') {
        this.$store.commit('ADD_ROW_ONLY_ONE', row)
      } else {
        this.$store.commit('ADD_ROW', row)
      }
*/

      this.$emit('input-modal', rowData)
      console.log('마지막emit::',rowData)
      console.log('거래처리스트',this.customerList)
      this.tableEditModal = false
      this.ADD_CUSTOMER_CODE(rowData)
    },
    editModal(){
      this.tableChangeModal = false
    },
    inputDataModal(){
    },
    itemCodeClick(item) {
      console.log("itemCodeClick 실행")
      console.log("itemList::::",item)
      console.log("item",item.id)
      this.id=item.id
      this.item=item

      /*       const newObject = item.detailCode

            this.itemCodeInput = newObject */
    },
    exlcelFile(){
      const workBook = Xlsx.utils.book_new() // 엑셀파일 하나생성
      const workSheet = Xlsx.utils.json_to_sheet(this.customerList) //엑셀 워크시트로 json 내보내기, 배열만 가능
      Xlsx.utils.book_append_sheet(workBook, workSheet, 'example') //workbook에 워크시트 추가, 시트명은 'example'
      Xlsx.writeFile(workBook, 'example.xlsx') // 엑셀 파일을 내보낸다. 엑셀 파일 저장명은 'example.xlsx'(확장자명까지 기입)
    }
  },
}
</script>
<style lang="scss">
@import '/src/@core/scss/vue/libs/vue-select';
@import '../../../../assets/scss/modal';
@import '../../../../assets/scss/scrollStyle';
</style>
