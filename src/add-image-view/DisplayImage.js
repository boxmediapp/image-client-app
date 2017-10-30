import React, {Component} from 'react'
import {ListEpisodes,ImageUploader} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import "./styles/index.css";


export default class DisplayImage extends Component{

      constructor(props){
            super(props);
            var {id,filename,s3BaseURL,width,height,tags,imageSet}=this.props.image;
            this.state={id,filename,s3BaseURL,width,height,tags,imageSet, image:this.props.image};
      }
      buildFileName(width, height, filetype){
        return this.state.filename;
      }
      isUploadImageSizeCorrect(width, height){
        return width && height && this.props.image.width==width && this.props.image.height ==height;
      }

      onUploadComplete(data){
                console.log("Image is replaced");
                this.forceUpdate();
      }
      updateTags(tags){

            this.state.image.tags=tags;
            this.setState(Object.assign({},this.state,{tags}));
            api.updateImage(this.state.image);

      }
      render(){
              var appconfig=appdata.getAppConfig();
              return(
                     <div className="content">
                       <div className="row">
                               <div className="col-sm-10">
                                    <ImageUploader onComplete={this.onUploadComplete.bind(this)}
                                    image={this.props.image}
                                    imageTags={this.props.image.tags}
                                    buildFileName={this.buildFileName.bind(this)}
                                    isUploadImageSizeCorrect={this.isUploadImageSizeCorrect.bind(this)}
                                    bucket={appconfig.imageBucket} updateTags={this.updateTags.bind(this)}/>
                                </div>
                                <div className="col-sm-2 imageRightProperty">
                                  <button type="button" className="btn btn-primary btn-normal" onClick={(evt) => {

                                           this.props.deleteImage(this.props.image);
                                       }}>Delete</button>
                                </div>
                       </div>
                    </div>
                  );

      }
}
