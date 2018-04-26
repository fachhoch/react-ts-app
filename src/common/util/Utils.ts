
    import IPromise = Axios.IPromise;
    import {EventEmitterImplIns} from "./EventEmitterImpl";
    import * as jquery from 'jquery/dist/jquery'
    //import {PageEvents} from "../components/page/ComponentModel";
    const AppProperties = <IOptions>window['bundleOptions'];

    export class UserToken{
        userName:string
        firstName:string
        lastName:string
        userId:number
        personId:number
        is508:boolean
    }
    interface IOptions {
        axiosBaseUrl: string
        basePath:string
        userToken:UserToken
        logoPath:string
        surveyUrl:string
        loadUser:boolean
        username:string
    }
    export const cacheBustUrl= (url:string):string=>{
        return url+"?t="+new Date();
    }

    export const getAppConfig=()=>{
        if(AppProperties){
            return AppProperties
        } else{
            let userTokenIns=<UserToken>{personId:491867,userId:115766,userName:'DT-user1'}
            userTokenIns.is508=true;
            return <IOptions>{
                    userId:123,
                username:'WKim',
                axiosBaseUrl:'/',
                basePath:'/',
                logoPath:'logo0.svg',
                userToken:userTokenIns,
                surveyUrl:'',
                loadUser:false
            };
        }
    }
    export class WindowDimensions{
        width:number;
        height:number;
        static create():WindowDimensions{
            let wd= new WindowDimensions();
            wd.width=jquery(window).width();
            wd.height=jquery(window).height();
            return wd;
        }

    }
    export let  windowHeightByPercent=(percent:number)=>{
        let w = 1200, h = 600;
        if (window.screen) {
            w = window.screen.availWidth * percent / 100;
            h = window.screen.availHeight * percent / 100;
        }
    }

    export function openWindow(url: string, name: string, percent: number) {
        let w = 630, h = 440;
        if (window.screen) {
            w = window.screen.availWidth * percent / 100;
            h = window.screen.availHeight * percent / 100;
        }
        window.open(url, name, 'width=' + w + ',height=' + h);
    }
    export function openWindowResizable(url: string, name: string, percent: number) {
        let w = 630, h = 440;
        if (window.screen) {
            w = window.screen.availWidth * percent / 100;
            h = window.screen.availHeight * percent / 100;
        }
        window.open(url, name, 'width=' + w + ',height=' + h +'scrollbars=yes,resizable=1');
    }

    export class IdHeler {
        index: number = 0;

        createId(name: string) {
            this.index = this.index + 1;
            return name + '_' + this.index;
        }
    }
    export const IdHelper = new IdHeler();

    export const blockUiAction=(callback:()=>IPromise<any>)=>{
        setTimeout(()=>{
            callback().then(()=>{
                EventEmitterImplIns.emit(PageEvents.UN_BLOCK_UI);
            });
        },0);
        EventEmitterImplIns.emit(PageEvents.BLOCK_UI);
    }
    export const updateAriaMsg=(msg:string)=>{
        EventEmitterImplIns.emit(PageEvents.ARIA_MSG,msg);
    }

   export const formatDateTime=(date:Date):string=>{
        return date?  new Date(Number(date)).toLocaleString("en-US") :"";
    }
    export const  formatDate=(date:Date):string=>{
        return date?  new Date(Number(date)).toLocaleDateString() :"";
    }


    export const formatMoney=(money:number):string=>{
        let nf=new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        });
        return nf.format(money);
    }
    export const PageEvents={
        BLOCK_UI:'PAGE_BLOCKUI',
        UN_BLOCK_UI:'PAGE_UN_BLOCK_UI',
        SHOW_ALERT:'SHOW_ALERT',
        CLOSE_ALERT:'CLOSE_ALERT',
        SHOW_CONFIRM:'SHOW_CONFIRM',
        CLOSE_COFIRM:'CLOSE_COFIRM',
        ARIA_MSG:'ARIA_MSG'

    }


    export const closeWindow=()=>{
        window.open('', '_self', ''); window.close();
    }
