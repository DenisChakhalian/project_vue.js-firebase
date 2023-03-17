<template>

  <nav class="navbar bg-primary">
    <h1>
      <a @click="goHome">Admin</a>
    </h1>
    <ul class="navbar-menu" v-if="token">
      <li>
        <router-link to="/admin">Головна</router-link>
      </li>
      <li>
        <router-link to="/admin/create">Створити</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Вийти</a>
      </li>
    </ul>
  </nav>
</template>

<script>

import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {computed} from "vue";


export default {

  setup() {
    const router = useRouter()
    const store = useStore()
    return {
      token: localStorage.getItem('jwt-token'),
      logout: () => {
        store.commit('auth/logout')
        router.push('admin/auth')
      },
      open: () => store.commit('openSidebar'),
      goHome: () => router.push('/')
    }
  }
}
</script>

<style scoped>

</style>