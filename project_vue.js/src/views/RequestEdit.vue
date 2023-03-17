<template>
  <app-loader v-if="loading"></app-loader>
  <app-page title="Заявка" v-else-if="request">
    <form @submit.prevent="update">
      <div class="form-control">
        <label for="title">Назва публікації:</label>
        <input id="title"
               type="text"
               maxlength="150"
               name="title"
               v-model="titleRef"
        >

        <div class="validation">
          <small v-if="!titleRef">
            Введіть назву публікації.
          </small>
        </div>
      </div>
      <div class="form-control">
        <QuillEditor
            toolbar="full"
            theme="snow"
            name="text"
            :content="textRef"
            content-type="html"
            v-model:content="textRef"
        ></QuillEditor>
      </div>

      <button
          class="btn btn-primary btn-edit btn-fix"
          type="submit"
      >Змінити
      </button>
    </form>

  </app-page>
  <h3 v-else class="text-center text-white">
    Заявки з ID = {{ $route.params.id }} немає.
  </h3>
</template>

<script>

import {ref, onMounted, computed} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useStore} from "vuex";
import AppPage from "@/components/ui/AppPage";
import AppLoader from "@/components/ui/AppLoader";
import AppStatus from "@/components/ui/AppStatus";
import {currency} from "@/utils/currency";
import {QuillEditor} from "@vueup/vue-quill";
import {useRequestForm} from "@/use/request-form";


export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const loading = ref(true);
    const request = ref({});
    const titleRef = ref('');
    const textRef = ref('');
    const hasChanges = computed(() => request.value.status !== status.value);

    onMounted(async () => {
      loading.value = true;
      request.value = await store.dispatch('request/loadOne', route.params.id);
      loading.value = false;
      titleRef.value = request.value.title;
      textRef.value = request.value.text;
    });

    const remove = async () => {
      await store.dispatch('request/remove', route.params.id)
      router.push('/')
    }

    const update = async () => {
      const data = {
        ...request.value,
        title: titleRef.value,
        text: textRef.value,
        id: route.params.id
      }
      await store.dispatch('request/update', data)
    }


    return {
      loading,
      request,
      currency,
      remove,
      update,
      titleRef,
      textRef,
      hasChanges,
      goHome: () => router.push('/'),
      ...useRequestForm(),
      // triggerChange,
    }
  },
  components: {QuillEditor, AppPage, AppLoader, AppStatus}
}

</script>

<style scoped>

</style>