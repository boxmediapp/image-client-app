import React, {Component} from 'react';




import {imageUtil,genericUtil} from "../../utils";
import {appdata} from "../../store";
import {api} from "../../api";
import {textValues} from "../../configs";
import {ModalDialog} from "../index";
import {styles} from "./styles";


import  RenderImage from "./RenderImage";







export  default class ImageUploader extends Component {
   constructor(props){
     super(props);
     this.state={file:null,imagePreviewUrl:null,
       imageType:null,width:0,height:0, modalMessage:null, progressValue:0, progressTotal:0,
       imageTags:"", filepath:null,baseURL:null};
       if(this.props.image){
          this.imageTags=this.props.image.tags;
       }

   }
   setProgressValue(progressValue,progressTotal){
     this.setState(Object.assign({}, this.state,{progressValue,progressTotal}));
   }


   onDrop(acceptedFiles, rejectedFiles){
      if(acceptedFiles && acceptedFiles.length>0){
        var acceptedFile=acceptedFiles[0];
        let reader = new FileReader();
        reader.onloadend = () => {
                var imageType=imageUtil.getImageType(reader.result);
                var file=acceptedFile;
                var imagePreviewUrl=reader.result;
                if(!imageType){
                    console.error("not image");
                    this.setErrorMessage("This is not a valid image file");
                    return;
                }
                var img=new Image();
                img.onload=()=>{
                      console.log("::"+img.width+":"+img.height);
                      var modalMessage=this.state.modalMessage;
                      if(img.width!=1920 && img.height !=1080){
                          modalMessage="the image has to be 1920 x 1080";
                      }
                      this.setState(Object.assign({},this.state,{
                        file,
                        imagePreviewUrl,
                        imageType,
                        width:img.width,
                        height:img.height,
                        modalMessage
                      }));
                };
                img.src=imagePreviewUrl;
         };
        reader.readAsDataURL(acceptedFile);

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
  clearProgress(){
    this.setProgressValue(0,0);
  }
  onUploadProgess(progressValue,total){
    this.setProgressValue(progressValue,total);
  }
  onUploadComplete(){
    this.clearProgress();
    this.props.onComplete(this.state.filepath,this.state.baseURL, this.state.imageTags, this.state.width,this.state.height);
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
  buildFileName(){
    var fileVersion=genericUtil.getFileVersion(this.props.episode.imageSetNumber);
    var contractNumber=this.props.episode.contractNumber;
    var episodeNumber=this.props.episode.episodeNumber;
    return genericUtil.buildImageFileName(contractNumber,episodeNumber,fileVersion,this.state.width, this.state.height,this.state.imageType);
  }
  setFilePath(filepath, baseURL){
    this.setState(Object.assign({}, this.state,{filepath,baseURL}))

  }
  onUpload(){

     var appconfig=appdata.getAppConfig();
     var uploadFilename=this.buildFileName();
     var uploadRequest={
                 file:appconfig.imageClientFolder+"/"+uploadFilename,
                 bucket:appconfig.imageBucket
      };
      var that=this;
      api.requestS3UploadURL(uploadRequest).then(function(data){
         console.log("presign response:"+JSON.stringify(data));
         that.startUpload(data);
      });
  }
setImageTags(imageTags){
   this.setState(Object.assign({}, this.state,{imageTags}));
}
  render() {
        return(
           <div>
              <RenderImage {...this.state} onDrop={this.onDrop.bind(this)}
                onUpload={this.onUpload.bind(this)} setImageTags={this.setImageTags.bind(this)}/>
              <ModalDialog message={this.state.modalMessage} onClearMessage={this.onClearMessage.bind(this)}/>
           </div>
        );

  }





}
