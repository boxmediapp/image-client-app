import React, {Component} from 'react'
import {ListEpisodes,ImageUploader} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import DisplaySetProperty from "./DisplaySetProperty";
import DisplayImage from "./DisplayImage";
import {styles} from "./styles";

export default class DisplayImageSet extends Component{


  render(){

    return (
          <div style={styles.imageSetContainer}>
              <DisplaySetProperty {...this.props.imageSet}/>
              <DisplayImagesInImageSet {...this.props.imageSet}/>
         </div>
          );
  }
}

class DisplayImagesInImageSet extends Component{
  render(){
      if(this.props.images){
              return this.props.images.map(image=>{
                   return(<DisplayImage image={image} key={image.id}/>);
              });
      }
      else{
        return null;
      }

  }
}
