

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
  this.state={progressValue:0,progressTotal:0,modalMessage:null,process:false, title:this.props.title, tags:this.props.tags,
  resizeWidth:0, resizeHeight:0, resizeType:""};
  this.process=new ResizeProcess(this, this.props);
}
onDropFailed(errorMessage){
      this.setErrorMessage(errorMessage);
}
onDropSucess(imageInfo){
  if(this.process.isMainImageSizeCorrect(imageInfo.width,imageInfo.height)){
        return true;
  }
  else{
    this.setErrorMessage("the image is in the correct")
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
setTags(tags){
  this.setState(Object.assign({}, this.state,{tags}));
}



  render(){
        return this.renderStep(this.state.step);
  }
  renderStep(step){
      if(!this.state.process){
              return this.renderUploadMaster();
      }
      else {
        return this.renderResizeImage();
      }

  }
  renderUploadMaster(){
    var appconfig=appdata.getAppConfig();
    var {contractNumber,episodeNumber,title}=this.props;
    var {tags,title}=this.state;

    return (
      <div>
            <div className="imageSetHeader">New Image Set</div>
            <div className="container">

                    <div className="row">
                       <div className="col-sm-6 formFieldWithLabel">
                          <label htmlFor="contractNumber">Contract Number:</label>
                          <input type="text" className="form-control" id="contractNumber" placeholder="Contract number" name="contractNumber" value={contractNumber} readOnly={true}/>
                        </div>
                        <div className="col-sm-6 formFieldWithLabel">
                          <label htmlFor="episodeNumber">Episode Number:</label>
                        <input type="text" className="form-control" id="episodeNumber" placeholder="Episode Number" name="episodeNumber" readOnly={true} value={episodeNumber}/>
                      </div>
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
                         <ImageUploader  {...this.props}
                           fileCounter={this.props.fileCounter}
                           onComplete={this.process.onMainAssetUploaded.bind(this.process)}
                           buildFileName={this.process.buildFileName.bind(this.process)}
                           isUploadImageSizeCorrect={this.process.isMainImageSizeCorrect.bind(this.process)}
                           bucket={appconfig.imageBucket} onDropFailed={this.onDropFailed.bind(this)}
                           onDropSucess={this.onDropSucess.bind(this)}
                           onUploadError={this.onUploadError.bind(this)}/>
                     </div>
                     <ModalDialog message={this.state.modalMessage}/>
                   </div>


           </div>

        </div>
      );

  }
  renderResizeImage(){

    var {width, height,imageURL}=this.process.getSourceImageInfo();
    var {resizeWidth,resizeHeight}=this.state;
    return (
       <div style={styles.previewImageContainer}>
             <div>
                 <img src={imageURL} style={styles.image(width, height)}/>
                 <ProgressBar width={width} height={height}
                   progressValue={this.state.progressValue}
                   progressTotal={this.state.progressTotal}/>
             </div>
             <div  style={styles.imageFooter}>
                      Generating: {resizeWidth} x {resizeHeight}
             </div>
             <ModalDialog message={this.state.modalMessage} onClearMessage={this.onClearMessage.bind(this)}/>
       </div>
     );
  }


}
