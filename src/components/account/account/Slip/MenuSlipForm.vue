<template>

  <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
    <b-button-group>
      <b-button
        v-show="activeButton==='addSlip'"
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        v-b-modal.openAddSlipModal
        variant="primary"
        :disabled="addBtStatus"
      >
        전표추가
      </b-button>
      <b-button
        v-if="activeButton==='addSlip'"
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        v-b-modal.openAddJounalModal
        :disabled="!addBtStatus || addJournalBt"
        variant="primary"
      >
        분개추가
      </b-button>
      <b-button
          v-if="false"
          variant="relief-primary"
          class="bt"
          @click="editJouranDetail"
      >
        분개상세수정
      </b-button>
      <b-button
        v-show="activeButton==='searchSlip'"
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        @click="changeAddFormPage"
      >
        전표추가
      </b-button>
      <b-button
        v-if="activeButton==='searchSlip'"
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        @click="$emit('deleteItem')"
      >
        전표삭제
      </b-button>
      <b-button
        v-if="activeButton==='searchSlip'"
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        @click="$emit('editItem')"
      >
        전표수정
      </b-button>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        style=" float: right"
        :disabled="!saveBt"
        @click="$emit('submitResult')"
      >저장
      </b-button>
    </b-button-group>
  </b-button-toolbar>
</template>

<script>
import {
  BButtonToolbar, BButtonGroup, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import Vue from "vue";

export default {
  components: {
    BButtonToolbar,
    BButtonGroup,
    BButton,

  },
  directives: {
    Ripple,
  },
  props: ['activeButton', 'addBtStatus', 'addJournalBt', 'saveBt'],

  methods: {

    changeAddFormPage() {
      this.$router.push({ name: 'addSlipForm' })
    },
    editJouranDetail() {
      console.log("분개상세")

        this.$root.$emit('bv::show::modal', 'openEditJounalDetailModal', '#focusThisOnClose')

    }

  },
}
</script>
<style scoped>
.ss{
    float: right;
}
</style>
