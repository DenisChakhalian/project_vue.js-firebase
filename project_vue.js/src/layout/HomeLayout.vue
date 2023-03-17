<template>
  <nav class="navbar main">
    <h1>Vue.js Блог</h1>
  </nav>
  <div class="container with-nav">
    <router-view/>
  </div>
</template>

<script>
import TheNavbar from "@/components/TheNavbar";


export default {
  components: {TheNavbar}
}
</script>

<style scoped>

</style>