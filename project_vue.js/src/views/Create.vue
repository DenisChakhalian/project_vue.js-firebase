<template>
  <app-page title="Створити нову публікацію">

    <form @submit.prevent="onSubmit">
      <h1>Створити нову публікацію</h1>
      <div class="form-control" :class="{invalid: tError}">
        <label for="title">Назва публікації:</label>
        <input id="title" type="text" maxlength="150" v-model="title" @blur="tBlur">
        <div class="validation">
          <small v-if="tError">
            {{ tError }}
          </small>
        </div>
      </div>
      <div class="form-control">
        <label>Контент публікації:</label>
        <QuillEditor toolbar="full"
                     theme="snow"
                     contentType="html"
                     content=""
                     v-model:content="text"
        />
      </div>

      <div class="form-control" :class="{invalid: aError}">
        <label for="author">Автор публікації:</label>
        <input id="author" type="text" maxlength="100" v-model="author" @blur="aBlur">
        <div class="validation">
          <small v-if="aError">
            {{ aError }}
          </small>
        </div>
      </div>
      <button
          :disabled="!title || !author || !text"
          type="submit"
          class="btn btn-block btn-dark btn-fix"
      >Створити публікацію
      </button>
    </form>
  </app-page>
</template>

<script>

import AppPage from "@/components/ui/AppPage";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import {useRequestForm} from "@/use/request-form";


export default {

  setup() {
    return {...useRequestForm()}
  },
  components: {AppPage}
}
</script>

<style scoped>
form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
