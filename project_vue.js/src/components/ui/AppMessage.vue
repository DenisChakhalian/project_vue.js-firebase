<template>
  <div class="alert-wrap" v-if="title">
    <div v-if="message" :class="['alert', message.type]">
      <p>{{ message.value }}</p>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex";
import {computed} from "vue";

export default {
  setup() {
    const store = useStore()
    const TITLE_MAP = {
      'alert-success': 'Успешно!',
      'alert-warning': 'Ошибка!',
      'alert-danger': 'Внимание!',
    }

    const message = computed(() => store.state.message)
    const title = computed(() => message.value ? TITLE_MAP[message.value.type] : null)

    return {message, title, close: () => store.commit('clearMessage')}
  }
}
</script>
<style scoped>

</style>