/**
 * Created by sairam.manda on 8/20/2017.
 */


export abstract class AbstractPageCntrl<CC>{
    pageTitleModel:PageTitleModel= new PageTitleModel();
    rc:React.Component<any,any>
    cc():CC{
        let  obj:any=this;
        return <CC>obj
    }
}

export class PageTitleModel{
    title:string;
    description:string
}
