import React, {Component} from 'react';




import {imageUtil,genericUtil} from "../../utils";

import {api} from "../../api";
import {styles} from "./styles";
import {textValues} from "../../configs";
import {ProgressBar,ModalDialog} from "../index";


export  default class ImageResizeUploader extends Component {
   constructor(props){
     super(props);

     this.state={progressValue:0, progressTotal:1,modalMessage:null, file:null,baseURL:null};
   }
  
   onClearMessage(){
     this.setState(Object.assign({}, this.state,{modalMessage:null}));
   }
   setErrorMessage(modalMessage){
      this.setState(Object.assign({}, this.state,{modalMessage}));
   }
   setProgressValue(progressValue,progressTotal){
     this.setState(Object.assign({}, this.state,{progressValue,progressTotal}));
   }

   startUpload(s3, resizedImage){
     this.setFilePath(s3.file, s3.baseURL)
     genericUtil.startUpload({s3,
                file:resizedImage,
                onProgress:this.onUploadProgess.bind(this),
                onComplete:this.onUploadComplete.bind(this),
                onError:this.onUploadError.bind(this),
                onAbort:this.onUploadAborted.bind(this)
             });
   }
   clearProgress(){
     this.setProgressValue(0,0);
   }
   onUploadProgess(progressValue,total){
     this.setProgressValue(progressValue,total);
   }
   onUploadComplete(){
     this.clearProgress();
     this.props.onComplete(this.state, this.props);
   }
   setFilePath(filepath, baseURL){
     this.setState(Object.assign({}, this.state,{filepath,baseURL}))
   }
   onUploadError(result){
     console.log("error:"+JSON.stringify(result));
     this.clearProgress();
     this.setErrorMessage(textValues.upload.failed);
   }
   onUploadAborted(){
     this.clearProgress();
     this.setErrorMessage(textValues.upload.aborted);
   }
   startResize(){
     var {imageURL,width,height,imageType}=this.props;
     var onComplete=resizedImage=>{
       var uploadRequest={
                         file:this.props.filepath,
                         bucket:this.props.bucket
        };
      api.requestS3UploadURL(uploadRequest).then(data=>{
               this.startUpload(data, resizedImage);
            });
     };
     imageUtil.resizeImage({imageURL,width,height,imageType,onComplete});
   }




  render() {
       console.log("********rendering ImageResizeUploader************:"+this.props.step);
        return(

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
