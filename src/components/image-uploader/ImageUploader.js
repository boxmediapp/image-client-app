import React, {Component} from 'react'

import Dropzone from 'react-dropzone'


import {imageUtil,genericUtil} from "../../utils";
import {appdata} from "../../store";
import {api} from "../../api";


import {styles} from "./styles";
import  "./styles/ImageUploader.css";




export  default class ImageUploader extends Component {
   constructor(props){
     super(props);
     this.state={file:null,imagePreviewUrl:null, imageType:null,width:0,height:0,uploadFilename:null };
   }


   onDrop(acceptedFiles, rejectedFiles){
      if(acceptedFiles && acceptedFiles.length>0){
        var acceptedFile=acceptedFiles[0];
        let reader = new FileReader();
        reader.onloadend = () => {
                var imageType=imageUtil.getImageType(reader.result);
                var file=acceptedFile;
                var imagePreviewUrl=reader.result;
                var uploadFilename=this.props.uploadFilename+"."+imageType;
                if(!imageType){
                    console.error("not image");
                    return;
                }
                var img=new Image();
                img.onload=()=>{
                      console.log("::"+img.width+":"+img.height);
                      this.setState({
                        file,
                        imagePreviewUrl,
                        imageType,
                        width:img.width,
                        height:img.height,
                        uploadFilename
                      });
                };
                img.src=imagePreviewUrl;
         };
        reader.readAsDataURL(acceptedFile);

      }


   }




  startUpload(s3){
    genericUtil.startUpload(s3,this.state.file);
  }
  onUpload(){
     var appconfig=appdata.getAppConfig();
     var uploadRequest={
                 file:appconfig.imageClientFolder+"/"+this.props.uploadFilename,
                 bucket:appconfig.imageBucket
      };
      var that=this;
      api.requestS3UploadURL(uploadRequest).then(function(data){
         console.log("presign response:"+JSON.stringify(data));
         that.startUpload(data);
      });
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
      <div className="container dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)} style={styles.dropZone}>
              <div className="previewText">Click or drag and drop the image to  here</div>
          </Dropzone>
     </div>
    );
  }
    renderPreview(){
      return(
             <div className="imagePreviewContainer">
                   <div  className="previewContainer">
                       <Dropzone onDrop={this.onDrop.bind(this)} style={styles.dropZone}>
                           <img src={this.state.imagePreviewUrl} className="imagePreview"/>
                       </Dropzone>
                   </div>
                   <div  className="imageFooter">
                          {this.width} x {this.height}
                           <button type="button" className="btn btn-default" onClick={this.onUpload.bind(this)}>Upload</button>
                   </div>
             </div>
      );
    }

}
