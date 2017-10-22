import React, {Component} from 'react'

import Dropzone from 'react-dropzone'


import {imageUtil,genericUtil} from "../../utils";
import {appdata} from "../../store";
import {api} from "../../api";
import {textValues} from "../../configs";
import {ModalDialog} from "../index";
import {styles} from "./styles";
import  "./styles/ImageUploader.css";






export  default class ImageUploader extends Component {
   constructor(props){
     super(props);
     this.state={file:null,imagePreviewUrl:null,
       imageType:null,width:0,height:0, modalMessage:null, progressValue:0, progressTotal:0,
       imageTags:null, fileVersion:"001"};
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
    var uploadFilename=this.buildFileName();
    this.clearProgress();
    this.props.onComplete(uploadFilename);
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
    return genericUtil.buildImageFileName(this.props.episode,this.state.fileVersion,this.state.width, this.state.height,this.state.imageType);
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
    if(this.state.imagePreviewUrl){
            return this.renderPreview();
    }
    else {
      return this.renderDropNewImage();
    }


  }

  renderDropNewImage(){

    return(
      <div className="newImageDropContainer dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)} style={styles.newImagedropZone}>
              <div className="previewText">Click or drag and drop the image to  here</div>
          </Dropzone>
          <ModalDialog message={this.state.modalMessage} onClearMessage={this.onClearMessage.bind(this)}/>


     </div>
    );

  }
    renderPreview(){
      var renderUpload=false;
      var renderTags=false;
      if(this.state.width==1920 && this.state.height ==1080 && this.state.imageTags){
        renderUpload=true;
      }
      if(this.state.width==1920 && this.state.height ==1080){
        renderTags=true;
      }

      var showModalDialog=false;
      if(this.state.modalMessage){
          showModalDialog=true;
          console.log("*******modalMessage******");
      }
      return(
             <div className="previewImageContainer">
                   <div  className="previewImageCell">
                       <Dropzone onDrop={this.onDrop.bind(this)} style={styles.previewImagedropZone(this.state.width)}>
                              <img src={this.state.imagePreviewUrl} className="imagePreview"/>
                              <ProgressBar {...this.state}/>
                       </Dropzone>
                   </div>
                   <div  className="imageFooter container">
                            <RenderDimension render={true} {...this.state}/>
                            <RenderTagInput {...this.state} render={renderTags} setImageTags={this.setImageTags.bind(this)}/>
                            <RenderUploadButton {...this.state} render={renderUpload} onUpload={this.onUpload.bind(this)}/>

                   </div>
                   <ModalDialog message={this.state.modalMessage} onClearMessage={this.onClearMessage.bind(this)}/>
             </div>
      );
    }

}

class RenderDimension extends Component{
  render(){
    if(this.props.render){
      return(

        <div className="dimensionContainer">
          {this.props.width} x {this.props.height}
        </div>
      );
    }
    else{
      return null;
    }

  }
}
class RenderTagInput extends Component{

  render(){
     if(this.props.render){
       return (
         <div className="formField">
            <label htmlFor="title">tag:</label>
            <input type="text" className="form-control" id="imageTags" placeholder="Tags" name="tags" onChange={evt=>{this.props.setImageTags(evt.target.value)}}/>
         </div>
       );
     }
     else{
       return null;
     }

  }
}

class RenderUploadButton extends Component{
  render(){
     if(this.props.render){
       return (
         <div className="formField">
           <button type="button" className="btn btn-default" onClick={this.props.onUpload}>Upload</button>
         </div>
       );
     }
    else{
      return null;
    }

  }
}


class ProgressBar extends Component {
  render(){
    if(this.props.progressTotal){
      var thumbnailwidth=this.props.width*300/this.props.height;
      var finishedWith=this.props.width*300/this.props.height*this.props.progressValue/this.props.progressTotal;
      return(
            <div style={styles.progressBar(thumbnailwidth)}>
                <div style={styles.progressBarProgress(finishedWith)}>
                </div>
            </div>

      );
    }
    else{
        return null;
    }




  }


}
