import React, {Component} from 'react'
import {ListEpisodes} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import DisplaySetProperty from "./DisplaySetProperty";
import DisplayImage from "./DisplayImage";
import {styles} from "./styles";

export default class DisplayImageSet extends Component{

  updateTitle(title){
      this.props.updateImageSetTitle(this.props.imageSet, title);
  }
  deleteImage(image){
      this.props.deleteImage(image,this.props.imageSet);
  }
  deleteImageSet(){
      this.props.deleteImageSet(this.props.imageSet);  
  }

  render(){

    return (
          <div style={styles.imageSetContainer}>
              <DisplaySetProperty {...this.props.imageSet} updateTitle={this.updateTitle.bind(this)} deleteImageSet={this.deleteImageSet.bind(this)}/>
              <DisplayImagesInImageSet {...this.props.imageSet} deleteImage={this.deleteImage.bind(this)}/>
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
