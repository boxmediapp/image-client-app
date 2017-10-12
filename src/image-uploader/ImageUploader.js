import React, {Component} from 'react'


import {textValues,images} from  "../configs";
import Dropzone from 'react-dropzone'
import {data} from "../store";
import {api} from "../api";

export  default class ImageUploader extends Component {
   constructor(props){
     super(props);
     this.state={file:null,imagePreviewUrl:null, imageType:null};
   }
   getImageType(content){
     if(!content){
       console.log("Failed to read the file");
       return null;
     }
     var dataPrefix="data:";
     var dataPrefixLength=dataPrefix.length;
     var ib=content.indexOf(dataPrefix);
     if(ib!==0){
         console.log("Failed to read file content");
         return null;
     }
     var slashIndex=content.indexOf('/',dataPrefixLength);
     if(slashIndex<=0){
       console.log("wrong format, slash missing");
       return null;
     }
     var imageString=content.substring(dataPrefixLength,slashIndex);
     if(imageString!=="image"){
       console.log("It is not a image type");
       return null;
     }
     var semiColnIndex=content.indexOf(';',slashIndex+1);
     if(semiColnIndex<=0){
          console.log("Failed to get the image type");
          return null;
     }
     var imageType=content.substring(slashIndex+1,semiColnIndex);
     if(!imageType){
           console.log("empty image type");
           return null;
     }
     return imageType;
   }
   onDrop(acceptedFiles, rejectedFiles){

      if(acceptedFiles && acceptedFiles.length>0){
        var acceptedFile=acceptedFiles[0];
        let reader = new FileReader();
        reader.onloadend = () => {
                var imageType=this.getImageType(reader.result);
                if(imageType){
                  this.setState({
                    file: acceptedFile,
                    imagePreviewUrl: reader.result,
                    imageType
                  });
                }
                else{
                  console.error("not image");
                }

         };
        reader.readAsDataURL(acceptedFile);
      }


   }
   onUpload(){
      var appconfig=data.getAppConfig();
console.log("******[****imageMasterFolder]:"+JSON.stringify(appconfig));
      var uploadRequest={
                  file:appconfig.imageMasterFolder+"/test.png",
                  bucket:appconfig.imageBucket
       };
       api.requestS3UploadURL(uploadRequest).then(function(data){
         console.log("presign response:"+JSON.stringify(data));
       });

   }
  render() {

    return (
               <div className="container">
                       <div className="row">
                         <div className="col-sm-12">
                              <div className="dropzone">
                                  <Dropzone onDrop={this.onDrop.bind(this)}>
                                      <ImagePreview url={this.state.imagePreviewUrl}/>
                                  </Dropzone>
                              </div>
                         </div>
                      </div>
                      <div className="row">
                          <div className="col-sm-12">
                                <button type="button" className="btn btn-default" onClick={this.onUpload.bind(this)}>Upload</button>
                          </div>
                      </div>




              </div>
            );
  }
}

class ImagePreview extends Component {
   render(){
     if(this.props.url){
       return(
           <img src={this.props.url}/>
       );
     }
     else{
        return(
          <div className="previewText">Drag and drop the image to  here</div>
        );

     }

   }

}
