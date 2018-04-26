import IPromise = Axios.IPromise;
import {axiosIns} from "./common/util/AxiosUtil";
import {AbstractComponent} from "./common/components/page/ComponentUi";
import {AbstractComponentController} from "./common/components/page/ComponentModel";



export interface IVideoResponse {
    etag: string;
    id: IVideoId;
    kind: string;
    snippet: IVideoSnippet;
}

export interface IVideoId {
    kind:string;
    videoId:string;
}

export interface IVideoSnippet {
    channelId: string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishedAt: string;
    thumbnails: IVideoThumbnails;
    title: string;
}

export interface IVideoThumbnails {
    default: IThumbnail;
    high: IThumbnail;
    medium: IThumbnail;
}

export interface IThumbnail {
    url: string;
}
const  searchkey="AIzaSyAELht_qgjwMP5U6QTEtfkACjWtT8OpGBY";

export class SearchResCntrl  extends   AbstractComponentController<SearchResCntrl>{
    searchItem:string
    maxResults:number=25;
    results:VideoCntrl[]
    doSearch():IPromise<void>{
        let ci=this;
        let url=encodeURI(`https://www.googleapis.com/youtube/v3/search?q=${ci.searchItem}&maxResults=${ci.maxResults}&part=snippet&key=${searchkey}`)
        ci.results=[];
        return axiosIns.get(url).then((res:any)=>{
            res.data.items.forEach(item=>{
                ci.results.push(new VideoCntrl(item));
            })
        })
    }
}
export const VideoThumbnailType={
    default:"default",
    high:"high",
    medium:"medium"
}

export class VideoCntrl   extends   AbstractComponentController<VideoCntrl>{
    vd:IVideoResponse
    showVideoIframe:boolean;
    videoThumbnail:string=VideoThumbnailType.default;
    constructor(vd:IVideoResponse){
        super();
        this.vd=vd;
    }
    onclickPlay(){
        this.showVideoIframe=true;
    }
    onclickClose(){
        this.showVideoIframe=false;
    }
}


export class  AppCntrl extends AbstractComponentController<AppCntrl>{
    searchResCntrls:SearchResCntrl[]=[]
    searchItem:string
    activeTab:number=0;
    searchClickHandler(){
        let searchResCntrl= new SearchResCntrl();
        searchResCntrl.searchItem=this.searchItem;
        this.searchResCntrls.push(searchResCntrl);
        this.activeTab=this.searchResCntrls.length-1;
    }
    clearSearch(){
        this.searchResCntrls=[];
    }
}
export let AppCntrlIns= new AppCntrl();
