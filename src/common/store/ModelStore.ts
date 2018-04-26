import {HiddenComponentController} from "../components/page/HiddenComponentsModel";
import {blockUiAction, PageEvents} from "../util/Utils";
import {EventEmitterImplIns} from "../util/EventEmitterImpl";
class ModelStore {
  hiddenCompCNtrl:HiddenComponentController= new HiddenComponentController();
}
const storeKey="appModel"
let getModelInstance=():ModelStore=>{
    let fromStore=localStorage.getItem(storeKey);
    if(fromStore){
        return JSON.parse(fromStore);
    }else{
        let ins=new ModelStore();
        return ins;
    }
}

export  const modelStoreInstance=getModelInstance();


export const saveModelStore=():void=>{
    localStorage.setItem(storeKey,JSON.stringify(modelStoreInstance));
}