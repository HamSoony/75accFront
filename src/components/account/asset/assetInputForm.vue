<template>
  <b-col class="form">
    <div class="important">주요등록사항</div>

    <div>
      <label for="name" style="display: inline-block; width: 30%;">취득원가</label>
      <input type="text" id="name" style="display: inline-block; width: 70%; border: 1px solid lightgray;">
    </div>
    <div>
      <label for="name" style="display: inline-block; width: 30%; ">전기말상각누계액</label>
      <input type="text" id="name" style="display: inline-block; width: 70%; border: 1px solid lightgray;">
    </div>
    <div>
      <label for="name" style="display: inline-block; width: 30%; ">전기말장부가액</label>
      <input type="text" id="name" style="display: inline-block; width: 70%; border: 1px solid lightgray;">
    </div>
    <b-row class="secondRow">
      <b-col>
        <div>
          <label for="name" style="display: inline-block; width: 30%; ">내용연수</label>
          <input type="text" id="name" style="display: inline-block; width: 70%; border: 1px solid lightgray;">
        </div>
        <div>
          <label for="name" style="display: inline-block; width: 30%; ">취득수량</label>
          <input type="text" id="name" style="display: inline-block; width: 70%; border: 1px solid lightgray;">
        </div>
        <div>
          <label for="name" style="display: inline-block; width: 30%; ">증감수량</label>
          <input type="text" id="name" style="display: inline-block; width: 70%; border: 1px solid lightgray;">
        </div>
      </b-col>
      <b-col>
        <div>
          <label for="name" style="display: inline-block; width: 30%; ">상각률</label>
          <input type="text" id="name" style="display: inline-block; width: 70%; border: 1px solid lightgray;">
        </div>
        <div>
          <label for="name" style="display: inline-block; width: 30%; ">월 수</label>
          <input type="text" id="name" style="display: inline-block; width: 70%; border: 1px solid lightgray;">
        </div>
        <div>
          <label for="name" style="display: inline-block; width: 30%; ">잔존수량</label>
          <input type="text" id="name" style="display: inline-block; width: 70%; border: 1px solid lightgray;">
        </div>
      </b-col>
    </b-row>
    <div>
      <label for="name" style="display: inline-block; width: 30%; ">일반상각비</label>
      <input type="text" id="name" style="display: inline-block; width: 70%; border: 1px solid lightgray;">
    </div>
    <div>
      <label for="name" style="display: inline-block; width: 30%; ">당기말상각누계액</label>
      <input type="text" id="name" style="display: inline-block; width: 70%; border: 1px solid lightgray;">
    </div>
    <div>
      <label for="name" style="display: inline-block; width: 30%; ">당기말장부가액</label>
      <input type="text" id="name" style="display: inline-block; width: 70%; border: 1px solid lightgray;">
    </div>
    <div>
      <label for="name" style="display: inline-block; width: 30%;">관리부서</label>
      <select id="department" name="department" style="display: inline-block; width: 70%; border: 1px solid lightgray;">
        <option value="departments" v-for="dpt in dpts" :key="dpt">{{dpt}}</option>
      </select>
    </div>
  </b-col>

</template>

<script>
export default {
  name: "assetInputForm"
}
</script>

<style scoped>
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