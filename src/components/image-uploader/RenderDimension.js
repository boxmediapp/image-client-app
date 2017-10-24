import React, {Component} from 'react';
import {styles} from "./styles";
export default class RenderDimension extends Component{
  render(){
    var width=0, height=0;
    if(this.props.image){
      width=this.props.image.width;
      height=this.props.image.height;
    }
    if(this.props.imagePreviewUrl){
        width=this.props.width;
        height=this.props.height;
    }

    if(width && height){
      return(
        <div stle={styles.dimensionContainer}>
              {width} x {height}
        </div>
      );
    }
    else{
      return null;
    }

  }
}
