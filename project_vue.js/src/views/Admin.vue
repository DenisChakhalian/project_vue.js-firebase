<template>
  <app-loader v-if="loading"/>
  <app-page v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>

    <request-filter v-model="filter"></request-filter>
    <request-admin-table :requests="requests"></request-admin-table>

<!--    <teleport to="body">-->
<!--      <app-modal v-if="modal" title="Создать заявку" @close="modal = false">-->
<!--        <request-modal @created="modal=false"/>-->
<!--      </app-modal>-->
<!--    </teleport>-->
  </app-page>
</template>

<script>
import {ref, computed, onMounted, watch} from "vue";
import {useStore} from "vuex";
import AppPage from "@/components/ui/AppPage";
import RequestFilter from "@/components/request/RequestFilter";
import AppModal from "@/components/ui/AppModal";
import AppLoader from "@/components/ui/AppLoader";
import RequestAdminTable from "@/components/request/RequestAdminTable";

export default {
  setup() {
    const store = useStore()
    const modal = ref(false)
    const loading = ref(false)
    const filter = ref({})

    onMounted(async () => {
      loading.value = true
      await store.dispatch('request/load')
      loading.value = false
    })

    const requests = computed(() => store.getters['request/requests']
        .filter(request => {
          if(!filter.value.title) return request

          return request.title.toLowerCase().includes(filter.value.title.toLowerCase())
        })
    )

    return {
      modal, requests, loading, filter
    }
  },
  components: {
    RequestAdminTable,
    AppLoader,
    AppModal,
    AppPage,
    RequestFilter
  }
}
</script>
