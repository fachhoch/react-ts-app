import IPromise = Axios.IPromise;
import {PaginationModel} from "./PaginationModel";
import {axiosIns} from "../../util/AxiosUtil";
/**
 * Created by sairam.manda on 3/9/2017.
 */


export class IPSearch{
    start:number;
    end:number
    pageNumber:number
    pageSize:number
    sortCol:string
    sortAsc:boolean


}

export abstract class PagingController<MODEL,SEARCH  extends IPSearch>{
    ready:boolean;
    pagination:PaginationModel= new PaginationModel();
    searchPojo:SEARCH
    modelItems:MODEL[]
    resArray:boolean=true;
    modelItem:MODEL
    countUrl:string
    dataUrl:string
    constructor(searchPojo:SEARCH,countUrl,dataUrl){
        this.searchPojo=searchPojo;
        this.countUrl=countUrl;
        this.dataUrl=dataUrl;
    }
    recordsCount():IPromise<void>{
        let classInstance=this;
        return axiosIns.post(this.countUrl,this.searchPojo).then(function(response:Axios.AxiosXHR<number>){
            classInstance.pagination.itemsCount=response.data;
            classInstance.pagination.calcPages();
        }).catch(function(error){
            throw new Error(error);
        })
        //classInstance.pagination.itemsCount=0;
        //return Promise.resolve();
    }

    loadData(pageNumber:number):IPromise<void>{
        let classInstance=this;
        classInstance.pagination.activePage=pageNumber;
        classInstance.pagination.calcPaging();
        this.searchPagingParams();
        return this.resArray? axiosIns.post(this.dataUrl,this.searchPojo).then(function(response:Axios.AxiosXHR<MODEL[]>){
            classInstance.modelItems=response.data;
            classInstance.doWithData(classInstance.modelItems);
        }).catch(function(error){
            throw new Error(error);
        }):axiosIns.post(this.dataUrl,this.searchPojo).then(function(response:Axios.AxiosXHR<MODEL>){
            classInstance.modelItem=response.data;
        }).catch(function(error){
            throw new Error(error);
        });
    }
    doWithData(modelItems){
    }
    searchPagingParams(){
        this.searchPojo.start=this.pagination.start;
        this.searchPojo.end=this.pagination.end;
        this.searchPojo.pageNumber=this.pagination.activePage;
        this.searchPojo.pageSize=this.pagination.recordsPerPage;
    }
}


