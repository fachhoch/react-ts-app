/**
 * Created by sairam.manda on 11/27/2016.
 */
import * as Pagination  from 'react-bootstrap/lib/Pagination';
import * as React from 'react';
import {PaginationModel} from "./PaginationModel";
import './style.css'
import {IdHelper, updateAriaMsg} from "../../util/Utils";

interface IProps{
    model:PaginationModel;
    onPageChange(pagenumber:number):void
}

export  class PaginationImpl extends  React.Component<IProps,any>{

    constructor(props){
        super(props);
        this.handleSelect=this.handleSelect.bind(this);
    }
    handleSelect(eventKey) {
        this.props.onPageChange(eventKey);
    }

    pagingText(){
        let recordsPerPageId=IdHelper.createId("recordsPerPageId")
        let classInstance=this;
        function allPages():number[]{
            let pages:number[]=[]
            for(let i=1;i<=classInstance.props.model.numberOfPages;i++){
                pages.push(i);
            }
            return pages;
        }
        let component=(
                            <div className="form-inline pull-left">
                                <div className="form-group paging-text">
                                    {/*<span aria-label="Pagingation inforamtion">Showing {this.props.model.start+1}  to {(this.props.model.end*this.props.model.activePage)} of {this.props.model.itemsCount},</span>*/}
                                    <span className="paging-text"  htmlFor={recordsPerPageId}   >Show </span>
                                    <select   id={recordsPerPageId} style={{height:'30px'}} aria-label="Records Per Page Selection" className="form-control"  value={this.props.model.recordsPerPage} onChange={(e:any)=>{
                                            classInstance.props.model.recordsPerPage=Number(e.target.value);
                                            classInstance.props.model.calcPages();
                                            classInstance.props.model.activePage=1
                                            classInstance.props.model.calcPaging();
                                           classInstance.handleSelect(classInstance.props.model.activePage);
                                           classInstance.forceUpdate();
                                        }}>
                                        {classInstance.props.model.noOfRecordsPerPageOptions.map(function(item,index){
                                            return (<option key={index}   value={item}>{item}</option>);
                                        })}
                                    </select>
                                    <span  className="paging-text"> records per page. Page {this.props.model.activePage} of {this.props.model.numberOfPages}. Total {this.props.model.itemsCount} records.</span>
                                </div>
                            </div>
         );
        let componenet1=
            <div>
                <div  className="row">
                    <div className="col-lg-2">
                        {component}
                    </div>
                    <div className="col-lg-1">
                        <label >GoTo:</label>
                        <select className="form-control"  value={this.props.model.activePage} onChange={(e:any)=>{
                                classInstance.props.model.activePage=e.target.value;
                               classInstance.handleSelect(classInstance.props.model.activePage);
                               classInstance.forceUpdate();
                            }}>
                            {allPages().map(function(item,index){
                                return (<option key={index}  value={item}>{item}</option>);
                            })}
                        </select>
                    </div>
                </div>
            </div>
        return this.props.model.showGotoPageDropDown? componenet1:component;
    }

    render(){
        const paginationStyle = {
            float: 'right',
            display:'inline-block'
        };
        const paginationTextStyle = {
            float: 'left',
            display:'inline-block'
        };
        const componentStyle={
        };
        return(<div className="row pagination-ui">

            <div className="col-lg-6">
                    {this.pagingText()}
            </div>
            <div className="col-lg-6">
                <span className="pull-right" aria-label="pagination buttons">
                    <Pagination
                        bsSize={this.props.model.btnSize}
                        first ={<i className="fa fa-angle-double-left"  aria-label="first " ></i>}
                        last={<i className="fa fa-angle-double-right"  aria-label="last " ></i>}
                        prev= {<i className="fa fa-angle-left"  aria-label="previous " ></i>}
                        next ={<i className="fa fa-angle-right" aria-label="next " ></i>}
                        maxButtons={this.props.model.maxButtons}
                        items={this.props.model.numberOfPages}
                        activePage={this.props.model.activePage}
                        onSelect={this.handleSelect}/>
                </span>
            </div>
        </div>);
    }

}
