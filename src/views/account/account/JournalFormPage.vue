<template>
  <div>
    <JournalForm />
  </div>
</template>

<script>
import JournalForm from '@/components/account/account/Journal/JournalForm.vue'

export default {
  components: {
    JournalForm,
  },

  props: {
    SlipNo: {
      type: String,
      required: true,
    },
  },
  created() {
    this.fetchSlipData()
  },
  methods: {
    async  fetchSlipData() {
      await this.$store.dispatch('account/account/FETCH_SLIP', this.SlipNo)
    },
  },
}
</script>

<style>

</style>
