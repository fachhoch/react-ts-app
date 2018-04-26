import * as React from 'react'
import * as app  from '../appService'
import {IVideoResponse} from "../appService";
import {AbstractComponent} from "../common/components/page/ComponentUi";
import {AppCntrl} from "../appService";
import  *  as RB from 'react-bootstrap'
import {IdHeler, IdHelper} from "../common/util/Utils";
import {SearchResCntrl} from "../appService";
import {VideoCntrl} from "../appService";




export class AppUi  extends   AbstractComponent<AppCntrl>{

    constructor(props){
        super(props);
        this.onChangeSearchText=this.onChangeSearchText.bind(this)
    }
    onChangeSearchText(e:any){
        this.cntrl().searchItem=e.target.value;
        this.repaintProps();

    }

    searchUi(){
        let ci=this;
        let cntrl=this.cntrl();
        let searchImpl=()=>{
            if(cntrl.searchItem){
                ci.pageBusyAction(()=>{
                    cntrl.searchClickHandler();
                    cntrl.searchItem="";
                    ci.repaintProps();
                    return Promise.resolve();
                })
            }
        }
        let clearTt=(<RB.Tooltip id="tooltip">
            <strong>Clear search</strong>
        </RB.Tooltip>)
        return <div className="row">
            <div className="col-lg-12">
                <div className="input-group input-group-lg ">
                    <input type="text" className="form-control" placeholder="Type  to search youtube videos"  value={cntrl.searchItem}  onKeyPress={(event)=>{
                            if (event.key === 'Enter') {
                                event.preventDefault();
                                event.stopPropagation();
                                searchImpl()
                            }

                        }}  onChange={this.onChangeSearchText}  ></input>
                    <div className="input-group-btn">
                        <button  style={{marginLeft:'5px'}} className="btn btn-primary"   onClick={()=>{
                           searchImpl()
                        }} >Search</button> { cntrl.searchResCntrls.length!==0? <RB.OverlayTrigger placement="left" overlay={clearTt}><button className="btn btn-default" onClick={()=>{
                            cntrl.clearSearch();
                            ci.repaintProps();
                        }} ><i className="fa fa-eraser"></i> </button></RB.OverlayTrigger>:<span></span> }
                    </div>
                </div>
            </div>
        </div>
    }
    tabsContent(){
        let ci=this;
        let cntrl=this.cntrl();
        let tabFac=(item:SearchResCntrl, index)=>{
         return    <RB.Tab key={index}  eventKey={index}  title={item.searchItem} >
                    <SearchResUi cntrl={item}/>

         </RB.Tab>
        }
        return  cntrl.searchResCntrls.length!==0?  <div className="row form-group"><div className="col-lg-12"> <RB.Tabs activeKey={cntrl.activeTab}  onSelect={(key)=>{
            cntrl.activeTab=key;
            ci.repaintProps();
        }} id={IdHelper.createId("tabs")}>
            {cntrl.searchResCntrls.map((item, index)=>{
                return  tabFac(item,index);
            })}
            </RB.Tabs></div></div>:<div className="row"></div>
    }

    content(){
        return <div className="row">
               <div className="col-lg-12">
                   {this.searchUi()}
                   {this.tabsContent()}
               </div>
        </div>
    }
}

export class SearchResUi   extends   AbstractComponent<SearchResCntrl>{

    componentDidMount(){
        let ci=this;
        let cntrl=ci.cntrl();
        cntrl.doSearch().then(()=>{
            cntrl.stateReady=true;
            ci.repaintProps();
        })
    }


    contentImpl(){
        let cntrl=this.cntrl();
       return cntrl.results.length>0? <div className="row">
            <div className="col-lg-12">
                {cntrl.results.map((item: VideoCntrl) => {
                    return  <Video cntrl={item}/>
                })
                }
            </div>
       </div>:<div>No results found.</div>
    }

    content(){
        let ci=this;
        return  ci.renderByState(()=>{
            return ci.contentImpl();
        });
    }

}


export  class Video extends AbstractComponent<VideoCntrl>{

    imageUi(){
        let cntrl=this.cntrl();
        let vr:IVideoResponse=this.cntrl().vd
        let ci=this;
        let items=[];
        let playTt=(<RB.Tooltip id="tooltip">
            <strong>Play Video</strong>
        </RB.Tooltip>)

        items.push( <div className="col-lg-2">
            <img src={vr.snippet.thumbnails.default.url} className="img-rounded"/>
        </div>);
        items.push( <div className="col-lg-2"><span>{vr.snippet.description}</span></div>);
        items.push(<div className="col-lg-2"><a href="#" onClick={(e)=>{
            e.preventDefault();
            e.stopPropagation();
            cntrl.onclickPlay();
            ci.repaintProps();
        }} > <RB.OverlayTrigger placement="left" overlay={playTt}><i className="fa fa-play"></i></RB.OverlayTrigger></a></div>)
        return  <div className="row">  {items}</div>
    }
    iframUi(){
        let cntrl=this.cntrl();
        let vr:IVideoResponse=this.cntrl().vd
        let ci=this;
        let closeTt=(<RB.Tooltip id="tooltip">
            <strong>Close Video</strong>
        </RB.Tooltip>)

       return  <div className="row">
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-12">
                        <span>{vr.snippet.description}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                        <span >
                            <iframe id="player" type="text/html" width="640" height="390"
                                    src={`http://www.youtube.com/embed/${vr.id.videoId}?enablejsapi=1&origin=http://example.com&autoplay=1`}
                                    frameBorder="0"></iframe>
                        </span>
                        <span className="align-top">                        <a href="#" onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    cntrl.onclickClose();
                    ci.repaintProps();
            }} >
                            <RB.OverlayTrigger placement="left" overlay={closeTt}>
                                <i className="fa fa-window-close"></i>
                            </RB.OverlayTrigger>
                        </a></span>
                    </div>
                </div>
            </div>
        </div>
    }
    content(){
        let vr:IVideoResponse=this.cntrl().vd
        let ci=this;
       return  <div className="row">
                <div className="col-lg-12">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <div>{vr.snippet.title} </div>
                        </div>
                        <div className="panel-body">
                                {ci.cntrl().showVideoIframe? ci.iframUi():ci.imageUi()}
                        </div>
                    </div>
               </div>
            </div>
    }

 }

