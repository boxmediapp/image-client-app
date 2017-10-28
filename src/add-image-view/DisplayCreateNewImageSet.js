

import React, {Component} from 'react'
import {ImageUploader,ProgressBar,ModalDialog} from "../components";
import {genericUtil,imageUtil,ResizeProcess} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues,imageRequirements} from "../configs";
import {styles} from "./styles";


export default class DisplayCreateNewImageSet extends Component{
constructor(props){
  super(props);
  this.state={progressValue:0,progressTotal:1,modalMessage:null,process:false};
  this.process=new ResizeProcess(this, this.props);
}
onClearMessage(){
  this.setState(Object.assign({}, this.state,{modalMessage:null}));
}
setErrorMessage(modalMessage){
   this.setState(Object.assign({}, this.state,{modalMessage}));
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
                     onComplete={this.process.onMainAssetUploaded.bind(this.process)}
                     buildFileName={this.process.buildFileName.bind(this.process)}
                     isUploadImageSizeCorrect={this.process.isMainImageSizeCorrect.bind(this.process)}
                     bucket={appconfig.imageBucket}/>
               </div>
             </div>

     </div>
      );

  }
  renderResizeImage(){

    var {width, height,imageURL}=this.process.getSourceImageInfo();
    return (
       <div style={styles.previewImageContainer}>
             <div>
                 <img src={imageURL} style={styles.image(width, height)}/>
                 <ProgressBar width={width} height={height}
                   progressValue={this.state.progressValue}
                   progressTotal={this.state.progressTotal}/>
             </div>
             <div  style={styles.imageFooter}>
                      {width} x {height}
             </div>
             <ModalDialog message={this.state.modalMessage} onClearMessage={this.onClearMessage.bind(this)}/>
       </div>
     );
  }


}
