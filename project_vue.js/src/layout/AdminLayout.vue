<template>
  <the-navbar/>
  <div class="container with-nav">
    <app-message/>
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";

import AppMessage from "@/components/ui/AppMessage";

export default {
  components: {AppMessage, TheNavbar}
}
</script>

<style scoped>

</style>
