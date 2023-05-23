<template>
  <h2 style="font-size: 24px; font-weight: bold;">당기</h2>
  <b-row class="mb-sm-2">
    <b-col sm="1" class="text-sm-right"><b>1월</b></b-col>
    <b-col sm="2">
      <b-form-input v-model="january"></b-form-input>
    </b-col>
    <b-col sm="1" class="text-sm-right"><b>2월</b></b-col>
    <b-col sm="2">
      <b-form-input v-model="february"></b-form-input>
    </b-col>
    <b-col sm="1" class="text-sm-right"><b>3월</b></b-col>
    <b-col sm="2">
      <b-form-input v-model="march"></b-form-input>
    </b-col>
    <b-col sm="1" class="text-sm-right"><b>1분기</b></b-col>
    <b-col sm="2">
      <b-form-input disabled :value="firstQuarterTotal" ></b-form-input>
    </b-col>
  </b-row>

  <b-row class="mb-sm-2">
    <b-col sm="1" class="text-sm-right"><b>4월</b></b-col>
    <b-col sm="2">
      <b-form-input v-model="april"></b-form-input>
    </b-col>
    <b-col sm="1" class="text-sm-right"><b>5월</b></b-col>
    <b-col sm="2">
      <b-form-input v-model="may"></b-form-input>
    </b-col>
    <b-col sm="1" class="text-sm-right"><b>6월</b></b-col>
    <b-col sm="2">
      <b-form-input v-model="june"></b-form-input>
    </b-col>
    <b-col sm="1" class="text-sm-right"><b>2분기</b></b-col>
    <b-col sm="2">
      <b-form-input disabled :value="secondQuarterTotal"></b-form-input>
    </b-col>
  </b-row>

  <b-row class="mb-sm-2">
    <b-col sm="1" class="text-sm-right"><b>7월</b></b-col>
    <b-col sm="2">
      <b-form-input v-model="july"></b-form-input>
    </b-col>
    <b-col sm="1" class="text-sm-right"><b>8월</b></b-col>
    <b-col sm="2">
      <b-form-input v-model="august"></b-form-input>
    </b-col>
    <b-col sm="1" class="text-sm-right"><b>9월</b></b-col>
    <b-col sm="2">
      <b-form-input v-model="september"></b-form-input>
    </b-col>
    <b-col sm="1" class="text-sm-right"><b>3분기</b></b-col>
    <b-col sm="2">
      <b-form-input disabled :value="thirdQuarterTotal" ></b-form-input>
    </b-col>
  </b-row>

  <b-row class="mb-sm-2">
    <b-col sm="1" class="text-sm-right"><b>10월</b></b-col>
    <b-col sm="2">
      <b-form-input v-model="october"></b-form-input>
    </b-col>
    <b-col sm="1" class="text-sm-right"><b>11월</b></b-col>
    <b-col sm="2">
      <b-form-input v-model="november"></b-form-input>
    </b-col>
    <b-col sm="1" class="text-sm-right"><b>12월</b></b-col>
    <b-col sm="2">
      <b-form-input v-model="december"></b-form-input>
    </b-col>
    <b-col sm="1" class="text-sm-right"><b>4분기</b></b-col>
    <b-col sm="2">
      <b-form-input disabled :value="fourthQuarterTotal"></b-form-input>
    </b-col>


  </b-row>
  <b-row>
    <b-col sm="3" class="text-sm-right" ><b>합계</b></b-col>
    <b-col sm="4">
      <b-form-input disabled :value="QuarterTotal"></b-form-input>
    </b-col>
    <b-col sm="3" class="text-right">
      <b-button
          variant="relief-primary"
          @click="saveBudget"
      >
        저장
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "InsertBudget."
}
</script>

<style scoped>

</style>
