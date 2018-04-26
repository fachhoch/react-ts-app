
export default class SortColumnModel{
    name:string;
    sortOrder:string;
    constructor(name:string, sortOrder:string){
        this.name=name;
        this.sortOrder=sortOrder;
    }
    isAsc():boolean {
        return !this.sortOrder||this.sortOrder === 'asc';
    }
    setAsc(asc:boolean){
        if(asc) this.sortOrder='asc';
        else this.sortOrder='desc'
    }

}


export  class SortList {
    sortCols:Array<SortColumnModel>
    constructor(cols:Array<string>){
        this.sortCols=cols.map((col)=>{
            return new SortColumnModel(col,null);
        });
    }
    setSort(colName):void{
        this.sortCols.forEach(function(sortColModel){
            if(sortColModel.name!=colName){
                sortColModel.sortOrder=null;
            }
        });
    }
    clearSort(){
        this.sortCols.forEach(function(sortColModel){
            sortColModel.sortOrder=null;
        });
    }
    sortColumnModelByName(colName):SortColumnModel{
        let result=this.sortCols.find((item)=>{
            return item.name===colName;
        });
        if(result==null){
            throw new Error(colName+'  not found  in sortable');
        }
        return result;
    }
}
