
import * as axios from 'axios';
import * as AppUtil from './Utils';
import {EventEmitterImplIns} from "./EventEmitterImpl";
import {PageEvents} from "./Utils";

    export const axoisLocal = axios.create({});

    function interceptors(axiosIns) {
        axiosIns.interceptors.request.use(function (config) {
            return config;
        }, function (error) {
            alert('failed to process request ' + error)
            return Promise.reject(error);
        });
        axiosIns.interceptors.response.use(function (response) {
            if (response.data) {
                let sesionExpired = response.data.toString().match('<html');
                if (sesionExpired) {
                    //throw new Error('Invalid response received '+response.data);
                    window.location.href = AppUtil.getAppConfig().axiosBaseUrl;
                }
            }
            return response;

        }, function (error) {
            console.log(error);
            EventEmitterImplIns.emit(PageEvents.UN_BLOCK_UI);
            alert('failed to process request ' + error)
            //throw new Error(error);
            return Promise.reject(error);
        });
    }

    class AxiosDownWrapper {

        get(url: string) {
            return createAID().get(url);
        }

        post(url: string, object: any) {
            return createAID().post(url, object);
        }
    }
    class AxiosWrapper {
        get(url: string) {
            return createAI().get(url);
        }

        post(url: string, object: any) {
            return createAI().post(url, object);
        }

    }
    function createAI() {
        let axiosIns;
        if (AppUtil.getAppConfig()) {
            axiosIns = axios.create({
                baseURL: AppUtil.getAppConfig().axiosBaseUrl
            })
        } else {
            axiosIns = axios.create({})
        }
        //axiosIns = axios.create({})
        interceptors(axiosIns);
        return axiosIns;
    }

    export const axiosIns = createAI();

    function createAID() {
        let options = window['bundleOptions'];
        let axiosIns;
        if (options && options.axiosBaseUrl) {
            axiosIns = axios.create({
                baseURL: options.axiosBaseUrl,
                responseType: 'arraybuffer'
            })
        } else {
            axiosIns = axios.create({
                responseType: 'arraybuffer'
            })
        }
        interceptors(axiosIns);
        return axiosIns;
    }

    export const axiosDownloadIns = createAID();
    export const AxiosClass = axios;
