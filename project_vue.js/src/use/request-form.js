import {useField, useForm} from "vee-validate";
import * as yup from 'yup'
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export function useRequestForm() {
    const {isSubmitting, handleSubmit} = useForm();
    const store = useStore();
    const router = useRouter();
    const {value: author, errorMessage: aError, handleBlur: aBlur} = useField(
        'author',
        yup.string()
            .trim()
            .required('Введіть автора публікації.')
    );
    const {value: title, errorMessage: tError, handleBlur: tBlur} = useField(
        'title',
        yup.string()
            .trim()
            .required('Введіть назву публікації.')
    );
    const {value: text, errorMessage: txtError, handleBlur: txtBlur} = useField(
        'text',
        yup.string()
            .trim()
            .required()
    );

    const onSubmit = handleSubmit(async values => {
        try {
            await store.dispatch('request/create', {...values, date: new Date()})
            router.push('/admin')
        } catch (e) {
        }
    });

    return {
        isSubmitting,
        onSubmit,
        author,
        aError,
        aBlur,
        title,
        text,
        tError,
        tBlur,

    }
}