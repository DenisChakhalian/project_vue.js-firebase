import {useField, useForm} from "vee-validate";
import * as yup from "yup";
import {computed, watch} from "vue";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export function useLoginForm() {
    const store = useStore()
    const router = useRouter()
    const {handleSubmit, isSubmitting, submitCount} = useForm()

    const {value: email, errorMessage: eError, handleBlur: eBlur} = useField(
        'email',
        yup
            .string()
            .trim()
            .required('Введіть поле email.')
            .email('Поле email не коректно.')
    )

    const isTooManyAttempts = computed(() => submitCount.value >= 5)
    const errors = computed(() => store.state.error)

    watch(isTooManyAttempts, val => {
        if (val) {
            setTimeout(() => {
                submitCount.value = 0;
            }, 5000)
        }
    })

    const MIN_LENGTH = 6
    const MAX_LENGTH = 20

    const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
        'password',
        yup
            .string()
            .trim()
            .required('Введіть пароль.')
            .min(MIN_LENGTH, `Пароль має бути не менше ${MIN_LENGTH} символів.`)
            .max(MAX_LENGTH, `Пароль має бути не більше ${MAX_LENGTH} символів.`)
    )
    const onSubmit = handleSubmit(async values => {
        try {
            const response = await store.dispatch('auth/login', values)
        } catch (e) {
        }
    })
    return {
        email,
        password,
        eError,
        pError,
        eBlur,
        pBlur,
        onSubmit,
        isSubmitting,
        isTooManyAttempts,
        errors
    }
}