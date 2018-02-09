import React, {Component} from 'react'
import {ListEpisodes} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import DisplaySetProperty from "./DisplaySetProperty";
import ImageSetOperations from "./ImageSetOperations";
import DisplayImage from "./DisplayImage";
import CopyImageSetDialog from "./CopyImageSetDialog";
import {styles} from "./styles";

export default class DisplayImageSet extends Component{

  constructor(props){
      super(props);
      this.state={imageSetToCopy:null};
  }
  dismissCloneImageSet(){
    this.setState(Object.assign({}, this.state, {imageSetToCopy:null}));
  }
  updateTitle(title){
      this.props.updateImageSetTitle(this.props.imageSet, title);
  }
  deleteImage(image){
      this.props.deleteImage(image,this.props.imageSet);
  }
  deleteImageSet(){
      this.props.deleteImageSet(this.props.imageSet);
  }
  approveImageSet(){
      this.props.approveImageSet(this.props.imageSet);
  }
  copyImageSet(){

      var imageSetToCopy=this.props.imageSet;

      this.setState(Object.assign({}, this.state,{imageSetToCopy}));
  }

  render(){

    return (
          <div style={styles.imageSetContainer}>
              <DisplaySetProperty {...this.props.imageSet} updateTitle={this.updateTitle.bind(this)}
              deleteImageSet={this.deleteImageSet.bind(this)}
              approveImageSet={this.approveImageSet.bind(this)}/>
              <DisplayImagesInImageSet {...this.props.imageSet} deleteImage={this.deleteImage.bind(this)}/>

            <ImageSetOperations deleteImageSet={this.deleteImageSet.bind(this)}
              approveImageSet={this.approveImageSet.bind(this)}
              copyImageSet={this.copyImageSet.bind(this)}/>

            <CopyImageSetDialog imageSetToCopy={this.state.imageSetToCopy} dismissDialog={this.dismissCloneImageSet.bind(this)}/>
         </div>
          );
  }
}

class DisplayImagesInImageSet extends Component{
  render(){
      if(this.props.images){
              return this.props.images.map(image=>{
                   return(<DisplayImage image={image} key={image.id} deleteImage={this.props.deleteImage}/>);
              });
      }
      else{
        return null;
      }

  }
}
