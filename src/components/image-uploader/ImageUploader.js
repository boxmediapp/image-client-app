import React, {Component} from 'react';




import {imageUtil,genericUtil} from "../../utils";

import {api} from "../../api";
import {textValues} from "../../configs";
import {styles} from "./styles";


import Dropzone from 'react-dropzone';
import "./styles/index.css";

import {ProgressBar,ModalDisplayImage} from "../index";



export  default class ImageUploader extends Component {
   constructor(props){
     super(props);
     this.state={file:null,imagePreviewUrl:null,
       imageType:null,width:0,height:0, progressValue:0, progressTotal:0,
        filepath:null,baseURL:null,mql:styles.mql};

     this.mediaQueryChanged=this.mediaQueryChanged.bind(this);

   }

   setProgressValue(progressValue,progressTotal){
     this.setState(Object.assign({}, this.state,{progressValue,progressTotal}));
   }
   componentWillMount(){
     styles.mql.addListener(this.mediaQueryChanged);
   }
   componentWillUnmount() {
     styles.mql.removeListener(this.mediaQueryChanged);
   }
   mediaQueryChanged(){
     this.setState(Object.assign({}, this.state, {mql:styles.msql}));
   }

   onDrop(acceptedFiles, rejectedFiles){
      if(acceptedFiles && acceptedFiles.length>0){
        imageUtil.getImagePreviewAndInfo(acceptedFiles[0],data=>{
              if(this.props.onDropSucess(data)){
                this.setState(Object.assign({},this.state,data));
              }
        }, errorMessage =>{
            this.props.onDropFailed(errorMessage);
        });

      }


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
      filepath:null,baseURL:null});




  }
  onUploadProgess(progressValue,total){
    this.setProgressValue(progressValue,total);
  }
  onUploadComplete(){

  setTimeout(()=>{
    this.props.onComplete(this.state);
    this.initSate();
  },1000);  
    

  }
  onUploadError(result){

    this.setProgressValue(0,0);

    this.props.onUploadError(textValues.upload.failed);
  }
  onUploadAborted(){
    this.setProgressValue(0,0);
    this.props.onUploadError(textValues.upload.aborted);
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
          this.props.onUploadError("Failed upload the file:"+error);
      });
  }

  render() {
        if(this.state.imagePreviewUrl){
              return this.renderPreviewImage();
        }
        else if(this.props.image){
               return this.renderImage();               
        }
        else{
               return this.renderDropPlaceHolder();
        }          
  }
  renderDropPlaceHolder(){
    return (
      <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)} style={styles.dropzone()}>
            {
              textValues.uploadHDImageText.map((txt,ind)=>{
                return(<div style={styles.previewText} key={ind}>{txt}</div>);
              })
            }
          </Dropzone>
      </div>
    );
  }
  renderPreviewImage(){
        var {width,height,progressValue,progressTotal,imagePreviewUrl}=this.state;    
        return(
                <div style={styles.previewImageContainer}>
                      <div  className="dropzone">
                          <Dropzone onDrop={this.onDrop.bind(this)} style={styles.dropzone(width, height)}>
                                 <img src={imagePreviewUrl} style={styles.dropzone(width, height)}/>
                                 <ProgressBar width={width} height={height} progressValue={progressValue} progressTotal={progressTotal}/>
                          </Dropzone>
                      </div>
                      <div  style={styles.imageFooter}>
                               <button type="button" className="btn btn-primary btn-normal imageControlButton" onClick={this.onUpload.bind(this)}>Upload</button>
                               <ModalDisplayImage imageURL={imagePreviewUrl} width={width} height={height}/>
                      </div>
                </div>
            );
  }
  renderImage(){
    var imageURL=this.props.image.s3BaseURL+"/"+this.props.image.filename;
    var {width, height}=this.props.image;
    return(
           <div style={styles.previewImageContainer}>
                 <div  className="dropzone">
                     <Dropzone onDrop={this.onDrop.bind(this)} style={styles.dropzone(width, height)}>
                            <div style={styles.previewText}>Drop an image here</div>
                            <div style={styles.previewText}>Requires: {width} x {height}</div>
                     </Dropzone>
                 </div>
                 <div  style={styles.imageFooter}>                        
                     <button type="button" className="btn btn-primary btn-normal imageControlButton" onClick={(evt) => {
                         this.props.setEditImageMode(false);
                     }}>Cancel</button>
                 </div>
           </div>
    );
  }

}






