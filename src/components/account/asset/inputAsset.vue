<template>
  <div>
    <b-button v-b-modal.modal-lg variant="primary">자산등록</b-button>
    <b-modal id="modal-lg" size="lg" hide-footer>
      <template #modal-header>
        <h2>자산 등록양식</h2>
      </template>
      <b-container>
        <b-row class="mt-1">
          <b-col sm="2" class="text-sm-left"><b>사업장 </b></b-col>
          <b-col sm="4">
            <b-form-input></b-form-input>`
          </b-col>

          <b-col sm="2" class="text-sm-left"><b>관리부서 </b></b-col>
          <b-col sm="4">
            <b-form-input></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col sm="2" class="text-sm-left"><b>자산코드 </b></b-col>
          <b-col sm="4">
            <b-form-input></b-form-input>
          </b-col>

          <b-col sm="2" class="text-sm-left"><b>자산명 </b></b-col>
          <b-col sm="4">
            <b-form-input></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col sm="2" class="text-sm-left"><b>자산분류코드 </b></b-col>
          <b-col sm="4">
            <b-form-input></b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-left"><b>자산분류명 </b></b-col>
          <b-col sm="4">
            <b-form-input></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col sm="2" class="text-sm-left"><b>취득일자 </b></b-col>
          <b-col sm="4">
            <b-form-input
                v-model="ㅊ"
                placeholder="Search"
                type="date"
                class="d-inline-block"/>
          </b-col>
          <b-col sm="2" class="text-sm-left"><b>상태 </b></b-col>
          <b-col sm="4">
            <b-form-input></b-form-input>
          </b-col>

        </b-row>

        <b-row class="mt-1">
          <b-col sm="3" class="text-sm-left"><b>취득원가 </b></b-col>
          <b-col sm="9">
            <b-form-input></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col sm="3" class="text-sm-left"><b>전기말상각누계액 </b></b-col>
          <b-col sm="9">
            <b-form-input></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col sm="3" class="text-sm-left"><b>전기말장부가액 </b></b-col>
          <b-col sm="9">
            <b-form-input></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col sm="2" class="text-sm-left"><b>내용연수 </b></b-col>
          <b-col sm="4">
            <b-form-input></b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-left"><b>개월수 </b></b-col>
          <b-col sm="4">
            <b-form-input></b-form-input>
          </b-col>
        </b-row>
        <b-row class="mt-1">
          <b-col sm="2" class="text-sm-left"><b>취득수량 </b></b-col>
          <b-col sm="4">
            <b-form-input></b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-left"><b>증감수량 </b></b-col>
          <b-col sm="4">
            <b-form-input></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col sm="2" class="text-sm-left"><b>잔존수량 </b></b-col>
          <b-col sm="4">
            <b-form-input></b-form-input>
          </b-col>
          <b-col sm="2" class="text-sm-left"><b>감가비율 </b></b-col>
          <b-col sm="4">
            <b-form-input></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col sm="3" class="text-sm-left"><b>감가삼각비용 </b></b-col>
          <b-col sm="9">
            <b-form-input></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col sm="3" class="text-sm-left"><b>당기말상각누계액 </b></b-col>
          <b-col sm="9">
            <b-form-input></b-form-input>
          </b-col>
        </b-row>

        <b-row class="mt-1">
          <b-col sm="3" class="text-sm-left"><b>당기말장부가액 </b></b-col>
          <b-col sm="9">
            <b-form-input></b-form-input>
          </b-col>
        </b-row>


      </b-container>
      <b-button
        class="mt-3"
        @click="$bvModal.hide('modal-lg')"
        style="margin-right: 10px">저장</b-button>
      <b-button
        class="mt-3"
        @click="$bvModal.hide('modal-lg')">취소</b-button>
    </b-modal>
  </div>
</template>

<script>
import textStyle from "echarts/src/model/mixin/textStyle";

export default {
  name: 'inputAsset',
  computed: {
    textStyle() {
      return textStyle
    }
  },
  data() {
    return {
      progress: '',

    }
  },
}
</script>

<style scoped>

</style>
