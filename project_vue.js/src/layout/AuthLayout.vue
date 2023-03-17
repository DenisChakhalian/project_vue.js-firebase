<template>
  <the-navbar/>
  <div class="container">
    <app-message/>
    <router-view/>
  </div>
</template>

<script>
import AppMessage from "@/components/ui/AppMessage";
import TheNavbar from "@/components/TheNavbar";

export default {
  components: {AppMessage, TheNavbar}
}
</script>

<style scoped>

</style>