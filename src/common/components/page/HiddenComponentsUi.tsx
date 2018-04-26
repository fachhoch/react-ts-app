import * as React from "react";
import * as RB from 'react-bootstrap'
import * as NU  from '../../util/EventEmitterImpl'
import IPromise = Axios.IPromise;
import {PageEvents, updateAriaMsg, IdHelper} from "../../util/Utils";
import {EventEmitterImplIns} from "../../util/EventEmitterImpl";
import {AlertUiController, BlockUiCntrl, HiddenComponentController, AriaHelperCntrl} from "./HiddenComponentsModel";
import './style/alert.css'
interface IComProp{
    cntrl:HiddenComponentController
}

export class HiddenComponentsUi extends   React.Component<IComProp,any>{
    constructor(props){
        super(props)
        this.blockUi=this.blockUi.bind(this);
        this.unblockUi=this.unblockUi.bind(this);
        this.showAlert=this.showAlert.bind(this);
        this.closeAlert=this.closeAlert.bind(this);
        this.ariaMsgUpdate=this.ariaMsgUpdate.bind(this);
        EventEmitterImplIns.on(PageEvents.BLOCK_UI,this.blockUi)
        EventEmitterImplIns.on(PageEvents.UN_BLOCK_UI,this.unblockUi)
        EventEmitterImplIns.on(PageEvents.SHOW_ALERT,this.showAlert)
        EventEmitterImplIns.on(PageEvents.CLOSE_ALERT,this.closeAlert)
        EventEmitterImplIns.on(PageEvents.ARIA_MSG,this.ariaMsgUpdate)
    }
    componentWillUnmount(){
        EventEmitterImplIns.removeListener(PageEvents.BLOCK_UI,this.blockUi)
        EventEmitterImplIns.removeListener(PageEvents.UN_BLOCK_UI,this.unblockUi)
        EventEmitterImplIns.removeListener(PageEvents.SHOW_ALERT,this.showAlert)
        EventEmitterImplIns.removeListener(PageEvents.CLOSE_ALERT,this.closeAlert)
        EventEmitterImplIns.removeListener(PageEvents.ARIA_MSG,this.ariaMsgUpdate)
    }
    ariaMsgUpdate(msg:string){
        this.props.cntrl.ariaCntrl.msg=msg;
        this.forceUpdate();
    }
    showAlert(title:string, msg:string){
        this.props.cntrl.alertUi=true;
        this.props.cntrl.alertUiContrlller.title=title;
        this.props.cntrl.alertUiContrlller.msg=msg;
        this.forceUpdate();
    }
    closeAlert(){
        this.props.cntrl.alertUi=false;
        this.forceUpdate();
    }
    blockUi(){
        this.props.cntrl.blockUi=true;
        this.forceUpdate();
    }
    unblockUi(){
        this.props.cntrl.blockUi=false;
        this.forceUpdate();
    }
    render(){
        let ci=this;
        return (
                <div >
                    <div>
                        {this.props.cntrl.blockUi? <BlockUiCmp  cntrl={this.props.cntrl.blockUiController}/>:"" }
                    </div>
                    <div>
                        {this.props.cntrl.alertUi? <AlertUiComponent  cntrl={this.props.cntrl.alertUiContrlller}  onClose={()=>{
                        ci.closeAlert()
                    }} />:"" }
                    </div>
                    <div>
                        <AriaHelperUi cntrl={this.props.cntrl.ariaCntrl}/>
                    </div>
                </div>
        );
    }
}
interface IAUIProp{
    cntrl:AlertUiController
    onClose()
}

class AlertUiComponent  extends   React.Component<IAUIProp,any>{
    constructor(props){
        super(props);
    }

    render(){
        let ci=this;


        let modal=(  <div className="static-modal custom-modal">
                <RB.Modal.Dialog>
                    <RB.Modal.Header>
                        <RB.Modal.Title>{ci.props.cntrl.title}</RB.Modal.Title>
                    </RB.Modal.Header>
                    <RB.Modal.Body>
                        <div>
                                 {ci.props.cntrl.msg}
                        </div>
                    </RB.Modal.Body>
                    <RB.Modal.Footer>
                        <button   aria-labelledby="close this dialog" ref={(btnElement)=>{
                                if(btnElement){
                                    btnElement.focus();
                                }
                        }}  className="btn btn-default" onClick={()=>{
                          ci.props.onClose();
                     }} >Close</button>
                    </RB.Modal.Footer>
                </RB.Modal.Dialog>
            </div>
        );
        return  modal;
    }
}

interface IBlockUiProp {
    cntrl: BlockUiCntrl
}
class BlockUiCmp extends React.Component<IBlockUiProp,any> {
    divId:string;
    constructor(props) {
        super(props);
        this.divId=IdHelper.createId('busyindicatorId');
    }
    componentDidMount(){
        //updateAriaMsg('Please wait processing request...')
        let element=document.getElementById(this.divId);
        if(element){
            element.focus();
        }
    }
    componentWillUnmount(){
        //updateAriaMsg('Done processing request....')
    }
    render() {
        let ci = this;
        let modal = (  <div id={this.divId} className="static-modal custom-modal">
                <RB.Modal.Dialog>
                    <RB.Modal.Header>
                        <RB.Modal.Title>{ci.props.cntrl.title}</RB.Modal.Title>
                    </RB.Modal.Header>
                    <RB.Modal.Body>
                        <div>
                            <i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
                            <span >
                                {ci.props.cntrl.msg}
                            </span>
                        </div>
                    </RB.Modal.Body>
                    <RB.Modal.Footer>
                    </RB.Modal.Footer>
                </RB.Modal.Dialog>
            </div>
        );
        return modal;
    }
}
interface AriaHelperProps{
    cntrl:AriaHelperCntrl
}
class AriaHelperUi extends React.Component<AriaHelperProps,any>{
    constructor(props){
        super(props);
    }
    render(){
        return <div className="sr-only"
             role="status"
             aria-live="assertive"
             aria-atomic="true">
            {this.props.cntrl.msg?<span>{this.props.cntrl.msg}</span>:"" }
        </div>
    }
}
