import * as React from "react";
import * as RB from 'react-bootstrap'
import {AbstractPageCntrl, PageTitleModel} from "./PageModel";
import {updateAriaMsg} from "../../util/Utils";
import './style/style.css'
import './style/button.css'


export   interface IPageProp<CC>{
    cntrl:AbstractPageCntrl<CC>
}

export abstract class  AbstractPageUi<CC>  extends  React.Component<IPageProp<CC>,any>{
    constructor(props){
        super(props);
    }
    render(){
        let ci=this;

        return      <div className="row" >
                        <div  className="col-lg-12">
                            <div className="row">
                                <div  className="col-lg-12">
                                    <PageHeaderUi model={ci.props.cntrl.pageTitleModel}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    {ci.content()}
                                </div>
                            </div>
                        </div>
                    </div>
    }
    abstract content():JSX.Element
}
interface IPageHeaderProp {
    model: PageTitleModel
}

class PageHeaderUi  extends  React.Component<IPageHeaderProp,any>{
    constructor(props){
        super(props);
        //updateAriaMsg('Navigated to page '+this.props.model.title);
    }
    componentWillMount(){
        updateAriaMsg('Navigated to page '+this.props.model.title);
    }
    render():JSX.Element{
        return <div className="row"><div className="col-md-12 " style={{marginBottom:'15px',marginTop:'5px'}}  >
                    <div >
                        <h3 className="page-title" >{this.props.model.title}</h3>
                    </div>
        </div></div>
    }
}
