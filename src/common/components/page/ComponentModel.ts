
export  abstract  class AbstractComponentController<CC>{
    loadingText:string="Please wait loading...";
    noRecordsText:string="No records found"
    stateReady:boolean=false
    elementToFocus;
     cc():CC{
         let obj:any=this;
         return <CC>obj;
     }
}


export abstract class CheckboxCntrl<T>{
    selectedItems:T[]=[];
    onClickSelectItem(selected:boolean,item:T){
        let ci=this;
        if(selected){
            let itemIndex:number=this.selectedItems.findIndex((si)=>ci.equalsImpl(si,item));
            if(itemIndex==-1){
                ci.selectedItems.push(item);
            }

        }else{
            let removeIndex:number=this.selectedItems.findIndex((si)=>ci.equalsImpl(si,item));
            ci.selectedItems.splice(removeIndex,1);
        }
    }
    onClickSelectAll(selected:boolean,items:T[]){
        let ci=this;
        if(selected){
            items.forEach((item)=>{
                if(!ci.isSelected(item)){
                    ci.onClickSelectItem(true,item);
                }
            });
        }else{
            items.forEach((item)=>{
                if(ci.isSelected(item)){
                    ci.onClickSelectItem(false,item);
                }
            });
        }
    }
    isSelected(item:T):boolean{
        let ci=this;
        let containsItem=this.selectedItems.findIndex((si)=>ci.equalsImpl(si,item));
        return containsItem!=-1;
    }
    isAllSelected(allItems:T[]):boolean{
        let ci=this;
        let res= allItems.every((item)=>{
            return ci.isSelected(item);
        })
        return res;
    }
     clearAll():void{
        this.selectedItems=[];
    }
    abstract equalsImpl(item1:T,item2:T):boolean
}

export class SelectModel<T>{
    label:string
    value:string
    item:T
}
export abstract class SelectCntrl<T>{
    selected:SelectModel<T>
    allItems:SelectModel<T>[]

    onchange(item:SelectModel<T>):void{
        this.selected=item;
    }
    abstract toSelectModel(item:T)

    indexOfSelected():number{
        let ci=this;
        if(!ci.selected){
            return null;
        }else{
            return ci.allItems.indexOf(ci.selected);
        }
    }
}

export abstract class MultiSelectCntrl<T>{
    selectedItems:SelectModel<T>[]=[]
    allItems:SelectModel<T>[]
    onchange(items:SelectModel<T>[]):void{
        this.selectedItems=items;
    }
    abstract toSelectModel(item:T)

    indexOfFirstSelected():number{
        let ci=this;
        if(ci.selectedItems.length===0){
            return null;
        }else{
            return ci.allItems.indexOf(ci.selectedItems[0]);
        }
    }
}