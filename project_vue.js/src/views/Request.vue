<template>
  <app-loader v-if="loading"></app-loader>
  <app-page title="Заявка" v-else-if="request">
    <div class="post">
      <div class="header">
        <button @click="goHome" class="btn btn-link">На головну</button>
        <h1> {{ request.title }}</h1>
      </div>
      <div class="info">
        <strong>{{ request.author }}</strong>
        <small>{{ momentDate(request.date) }}</small>
      </div>
      <p v-html="request.text"></p>
    </div>
  </app-page>
  <h3 v-else class="text-center text-white">
    Заявки з ID = {{ $route.params.id }} немає.
  </h3>
</template>

<script>

import {ref, onMounted, computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import AppPage from "@/components/ui/AppPage";
import AppLoader from "@/components/ui/AppLoader";
import AppStatus from "@/components/ui/AppStatus";
import {currency} from "@/utils/currency";
import moment from "moment-with-locales-es6";


export default {
  methods: {
    momentDate: date => {
      return moment(new Date(date)).locale("uk").format('D MMM. YYYY p., HH:mm:ss')
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const loading = ref(true)
    const request = ref({})
    const status = ref()
    const hasChanges = computed(() => request.value.status !== status.value)

    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('request/loadOne', route.params.id)
      status.value = request.value?.status
      loading.value = false
    })

    const remove = async () => {
      await store.dispatch('request/remove', route.params.id)
      router.push('/')
    }

    const update = async () => {
      const data = {...request.value, status: status.value, id: route.params.id}
      await store.dispatch('request/update', data)
      request.value.status = status.value
    }
    return {
      loading,
      request,
      currency,
      remove,
      update,
      status,
      hasChanges,
      goHome: () => router.push('/')
    }
  },
  components: {AppPage, AppLoader, AppStatus}
}

</script>

<style scoped>

</style>