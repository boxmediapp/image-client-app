import React, {Component} from 'react';
import  {styles} from  "./styles";
import {appdata} from "../../store";
import {api} from "../../api";
export default class DisplayUploadButton extends Component {

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
     const {imagePreviewUrl}=this.props.data;
     if(imagePreviewUrl){
       return(
          <div>
                <button type="button" className="btn btn-default" onClick={this.onUpload.bind(this)}>Upload</button>
          </div>
       );
     }
     else{
        return null;
     }

   }

}
