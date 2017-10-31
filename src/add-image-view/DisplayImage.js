import React, {Component} from 'react'
import {ListEpisodes,ImageUploader} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import "./styles/index.css";
import {styles} from "./styles";

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
      setTags(tags){
         this.setState(Object.assign({}, this.state,{tags}));
      }
      updateTags(tags){
            var image=Object.assign({},this.state.image,{tags});
            this.setState(Object.assign({},this.state,{image}));
            api.updateImage(image);
      }
      render(){
              var appconfig=appdata.getAppConfig();
              return(
                     <div className="content">
                       <div className="row">
                               <div className="col-sm-6">
                                    <ImageUploader onComplete={this.onUploadComplete.bind(this)}
                                    image={this.props.image}
                                    imageTags={this.props.image.tags}
                                    buildFileName={this.buildFileName.bind(this)}
                                    isUploadImageSizeCorrect={this.isUploadImageSizeCorrect.bind(this)}
                                    bucket={appconfig.imageBucket} updateTags={this.updateTags.bind(this)}/>
                                </div>
                                <div className="col-sm-6 imageRightProperty">
                                       <DisplayImageProperty {...this.state} setTags={this.setTags.bind(this)} updateTags={this.updateTags.bind(this)}/>
                                         <button type="button" className="btn btn-primary btn-normal" onClick={(evt) => {
                                                 this.props.deleteImage(this.props.image);
                                             }}>Delete</button>
                                </div>
                       </div>
                    </div>
                  );

      }
}

class DisplayImageProperty extends Component{
  constructor(props){
        super(props);
        var tags=this.props.image.tags;
        if(!tags){
          tags="";
        }
        this.state={tags};
  }
  setTags(tags){
     this.setState(Object.assign({}, this.state,{tags}));
  }

  render(){
        var {width, height}=this.props.image;
        return(
            <div style={styles.imageProperty}>
                     <div className="formFieldWithLabel">
                            <div className="labelContainer">Resolution:</div>
                            <div className="fieldValue">{width} x {height}</div>
                     </div>
                     <div style={styles.imageProperty}>
                              <div className="formFieldWithLabel">
                                     <div className="labelContainer">Tags:</div>
                                     <div className="fieldValue">
                                         <input type="text"
                                           className="form-control" id="imageTags"

                                           value={this.state.tags}

                                           onChange={evt=>this.setTags(evt.target.value)}/>
                                         <DisplayUpdateTagsButton tags={this.state.tags} image={this.props.image} updateTags={this.props.updateTags}/>
                                     </div>
                              </div>
                     </div>

            </div>


        );

  }
}
class DisplayUpdateTagsButton extends Component {
      render(){
           if(this.props.image.tags !=this.props.tags){
             return (
               <button type="button" className="btn btn-primary btn-block" onClick={(evt) => {
                        this.props.updateTags(this.props.tags);
                    }}>Update Tags</button>
             );
           }
           else{
             return null;
           }

      }

}
