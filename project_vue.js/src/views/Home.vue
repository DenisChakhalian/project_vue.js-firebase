<template>
  <app-loader v-if="loading"/>
  <app-page v-else>

    <request-table :requests="requests"></request-table>

  </app-page>
</template>

<script>
import {ref, onMounted, computed} from "vue";
import {useStore} from "vuex";
import AppPage from "@/components/ui/AppPage";
import RequestTable from "@/components/request/RequestTable";
import RequestFilter from "@/components/request/RequestFilter";
import AppModal from "@/components/ui/AppModal";
import AppLoader from "@/components/ui/AppLoader";

export default {
  setup() {
    const store = useStore()
    const loading = ref(false)


    onMounted(async () => {
      loading.value = true
      await store.dispatch('request/load')
      loading.value = false
    })

    const requests = computed(() => store.getters['request/requests'])


    return {
      loading, requests
    }
  },
  components: {
    AppLoader,
    AppModal,
    AppPage,
    RequestTable,
    RequestFilter
  }
}
</script>
