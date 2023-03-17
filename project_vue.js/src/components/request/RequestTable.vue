<template>
  <h4 v-if="requests.length===0" class="text-center">Заявок поки немає</h4>
  <div class="posts">
    <div v-for="(r,idx) in requests" :key="r.id">
      <div class="card">
        <div class="card-header">
          <h2>{{ r.title.length > 32 ? r.title.substring(0, 32) + '...' : r.title }}</h2>
          <small>{{ r.author.length > 20 ? r.author.substring(0, 20) + '...' : r.author }}</small>
        </div>

        <div>
          <small>{{ momentDate(r.date) }}</small>
        </div>
        <router-link v-slot="{navigate}" custom :to="{name: 'Request', params: {id: r.id}}">
          <button class="btn btn-dark" @click="navigate">Відкрити</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {currency} from "@/utils/currency";
import AppStatus from '../ui/AppStatus';
import {useRoute, useRouter} from "vue-router/dist/vue-router";
import {useStore} from "vuex";

import moment from 'moment-with-locales-es6';


export default {
  props: ['requests'],
  methods: {
    momentDate: date => {
      return moment(new Date(date)).locale("uk").format('DD.MM.YYYY')
    }
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    const remove = async id => {
      await store.dispatch('request/remove', id)
      await store.dispatch('request/load')

    }

    return {currency, remove}
  },
  components: {
    AppStatus
  }
}
</script>

<style scoped>

</style>