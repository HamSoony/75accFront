<template>
  <div>
    <div>
      <MenuSlipForm
          style="justify-content: end"
          :active-button="activeButton"
          :add-bt-status="addBtStatus"
          :add-journal-bt="addJournalBt"
          :saveBt="saveBt"
          @submitResult="submit"
      />

      <h1>전표</h1>
      <b-table
          :items="newSlipForm"
          :fields="slipFiled"
      >
      </b-table>
      <h1>분개 </h1>
      <b-table
          :items="newJournalForm"
          :fields="journalFiled"
          striped
          responsive
          selectable
          select-mode="single"
          @row-clicked="JournalClicked"
      >

        <template #cell(acctInnerCode)="data">
          <b-form-input v-if="newJournalForm[data.index].isEdit && selectedCell === 'accountCode'" type="text" v-model="newJournalForm[data.index].acctInnerCode" @blur="editCellBlur(data)" ></b-form-input>
          <span v-else v-b-modal.cellAccountCode @click="setEditIndex(data.index)">{{data.value}}</span>
        </template>
        <template #cell(balanceDivision)="data">
          <b-form-select v-if="newJournalForm[data.index].isEdit && selectedCell === 'balanceDivision'" type="text" v-model="newJournalForm[data.index].balanceDivision" @change="editCellBlur(data)">
            <option v-for="option in options" :value="option.value">{{option.text}}</option>
          </b-form-select>
          <span v-else @click="editCellHandler(data, 'balanceDivision')">{{data.value}}</span>
        </template>
        <template #cell(cterCode)="data">
          <b-form-input v-if="newJournalForm[data.index].isEdit && selectedCell === 'customerCode'" type="text" v-model="newJournalForm[data.index].cterCode" @blur="editCellBlur(data)" ></b-form-input>
          <span v-else v-b-modal.CustomerCode2 @click="setEditIndex(data.index)">{{data.value}}</span>
        </template>
        <template #cell(leftDebtorPrice)="data">
          <b-form-input v-if="newJournalForm[data.index].isEdit && selectedCell === 'leftDebtorPrice'" type="text" v-model="newJournalForm[data.index].leftDebtorPrice" @blur="editCellBlur(data)" ></b-form-input>
          <span v-else @click="editCellHandler(data, 'leftDebtorPrice')">{{data.value}}</span>
        </template>
        <template #cell(rightCreditsPrice)="data">
          <b-form-input v-if="newJournalForm[data.index].isEdit && selectedCell === 'rightCreditsPrice'" type="text" v-model="newJournalForm[data.index].rightCreditsPrice" @blur="editCellBlur(data)" ></b-form-input>
          <span v-else @click="editCellHandler(data, 'rightCreditsPrice')">{{data.value}}</span>
        </template>



      </b-table>

      <h1>분개상세 </h1>

      <b-row>
        프로젝트
        <b-col md="1" ><input type="text" v-model:value="newJournalDetailForm.wpCode" @click="showWorkPlaceModal" /></b-col>
        <b-col md="2"><input size="10" type="text" v-model:value="newJournalDetailForm.wpName" @click="showWorkPlaceModal" /></b-col>
        사용부서
        <b-col md="1"><input type="text" v-model:value="newJournalDetailForm.deptCode" @click="showDepartmentModal" /></b-col>
        <b-col md="3"><input type="text" v-model:value="newJournalDetailForm.deptName" @click="showDepartmentModal" /></b-col>
        관리번호
        <b-col md="1"><input type="text" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>
      </b-row>

      <b-row class="mt-1">
        요청일
        <b-col md="2" ><input type="text" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>
        상환일
        <b-col md="2"><input type="text" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>
        환종
        <b-col md="1"><input type="text" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>
        <b-col md="2"><input type="text" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>
        환율
        <b-col md="1"><input type="text" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>
      </b-row>

      <b-row class="mt-1">
        외화금액
        <b-col md="2" ><input type="text" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>
        관리율
        <b-col md="2"><input type="text" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>
        사용자정의
        <b-col md="1"><input type="text" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>
        <b-col md="1"><input type="text" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>
        사용자정의
        <b-col md="1"><input type="text" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>
        <b-col md="1"><input type="text" size="10" v-model:value="newJournalDetailForm.accountControlName" :disabled="detailDisabled" /></b-col>
      </b-row>

      <div />

    </div>

    <div>
      <h1> 총 합 </h1>
      <b-row>
        <b-col>
          <b-table :items="leftJournalList"
                   :fields="totalLeftForm"
                   striped
                   responsive
                   v-model=leftJournalList

          />
        </b-col>
        <b-col>
          <b-table
              :items="rightJournalList"
              :fields="totalRightForm"
              striped
              responsive
              v-model=rightJournalList
          />
        </b-col>
      </b-row>

    </div>



    <div>
      <!-- 모달은 id 이용-->
      <!-- 전표추가 모달-->
      <!--하나의 inputForm 태그 사용 < 조건을 props로 내려줌>-->
      <b-modal
          id="openAddSlipModal"
          title="전표추가"
          @ok="completeSilpForm"
      >
        <p class="my-5">
          <InputForm
              ref="inputSlipForm"
              modal-status="addSlip"
          />
        </p>
      </b-modal>
      <!-- 분개추가 모달 -->
      <b-modal
          id="openAddJounalModal"
          title="분개추가"
          @ok="completeJounalForm"
      >
        <p class="my-5">
          <InputForm
              ref="inputJounalForm"
              modal-status="addJounal"
          />
        </p>
      </b-modal>
      <!--분개상세 모달 -->
      <b-modal
          id="openAddJounalDetailModal"
          title="분개상세추가"
          @ok="completeJounalDetailForm"
      >
        <p class="my-5">
          <InputForm
              ref="inputJounalDetailForm"
              modal-status="addJounalDetail"
          />
        </p>
      </b-modal>

      <!-- 계정코드 모달-->
      <b-modal
          id="cellAccountCode"
          ref="accountModal"
          :title="'계정코드찾기'"
      >
        <p class="my-5">
          <AccountCodeModal2
              v-model:value="resultAccountCode"
              :condition="'accountCode'"
          />
        </p>
      </b-modal>

      <b-modal
          id="CustomerCode2"
          ref="accountModal"
          title="거래처코드"
      >
        <p class="my-5">
          <AccountCustomerCodeModal2
              v-model:value="resultCustomerCode"

          />
        </p>
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
          title="거래처코드"
      >
        <p class="my-5">
          <DepartmentModal
              v-model:value="departmentSelectedData"
              @input="DepartmentModalRowClick"

          />
        </p>
      </b-modal>




    </div>

  </div>
</template>
