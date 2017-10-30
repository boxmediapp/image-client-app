import React, {Component} from 'react';




import {imageUtil,genericUtil} from "../../utils";

import {api} from "../../api";
import {textValues} from "../../configs";
import {ModalDialog} from "../index";
import {styles} from "./styles";


import  RenderImage from "./RenderImage";







export  default class ImageUploader extends Component {
   constructor(props){
     super(props);
     var imageTags="";
     if(this.props.image){
        imageTags=this.props.image.tags;
     }


     this.state={file:null,imagePreviewUrl:null,
       imageType:null,width:0,height:0, modalMessage:null, progressValue:0, progressTotal:0,
       imageTags, filepath:null,baseURL:null};


   }

   setProgressValue(progressValue,progressTotal){
     this.setState(Object.assign({}, this.state,{progressValue,progressTotal}));
   }


   onDrop(acceptedFiles, rejectedFiles){
      if(acceptedFiles && acceptedFiles.length>0){
        imageUtil.getImagePreviewAndInfo(acceptedFiles[0],data=>{
              var modalMessage=this.state.modalMessage;
              if(!this.props.isUploadImageSizeCorrect(data.width,data.height)){
                      modalMessage="the image is not the required size";
                      this.setState(Object.assign({},this.state,{modalMessage}));
              }
              else{
                this.setState(Object.assign({},this.state,data));
              }


        }, modalMessage =>{
          this.setErrorMessage(modalMessage);
        });

      }


   }

   onClearMessage(){
     this.setState(Object.assign({}, this.state,{modalMessage:null}));
   }
   setErrorMessage(modalMessage){
      this.setState(Object.assign({}, this.state,{modalMessage}));
   }


  startUpload(s3){
    this.setFilePath(s3.file, s3.baseURL)
    this.setProgressValue(0,1);
    genericUtil.startUpload({s3,
               file:this.state.file,
               onProgress:this.onUploadProgess.bind(this),
               onComplete:this.onUploadComplete.bind(this),
               onError:this.onUploadError.bind(this),
               onAbort:this.onUploadAborted.bind(this)
            });
  }
   initSate(){
    this.setState({file:null,imagePreviewUrl:null,
      imageType:null,width:0,height:0, modalMessage:null, progressValue:0, progressTotal:0,
      imageTags:null, filepath:null,baseURL:null});




  }
  onUploadProgess(progressValue,total){
    this.setProgressValue(progressValue,total);
  }
  onUploadComplete(){


    this.props.onComplete(this.state);
    this.initSate();

  }
  onUploadError(result){
    console.log("error:"+JSON.stringify(result));

    this.setErrorMessage(textValues.upload.failed);
  }
  onUploadAborted(){
    this.clearProgress();
    this.setErrorMessage(textValues.upload.aborted);
  }

  setFilePath(filepath, baseURL){
    this.setState(Object.assign({}, this.state,{filepath,baseURL}))

  }
  onUpload(){
    var uploadRequest={};

    var uploadRequest={
                file:this.props.buildFileName(this.state.width, this.state.height,this.state.imageType),
                bucket:this.props.bucket
     };
      var that=this;
      api.requestS3UploadURL(uploadRequest).then(function(data){
         console.log("presign response:"+JSON.stringify(data));
         that.startUpload(data);
      }).catch(error=>{
          this.setErrorMessage("Failed upload the file:"+error);
      });
  }
setImageTags(imageTags){

   this.setState(Object.assign({}, this.state,{imageTags}));
}
updateTags(){

    this.props.updateTags(this.state.imageTags);
}
  render() {
        return(
           <div>
              <RenderImage {...this.props} {...this.state} onDrop={this.onDrop.bind(this)}
                onUpload={this.onUpload.bind(this)} setImageTags={this.setImageTags.bind(this)} updateTags={this.updateTags.bind(this)}/>
              <ModalDialog message={this.state.modalMessage} onClearMessage={this.onClearMessage.bind(this)}/>
           </div>
        );

  }





}
