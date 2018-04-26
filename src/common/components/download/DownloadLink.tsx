/**
 * Created by Sairam.Manda on 12/5/2016.
 */

import {fileDownload}  from './FileDownload'
import * as React from 'react';
import * as axios from 'axios';
import IPromise = Axios.IPromise;
import {axiosDownloadIns} from "../../util/AxiosUtil";

interface IProps{
    docName:string;
}

export abstract class AbstractDownloadLink<T extends IProps> extends React.Component<T,any>{
     constructor(props){
        super(props);
         this.state={
             disable:false
         }
     }

    download(event){
        event.preventDefault();
        this.state.disable=true;
        this.setState(this.state);
        let classInstance=this;
        let state=classInstance.state;
        this.fileDataPromise(axiosDownloadIns).then(function(response){
            fileDownload(response.data,classInstance.props.docName);
        })
            .then(function(){
                state.disable=false;
                classInstance.setState(state);
            }).catch(function (error) {
            state.disable=false;
            classInstance.setState(state);
            alert('File not found');
        });
    }

    abstract fileDataPromise(axiosInstance):IPromise<any>

    fileIcon(filename:string){
        let extension= (/[.]/.exec(filename.toLowerCase())) ? /[^.]+$/.exec(filename.toLowerCase())[0] : undefined
        switch(extension){
            case 'docx':
            case 'doc':
                return 'fa-file-word-o'
            case 'xls':
            case 'xlsx':
                return 'fa-file-excel-o'
            case 'pdf':
                return 'fa-file-pdf-o'
            case 'txt':
                return 'fa-file-text-o'
            case 'zip':
                return 'fa-file-zip-o'
            case 'ppt':
                return 'fa-file-powerpoint-o'
            case 'jpg':
            case 'png':
                return 'fa-file-image-o'
            default:
                return 'fa-file-o'
        }
    }

    render(){
        if(!this.state.disable){
            let fileIconClassName=`fa ${this.fileIcon(this.props.docName)} `;
            //{//return        <a href='#' onClick={(event)=>this.download(event)}>{this.props.docName} <i className={fileIconClassName}></i> </a>}
            return   <div>
                <div><a href="#" onClick={(event)=>this.download(event)}> <i className={`${fileIconClassName} download-icon`} style={{fontSize:'1.5em'}}></i></a></div>
                <div>{this.props.docName}</div>
            </div>
        }else{
            return         <span>Please Wait downloading.... {this.props.docName}</span>
        }
    }
}
interface IDownloadCmpProps  extends  IProps{
    documentId:number
}

export   class DownloadLink extends  AbstractDownloadLink<IDownloadCmpProps>{
    fileDataPromise(axiosInstance){
        return axiosInstance.get('/projectDocs/filebytes/' + this.props.documentId);
    }
}

