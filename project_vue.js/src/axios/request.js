import axios from "axios";
import router from '../router'


const requestAxios = axios.create({
    baseURL: ''                        //paste your databaseURL here
})

requestAxios.interceptors.response.use(null, error => {
    if (error.response.status === 401) {
        localStorage.removeItem('jwt-token')
        router.push('admin/auth?message=auth')
    }
    return Promise.reject(error);
});
export default requestAxios
