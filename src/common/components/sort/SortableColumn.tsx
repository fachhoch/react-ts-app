import * as React from 'react';
import SortColumnModel from "./SortImpl";
import * as RB from 'react-bootstrap'
import './style.css'
import {updateAriaMsg} from "../../util/Utils";
import IPromise = Axios.IPromise;
interface IProps{
    sortColumn:SortColumnModel
    displayName:string
    component?:JSX.Element
    doSort(colname:string,asc:boolean):void
}
export  class SortableColumn extends   React.Component<IProps,any>{
    constructor(props){
        super(props)
        this.clickHandler=this.clickHandler.bind(this);
    }
    clickHandler(){
        let ci=this;
        let sortColumn=this.props.sortColumn;
        if(sortColumn.isAsc()){
            sortColumn.sortOrder='desc';
            this.props.doSort(sortColumn.name,false)
        }else{
            sortColumn.sortOrder='asc';
            this.props.doSort(sortColumn.name,true);
        }

    }

    render(){
        let styleName= this.props.sortColumn.sortOrder===null? 'column-sort-no':this.props.sortColumn.isAsc()? 'column-sort-up':'column-sort-down'   ;
            let ariaLabel=this.props.sortColumn.sortOrder===null? `${this.props.displayName} sort ascending` :this.props.sortColumn.isAsc()?`${this.props.displayName} sort descending`:`${this.props.displayName} to sort asc`;
        let ci=this
        return <th className={styleName} scope="col" >
            <a href="#"    aria-label={ariaLabel} role="sort" onClick={(event)=>{event.preventDefault();ci.clickHandler()}}>
                <span >{this.props.displayName}</span>
            </a>
            &nbsp;&nbsp;{ci.props.component? <span >{ci.props.component}</span>:""}
        </th>

    }
}
