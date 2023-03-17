<template>
  <form class="card" @submit.prevent="onSubmit">
    <h2>Увійти до панелі адміністратора</h2>
    <div class="alert alert-danger" v-if="errors && errors.value">
      {{ errors.value}}
    </div>
    <div :class="['form-control',{invalid: eError}]">
      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" @blur="eBlur" maxlength="66">
      <small v-if="eError">{{ eError }}</small>
    </div>

    <div :class="['form-control',{invalid: pError}]">
      <label for="password">Пароль:</label>
      <input type="password" id="password" v-model="password" @blur="pBlur" maxlength="50">
      <small v-if="pError">{{ pError }}</small>
    </div>

    <button class="btn btn-primary" type="submit"
            :disabled="isSubmitting || isTooManyAttempts || pError || eError || !email || !password">Увійти
    </button>
    <div class="text-danger" v-if="isTooManyAttempts">
      Вы слишком часто пытаетесь войти в вистему. Попробуйте позже.
    </div>
  </form>
</template>

<script>
import {useLoginForm} from "@/use/login-form";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import {error} from "@/utils/error";
import {computed} from "vue";

export default {
  setup() {
    document.title = `VueDeep`
    const route = useRoute();
    const store = useStore();

    if (route.query.message) {
      store.dispatch('setMessage', {
        value: error(route.query.message),
        type: 'alert-warning'
      })
    }
    return {...useLoginForm()}
  }
}
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 0 auto;
}
</style>