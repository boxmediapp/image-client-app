

import React, {Component} from 'react'
import {ImageUploader,ProgressBar,ModalDialog} from "../components";
import {genericUtil,imageUtil} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues,imageRequirements} from "../configs";
import ResizeProcess from "./ResizeProcess";
import {styles} from "./styles";


export default class DisplayCreateNewImageSet extends Component{
constructor(props){
  super(props);
  this.state={progressValue:0,progressTotal:1:modalMessage:null,process:false};
  this.process=new ResizeProcess(this, this.props);
}

onUploadComplete(data){
    this.process.onUploadComplete(data);
}

onProcessCompleted(){
    this.props.onNewImageCreated(image);
}
startResize(step,imageSet,image){
    var process=tue;
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

  buildFileName(width, height, filetype){
    return this.process.buildFileName(width,height,filetype);
  }
  isUploadImageSizeCorrect(width, height){
    return width && height && width==1920 && height ==1080;
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
    return (
      <div className="container">
             <div className="row">
               <div className="col-sm-12">
                   <ImageUploader  {...this.props}
                     fileCounter={this.props.fileCounter}
                     onComplete={this.onUploadComplete.bind(this)}
                     buildFileName={this.buildFileName.bind(this)}
                     isUploadImageSizeCorrect={this.isUploadImageSizeCorrect.bind(this)}
                     bucket={appconfig.imageBucket}/>
               </div>
             </div>

     </div>
      );

  }
  renderResizeImage(){
    var width=imageRequirements[step].width;
    var height=imageRequirements[step].height;
    var appconfig=appdata.getAppConfig();
    var filepath=this.buildFileName(width, height,"png");
    var imageURL=imageUtil.getS3ImageURL(this.state.image);
     return (
       <div style={styles.previewImageContainer}>
             <div>
                 <img src={this.props.imageURL} style={styles.image(this.props.width, this.props.height)}/>
                 <ProgressBar width={this.props.width} height={this.props.height}
                   progressValue={this.state.progressValue}
                   progressTotal={this.state.progressTotal}/>
             </div>
             <div  style={styles.imageFooter}>
                      {this.props.width} x {this.props.height}
             </div>
             <ModalDialog message={this.state.modalMessage} onClearMessage={this.onClearMessage.bind(this)}/>
       </div>
     );
  }


}
