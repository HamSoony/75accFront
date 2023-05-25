<template>
  <div>
test

  </div>
</template>

<script>

export default {
  name: "assetInputForm",

  data() {
    return {
      // rows: [
      //   {
      //     mode: 'span', // span means this header will span all columns
      //     label: 'Mammal', // this is the label that'll be used for the header
      //     html: false, // if this is true, label will be rendered as html
      //     children: [
      //       { name: 'Elephant', diet: 'herbivore', count: 5 },
      //       { name: 'Cat', diet: 'carnivore', count: 28 }
      //     ]
      //   }
      // ],
      // items: [
      //   {'과목': '부가세대급급', type2a: 10000, type2b: 10000, type3a: 8000, type3b: 8000},
      //   {'과목': '선납금', type2a: 2000000, type2b: 200000, type3a: 18000, type3b: 18000},
      //   {'과목': '소모품', type2a: 7000, type2b: 7000, type3a: 3000, type3b: 3000},
      //   {'과목': '정기예금', type2a: 40000, type2b: 40000, type3a: 38000, type3b: 38000},
      // ],
      // fields: [
      //   '과목',
      //   {key: 'type2a', label: '세부금액'},
      //   {key: 'type2b', label: '합계금액'},
      //   {key: 'type3a', label: '세부금액'},
      //   {key: 'type3b', label: '합계금액'}
      // ]
    }
  },
  methods: {
    sumCount: function (rowObj) {
      console.log(rowObj);
      let sum = 0;
      for (let i = 0; i < rowObj.children.length; i++) {
        sum += rowObj.children[i].count;
      }
      return sum;
    },
  }
}
</script>

<style scoped>

</style>
