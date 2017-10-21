import React, {Component} from 'react';
import  "./styles/ImagePreview.css";
import {appdata} from "../../store";
import {api} from "../../api";

export default class ImagePreview extends Component {

  onUpload(){
     var appconfig=appdata.getAppConfig();

     var uploadRequest={
                 file:appconfig.imageClientFolder+"/"+this.props.uploadFilename,
                 bucket:appconfig.imageBucket
      };
      var that=this;
      api.requestS3UploadURL(uploadRequest).then(function(data){
         console.log("presign response:"+JSON.stringify(data));
         that.props.startUpload(data);
      });
  }

   render(){
     const {imagePreviewUrl,width,height}=this.props.data;
     if(imagePreviewUrl){
       return(
        <div className="imagePreviewContainer">
              <div  className="previewContainer">
                   <img src={imagePreviewUrl} className="imagePreview"/>
              </div>
              <div  className="imageFooter">
                    {width} x {height}
                      <button type="button" className="btn btn-default" onClick={this.onUpload.bind(this)}>Upload</button>
              </div>
        </div>
       );
     }
     else{
        return(
             <div className="previewText">Click or drag and drop the image to  here</div>
        );

     }

   }

}
