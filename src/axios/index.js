import axios from 'axios';

export default class Axios {

    axiosInstance = null;

    vm = null;

    constructor() {

        this.axiosInstance = axios.create({
            baseURL: webgca.clientUrl + '/api/v1/formulario',
            timeout: 300000,
            headers: {
                common: {
                    Authorization: `Token ${webgca.userToken}`
                },
            }
        });

        this.axiosInstance.interceptors.request.use(
            (config) => {
                return config;
            },
            (error) => {
                // Do something with request error
                return Promise.reject(error);
            }
        );

        this.axiosInstance.interceptors.response.use(
            (response) => {
                // Any status code that lie within the range of 2xx cause this function to trigger
                // Do something with response data
                return response;
            },
            (error) => {
                // Any status codes that falls outside the range of 2xx cause this function to trigger
                // Do something with response error
                return Promise.reject(error);
            }
        );

        return this;

    }

    getAxiosInstance() {
        return this.axiosInstance;
    }

    setVm(vm) {
        this.vm = vm;
    }

}