<template>
  <h4 v-if="requests.length===0" class="text-center">Заявок поки немає</h4>
  <div v-else class="adaptive-table">
    <table class="table">
      <thead>
      <tr>
        <th>#</th>
        <th>Назва</th>
        <th>Автор</th>
        <th>Дата</th>
        <th>Дія</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(r,idx) in requests" :key="r.id">
        <td>{{ idx + 1 }}</td>
        <td>{{ r.title.length > 20 ? r.title.substring(0, 20) + '...' : r.title }}</td>
        <td>{{ r.author.length > 20 ? r.author.substring(0, 20) + '...' : r.author }}</td>
        <td>{{ momentDate(r.date) }}</td>
        <td>
          <router-link v-slot="{navigate}" custom :to="{name: 'Edit', params: {id: r.id}}">
            <button class="btn btn-link open" @click="navigate">Відкрити</button>
          </router-link>
          <a @click="remove(r.id)">Видалити</a>
        </td>
      </tr>
      </tbody>
    </table>
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
      return moment(new Date(date)).locale("uk").format('D MMM. YYYY p., HH:mm:ss')
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