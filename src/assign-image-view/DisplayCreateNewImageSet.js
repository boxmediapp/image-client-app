

import React, {Component} from 'react'
import {ImageUploader,ProgressBar,ModalDialog} from "../components";
import {genericUtil,imageUtil,ResizeProcess} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues,imageRequirements} from "../configs";
import {styles} from "./styles";
import "./styles/index.css";


export default class DisplayCreateNewImageSet extends Component{
constructor(props){
  super(props);
  this.state=this.getStateFromProps(this.props);

}
getStateFromProps(props){
    return {progressValue:0,progressTotal:0,modalMessage:null,process:false, title:props.title, tags:props.tags,
    resizeWidth:0, resizeHeight:0, resizeType:"",imageSetType:'DEFAULT',resizeProcess:new ResizeProcess(this, props)};
}
componentWillReceiveProps(nextProps){
  if(this.props.contractNumber!==nextProps.contractNumber || this.props.episodeNumber!==nextProps.episodeNumber){
       this.setState(this.getStateFromProps(nextProps))
  }
}

onDropFailed(errorMessage){
      this.setErrorMessage(errorMessage);
}
onDropSucess(imageInfo){

  if(this.state.resizeProcess.isMainImageSizeCorrect(imageInfo.width,imageInfo.height)){
        if(imageInfo.transparency>0.02){
            this.setImageSetType('CUT_OUT');
        }
        else{
            this.setImageSetType('DEFAULT');
        }
        return true;
  }
  else{
    this.setErrorMessage(textValues.notCorrectSize.droppedImage+imageInfo.width+" x "+imageInfo.height+textValues.notCorrectSize.required);
    return false;
  }
}
onUploadError(result){
  console.log("error:"+JSON.stringify(result));
  this.setErrorMessage(textValues.upload.failed);
}

onClearMessage(){
  this.setState(Object.assign({}, this.state,{modalMessage:null}));
}
setErrorMessage(content){
   var modalMessage={
          title:"Error",
          content,
          onConfirm:this.onClearMessage.bind(this),
          confirmButton:"OK"
   }
   this.setState(Object.assign({}, this.state,{modalMessage}));
}

setResizeProperty(resizeWidth,resizeHeight, resizeType){
  this.setState(Object.assign({}, this.state,{resizeWidth,resizeHeight,resizeType}));

}
onClearMessage(){
  this.setState(Object.assign({}, this.state,{modalMessage:null}));
}


onProcessCompleted(){
    this.setState(Object.assign({}, this.state,{progressValue:0,progressTotal:0, step:0,process:false}));
    this.props.onNewImageCreated();

}
startResize(step,imageSet,image){
    var process=true;
    var progressValue=0;
    var progressTotal=1;
    this.setState(Object.assign({}, this.state,{process,progressValue,progressTotal}));
}
setProgressValue(progressValue,progressTotal){
    this.setState(Object.assign({}, this.state,{progressValue,progressTotal}));
}
clearProgress(){
    this.setProgressValue(0,0);
}

setTitle(title){
  this.setState(Object.assign({}, this.state,{title}));
}
setImageSetType(imageSetType){
    this.setState(Object.assign({}, this.state, {imageSetType}));
}
setTags(tags){
  this.setState(Object.assign({}, this.state,{tags}));
}
onMainAssetUploaded(data){
    this.state.resizeProcess.onMainAssetUploaded(data);
}

renderImageType(){
    var checked=false;
    if(this.state.imageSetType ==='CUT_OUT'){
          checked=true;
    }
    return(
      <div className="col-sm-2">
            <label htmlFor="isCutout">Cutout</label>
              <input id="isCutout" name="isCutout" type="checkbox" checked={checked}
                style={{marginLeft:5}}
                onChange={evt=>{
                    if(evt.target.checked){
                        this.setImageSetType('CUT_OUT');
                    }
                    else{
                        this.setImageSetType('DEFAULT');
                    }
                }}/>
     </div>


    );

}
  render(){
    if(!this.props.contractNumber || !this.props.episodeNumber){
        return null;
    }
    var appconfig=appdata.getAppConfig();
    var {contractNumber,episodeNumber}=this.props;
    var {tags,title}=this.state;
    if(!title){
      title="";
    }

    return (
      <div style={styles.newImageSetContainer}>
            <div className="imageSetHeader">New Image Set</div>
            <div className="container">
                    <div className="row">
                       <div className="col-sm-5 formFieldWithLabel">
                          <label htmlFor="contractNumber">Contract Number:</label>
                          <input type="text" className="form-control" id="contractNumber" placeholder="Contract number" name="contractNumber" value={contractNumber} readOnly={true}/>
                        </div>
                        <div className="col-sm-5 formFieldWithLabel">
                          <label htmlFor="episodeNumber">Episode Number:</label>
                        <input type="text" className="form-control" id="episodeNumber" placeholder="Episode Number" name="episodeNumber" readOnly={true} value={episodeNumber}/>
                      </div>
                      {this.renderImageType()}
                  </div>
                  <div className="row">
                    <div className="col-sm-12 formFieldWithLabel">
                       <label htmlFor="title">Title:</label>
                       <input type="text" className="form-control" id="title" placeholder="Title" name="title" value={title} onChange={evt=>{this.setTitle(evt.target.value)}}/>
                     </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 formFieldWithLabel">
                      <label htmlFor="tags">Tags:</label>
                      <input type="text" className="form-control" id="tags" placeholder="Tags" name="tags" value={tags} onChange={evt=>{this.setTags(evt.target.value)}}/>
                    </div>
                  </div>


                   <div className="row">
                     <div className="col-sm-12">
                         <RenderUploadProcess  {...this.props}
                           onMainAssetUploaded={this.onMainAssetUploaded.bind(this)}
                           buildFileName={this.state.resizeProcess.buildFileName.bind(this.state.resizeProcess)}
                           isUploadImageSizeCorrect={this.state.resizeProcess.isMainImageSizeCorrect.bind(this.state.resizeProcess)}
                           bucket={appconfig.imageBucket} onDropFailed={this.onDropFailed.bind(this)}
                           onDropSucess={this.onDropSucess.bind(this)}
                           onUploadError={this.onUploadError.bind(this)}
                           resizing={this.state.process} process={this.state.resizeProcess}
                           resizeWidth={this.state.resizeWidth} resizeHeight={this.state.resizeHeight}
                           progressValue={this.state.progressValue} progressTotal={this.state.progressTotal}
                           />
                     </div>
                     <ModalDialog message={this.state.modalMessage} onClearMessage={this.onClearMessage.bind(this)}/>
                   </div>
           </div>
        </div>
      );

  }



}


class RenderUploadProcess extends Component{
  render(){
    if(!this.props.resizing){
          return this.renderMasterUpload();
    }
    else{
      return this.renderResizingprocess();
    }
  }
  renderMasterUpload(){
    return(
          <ImageUploader  {...this.props} onComplete={this.props.onMainAssetUploaded}/>
    );
  }
  renderResizingprocess(){
        var {width, height,imageURL}=this.props.process.getSourceImageInfo();
        var {resizeWidth,resizeHeight}=this.props;
        return (
           <div style={styles.previewImageContainer}>
                 <div>
                     <img src={imageURL} style={styles.image(width, height)}/>
                     <ProgressBar width={width} height={height}
                       progressValue={this.props.progressValue}
                       progressTotal={this.props.progressTotal}/>
                 </div>
                 <div  style={styles.imageFooter}>
                          Generating: {resizeWidth} x {resizeHeight}
                 </div>
           </div>
         );
  }

}
