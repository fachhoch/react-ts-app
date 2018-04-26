
export   class PaginationModel {
    activePage:number=1;
    start:number=0;
    end:number=20;
    numberOfPages:number=0;
    itemsCount:number=0;
    recordsPerPage:number=20;
    maxButtons:number=5;
    btnSize:string='medium'
    showGotoPageDropDown:boolean=false;
    noOfRecordsPerPageOptions:number[]=[5,10,15,20,25,30,35,40,45,50]

    calcPaging():void{
        this.start= ((this.activePage-1)*(this.recordsPerPage));
        this.end=(this.recordsPerPage);
        if(this.itemsCount<=this.end){
            this.end=this.itemsCount;
        }
    }
    calcPages():void{
        if(this.itemsCount!=0){
            this.numberOfPages= Math.ceil(this.itemsCount/this.recordsPerPage);
        }else{
            this.numberOfPages=0;
        }
    }

}
