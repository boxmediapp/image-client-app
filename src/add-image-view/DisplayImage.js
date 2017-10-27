import React, {Component} from 'react'
import {ListEpisodes,ImageUploader} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues} from "../configs";


export default class DisplayImage extends Component{

      constructor(props){
            super(props);
            var {id,filename,s3BaseURL,width,height,tags,imageSet}=this.props.image;
            this.state={id,filename,s3BaseURL,width,height,tags,imageSet};
      }
      buildFileName(width, height, filetype){
        return this.state.filename;
      }
      isUploadImageSizeCorrect(width, height){
        return width && height && this.props.image.width==1920 && this.props.image.height ==1080;
      }

      onUploadComplete(data){
                console.log("Image is replaced");
      }
      render(){
              var appconfig=appdata.getAppConfig();
              return(
                      <ImageUploader onComplete={this.onUploadComplete.bind(this)}
                      image={this.props.image}
                      buildFileName={this.buildFileName.bind(this)}
                      isUploadImageSizeCorrect={this.isUploadImageSizeCorrect.bind(this)}
                      bucket={appconfig.imageBucket}/>
                  );

      }
}
