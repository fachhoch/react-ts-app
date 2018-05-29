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
const  searchkey="AIzaSyBYYNxRQzLXxSn9bkgFdgiv-NObHqEw5Ps";
const SearchType={
    QUERY:"QUERY",
    CHANNEL:"CHANNEL",
    USER:"USER",
    REALTED:"REALTED"
}
class SearchReq{
    searchItem:string
    searchDisplay:string
    searchType:string
    location:boolean
}
export class SearchResCntrl  extends   AbstractComponentController<SearchResCntrl>{
    maxResults:number=25;
    searchReq:SearchReq
    results:VideoCntrl[]
    rc:React.Component<any,any>;
    constructor(searchReq:SearchReq){
        super();
        this.searchReq=searchReq;
    }
    getGeoLocation():IPromise<void>{
        /*return axiosIns.get(`https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyDysdXaIQ6xgAamPc8lIsBMz5Syi69mCEg`).then((res:any)=>{
            console.log(res.data);
        })*/
        return Promise.resolve();
    }
    doSearch():IPromise<void>{
        let ci=this;
        let queryUrl=():string=>{
            return `https://www.googleapis.com/youtube/v3/search?q=${ci.searchReq.searchItem}&maxResults=${ci.maxResults}&part=snippet&key=${searchkey}`
        }
        let channelUrl=()=>{
            return `https://www.googleapis.com/youtube/v3/search?channelId=${ci.searchReq.searchItem}&maxResults=${ci.maxResults}&part=snippet&key=${searchkey}`
        }
        let  relatedUrl=()=>{
            return `https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${ci.searchReq.searchItem}&maxResults=${ci.maxResults}&part=snippet&key=${searchkey}&type=video`
        }
        ci.results=[];
        let url="";
        if(this.searchReq.searchType===SearchType.QUERY){
            url=queryUrl();
        }else if(this.searchReq.searchType===SearchType.CHANNEL){
            url=channelUrl();
        } else if(this.searchReq.searchType===SearchType.REALTED){
            url=relatedUrl();
        }
        return axiosIns.get(encodeURI(url)).then((res:any)=>{
            //ci.getGeoLocation();
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


export class FamilyVideoCntrl extends   AbstractComponentController<FamilyVideoCntrl>{
    searchResCntrls:SearchResCntrl[]=[]
    activeTab:number=0;
    delTabIndex:number;
    videoCnrl:VideoCntrl;
    closeTab(){
        let ci=this;
        ci.searchResCntrls.splice(ci.delTabIndex,1);
        if(ci.delTabIndex===0) {
            this.activeTab = 0;
        }else{
            this.activeTab = ci.delTabIndex-1;
        }
        ci.delTabIndex=-1;
        if(ci.searchResCntrls.length===0){
            ci.videoCnrl.repaint();
        }
    }
}
export class VideoCntrl   extends   AbstractComponentController<VideoCntrl>{
    vd:IVideoResponse
    showVideoIframe:boolean;
    videoThumbnail:string=VideoThumbnailType.default;
    disableChannelBtn:boolean;
    disableRelBtn:boolean;
    familyVideoCntrl:FamilyVideoCntrl= new FamilyVideoCntrl();
    rc:React.Component<any,any>;
    constructor(vd:IVideoResponse){
        super();
        this.vd=vd;
        this.familyVideoCntrl.videoCnrl=this;
    }
    repaint(){
        this.rc.setState(new Object());
    }
    channelVideosOpen():boolean{
        let ci=this;
        return ci.familyVideoCntrl.searchResCntrls.filter(sc=>sc.searchReq.searchType===SearchType.CHANNEL).length!==0;
    }

    realtedVideosOpen():boolean{
        let ci=this;
        return ci.familyVideoCntrl.searchResCntrls.filter(sc=>sc.searchReq.searchType===SearchType.REALTED).length!==0;
    }
    onclickPlay(){
        this.showVideoIframe=true;
    }
    onclickClose(){
        this.showVideoIframe=false;
    }
    searchChannelHandler(){
        let searchReq= new SearchReq();
        searchReq.searchType=SearchType.CHANNEL;
        searchReq.searchItem=this.vd.snippet.channelId;
        searchReq.searchDisplay=`Videos from channel for video ${this.vd.snippet.title}`;
        let searResCntrl=new SearchResCntrl(searchReq);
        //AppCntrlIns.searchResCntrls.push(searResCntrl);
        //AppCntrlIns.repaintUi()
        this.familyVideoCntrl.searchResCntrls.push(searResCntrl);
    }

    searchRelatedVideo(){
        let searchReq= new SearchReq();
        searchReq.searchType=SearchType.REALTED;
        searchReq.searchItem=this.vd.id.videoId;
        searchReq.searchDisplay=`Realted videos for video ${this.vd.snippet.title}`;
        let searResCntrl=new SearchResCntrl(searchReq);
        //AppCntrlIns.searchResCntrls.push(searResCntrl);
        //AppCntrlIns.repaintUi()
        this.familyVideoCntrl.searchResCntrls.push(searResCntrl);
    }

}


export class  AppCntrl extends AbstractComponentController<AppCntrl>{
    searchResCntrls:SearchResCntrl[]=[]
    searchItem:string
    activeTab:number=0;
    rc:React.Component<any,any>
    delTabIndex:number=-1;
    searchClickHandler(){
        let searchReq= new SearchReq();
        searchReq.searchType=SearchType.QUERY;
        searchReq.searchItem=this.searchItem
        searchReq.searchDisplay=`Videos for search text ${this.searchItem}`;
        let searchResCntrl= new SearchResCntrl(searchReq);
        this.searchResCntrls.push(searchResCntrl);
        this.activeTab=this.searchResCntrls.length-1;
    }
    closeTab(){
        let ci=this;
        ci.searchResCntrls.splice(ci.delTabIndex,1);
        if(ci.delTabIndex===0) {
            this.activeTab = 0;
        }else{
            this.activeTab = ci.delTabIndex-1;
        }
        ci.delTabIndex=-1;
    }

    clearSearch(){
        this.searchResCntrls=[];
    }
    repaintUi(){
       this.rc.setState(this);
    }
}
export let AppCntrlIns= new AppCntrl();
