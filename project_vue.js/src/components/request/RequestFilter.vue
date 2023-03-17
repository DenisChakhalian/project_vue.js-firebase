<template>
  <div class="filter">
    <div class="form-control">
      <input type="text" placeholder="Знайти публікацію..." v-model="title">
    </div>
  </div>
</template>

<script>

import {ref, watch} from "vue";

export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup(_, {emit}) {
    const title = ref()

    watch([title], values => {
      emit('update:modelValue', {
        title: values[0],
      })
    })

    return {
      title,
    }
  }
}
</script>

<style scoped>

</style>