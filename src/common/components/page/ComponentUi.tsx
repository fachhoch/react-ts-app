import * as React from "react";
import * as RB from 'react-bootstrap'
import * as NU  from '../../util/EventEmitterImpl'
import * as Util from '../../util/Utils'
import IPromise = Axios.IPromise;
import {PageEvents, blockUiAction} from "../../util/Utils";
import {EventEmitterImplIns} from "../../util/EventEmitterImpl";
import {AbstractComponentController} from "./ComponentModel";
import './style/style.css'
import * as Modal from "react-bootstrap/lib/Modal"
export interface IAbsComProp<CC>{
    cntrl:AbstractComponentController<CC>
}

/*interface ConfirmDialogUiProp{
    cntrl:ConfirmDialogCntrl;
    onCancel()
    onConfirm():IPromise<void>
}
class ConfirmDialogUi  extends  React.Component<ConfirmDialogUiProp,any>{
    constructor(props){
        super(props);
    }
    render():JSX.Element{
        let ci=this;
        let modal=(  <div className="static-modal custom-modal">
                    <RB.Modal.Dialog >
                        <RB.Modal.Header>
                            <RB.Modal.Title>{ci.props.cntrl.title}</RB.Modal.Title>
                        </RB.Modal.Header>
                        <RB.Modal.Body>
                            {ci.props.cntrl.msg}
                        </RB.Modal.Body>
                        <RB.Modal.Footer>
                            <button className="btn btn-danger" onClick={()=>{
                                ci.props.onConfirm();
                            }} >{ci.props.cntrl.confirmBtnText}</button>
                            <button className="btn btn-default"  onClick={()=>{
                                ci.props.onCancel();
                            }}>Cancel</button>
                        </RB.Modal.Footer>
                    </RB.Modal.Dialog>
            </div>
        );
        return  modal;
    }
}*/



export abstract  class BaseComponent<T> extends   React.Component<T,any>{
    showAlert(title:string, msg:string){
        EventEmitterImplIns.emit(PageEvents.SHOW_ALERT,title,msg)
    }
    closeAlert(){
        EventEmitterImplIns.emit(PageEvents.CLOSE_ALERT)
    }
    blockUi(){
        EventEmitterImplIns.emit(PageEvents.BLOCK_UI)
    }
    unblockUi(){
        EventEmitterImplIns.emit(PageEvents.UN_BLOCK_UI)
    }
    pageBusyAction=(callback:()=>IPromise<any>)=>{
        Util.blockUiAction(callback);
    }
    abstract content():JSX.Element
    render(){
        let ci=this;
        let newRow=()=>{
            return <div className="row">
                {ci.content()}
            </div>
        }
        let noRow=()=>{
            return ci.content()

        }
        let newContainer=()=>{
            <div className="container">
                {ci.content()}
            </div>
        }
        return  noRow();
    }

    renderPrimaryPanel(element:JSX.Element, header:string):JSX.Element {
        return <div className="panel panel-primary">
            <div className="panel-heading">{header}</div>
            <div className="panel-body">
                {element}
            </div>
        </div>
    }

    renderInModal(element:JSX.Element, title:string,closeHandler:()=>IPromise<any>):JSX.Element{
        return <div className="in">
            <div className="static-modal docs " >
            <Modal.Dialog dialogClassName="modal-body" autoFocus={true} bsSize="large" aria-labelledby="contained-modal-title-lg" >
                <Modal.Header>
                    <Modal.Title>{title} <a href="#" className="pull-right help-icon" ref={(ele)=>{
                        if(ele){
                            ele.focus();
                        }
                    }}  aria-label="Close modal window" title="Click to Close" onClick={(e)=>{
                        e.preventDefault();
                        closeHandler();
                     }} ><i className="fa fa-window-close" aria-hidden="true"></i></a></Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {element}
                </Modal.Body>
                <RB.Modal.Footer>
                </RB.Modal.Footer>
            </Modal.Dialog>
        </div></div>
    }
    renderRow(element:JSX.Element):JSX.Element{
        return  <div className="row">
            {element}
        </div>
    }

    renderContainer(element:JSX.Element):JSX.Element{
        return  <div className="container">
            {element}
        </div>
    }
    loading(text:string):JSX.Element{
        return  <div><i className="fa fa-spinner fa-spin fa-3x fa-fw"></i>
            <span >{text}....</span></div>
    }
    norecords(text:string):JSX.Element{
        return <div>{text}</div>
    }
    renderByState(element:()=>JSX.Element,ready:boolean,text:string):JSX.Element{
        let ci=this;
        return ready ?
            element():ci.loading(text);
    }
    addAriaMsg(msg:string){
        EventEmitterImplIns.emit(PageEvents.ARIA_MSG,msg);
    }

}

export abstract  class AbstractComponent<CC> extends   BaseComponent<IAbsComProp<CC>>{
    constructor(props){
        super(props)
    }
    loading():JSX.Element{
        return  <div><i className="fa fa-spinner fa-spin fa-3x fa-fw" aria-hidden="true"></i>
            <span aria-label="please wait loading...">{this.props.cntrl.loadingText}....</span></div>
    }
    norecords():JSX.Element{
        return <div className="panel panel-default"><div className="panel-body"><div aria-label="No records found">{this.props.cntrl.noRecordsText}</div></div></div>
    }
    renderByState(element:()=>JSX.Element):JSX.Element{
        let ci=this;
        return ci.props.cntrl.stateReady ?
            element():ci.loading();
    }
    cntrl(){
        return this.props.cntrl.cc();
    }

    repaintProps(){
        this.setState(this.props.cntrl);
    }

}






