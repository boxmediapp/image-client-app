

import React, {Component} from 'react'
import {ListEpisodes,ImageUploader} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues} from "../configs";



export default class DisplayCreateNewImageSet extends Component{

  onUploadComplete(data){
        this.createImageSet(data).then(imageset=>{
              return this.createImage(imageset,data);
        }).then(image=>{          
          this.props.onNewImageCreated(image);
        });
  }
  buildFileName(width, height, filetype){
    var appconfig=appdata.getAppConfig();
    var uploadFilename=genericUtil.buildImageFileName(this.props.contractNumber,this.props.episodeNumber,this.props.fileCounter,width, height,filetype);
    return appconfig.imageClientFolder+"/"+uploadFilename;
  }
  isImageSizeMatch(requiredWidth, requiredHeight){

  }
  isUploadImageSizeCorrect(width, height){
    return width && height && width==1920 && height ==1080;
  }
  createImageSet(data){
    var imageset={
         episodeId:this.props.episodeId,
         programmeNumber:this.props.contractNumber+"/"+this.props.episodeNumber,
         title:this.props.title,
         fileCounter:this.props.fileCounter
    }
    return api.createImageSet(imageset);
  }

  createImage(imageset,data){
            var image={
               filename:data.filepath,
               s3BaseURL:data.baseURL,
               width:data.width,
               height:data.height,
               tags:data.imageTags,
               imageSet:imageset,
               imageStatus:'WAITING_APPROVE',
            };
            api.createImage(image);
  }
  render(){
        var appconfig=appdata.getAppConfig();
        return (
          <div className="container">
                 <div className="row">
                   <div className="col-sm-12">
                       <ImageUploader  {...this.props}
                         fileCounter={this.props.fileCounter}
                         onComplete={this.onUploadComplete.bind(this)}
                         buildFileName={this.buildFileName.bind(this)}
                         isUploadImageSizeCorrect={this.isUploadImageSizeCorrect.bind(this)}
                         bucket={appconfig.imageBucket}/>
                   </div>
                 </div>

         </div>
          );


  }


}
