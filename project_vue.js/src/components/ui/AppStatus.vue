<template>
  <span :class="['badge', className]">{{ text }}</span>
</template>

<script>
import {ref, watch} from 'vue'

export default {
  props: {
    type: {
      String,
      required: true,
      validator(value) {
        return ['active', 'cancelled', 'done', 'pending'].includes(value)
      }
    }
  },

  setup(props) {
    const classesMap = {
      active: 'alert-success',
      cancelled: 'alert-danger',
      done: 'alert-success',
      pending: 'alert-warning'
    }

    const textMap = {
      active: 'Активен',
      cancelled: 'Отменен',
      done: 'Завершен',
      pending: 'Выполняется'
    }

    watch(props, val => {
      className.value = classesMap[val.type]
      text.value = textMap[val.type]
    })

    const className = ref(classesMap[props.type])
    const text = ref(textMap[props.type])

    return {
      className,
      text
    }
  }
}
</script>

<style scoped>

</style>