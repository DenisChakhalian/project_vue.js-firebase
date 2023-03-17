<template>
  <component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import {computed} from "vue";
import {useRoute} from 'vue-router'
import AdminLayout from "@/layout/AdminLayout";
import AuthLayout from "@/layout/AuthLayout";
import HomeLayout from "@/layout/HomeLayout";

export default {
  setup() {
    const route = useRoute()

    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: {
    AdminLayout,
    AuthLayout,
    HomeLayout
  }
}
</script>