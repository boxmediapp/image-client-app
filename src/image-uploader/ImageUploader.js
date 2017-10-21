import React, {Component} from 'react'


import {textValues,images} from  "../configs";
import Dropzone from 'react-dropzone'
import {data} from "../store";

import {imageUtil} from "../utils";

import ImagePreview from "./ImagePreview";
import DisplayImageProperty from "./DisplayImageProperty";
import DisplayUploadButton from "./DisplayUploadButton";
import UploadFileToS3 from "./UploadFileToS3";
import {styles} from "./styles";
import  "./styles/ImageUploader.css";


var uploadfileToS3=new UploadFileToS3();

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
    uploadfileToS3.startUpload(s3,this.state.file);

  }



  render() {


    return (
               <div className="container">
                       <div className="row">
                         <div className="col-sm-6 dropzone">

                                  <Dropzone onDrop={this.onDrop.bind(this)} style={styles.dropZone}>
                                      <ImagePreview data={this.state}/>
                                  </Dropzone>

                        </div>
                        <div className="col-sm-6 imagePropertyCell">
                                   <DisplayImageProperty data={this.state}/>
                                     <DisplayUploadButton startUpload={this.startUpload.bind(this)} uploadFilename={this.state.uploadFilename} data={this.state}/>
                        </div>

                      </div>






              </div>
            );
  }
}
