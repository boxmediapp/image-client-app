import React, {Component} from 'react';




import {imageUtil,genericUtil} from "../../utils";


import {textValues} from "../../configs";
import {styles} from "./styles";

import {ModalDisplayImage} from "../index";
import "./styles/index.css";



export  default class DisplayImateForReplace extends Component {
   constructor(props){
     super(props);
     this.state={mql:styles.mql,originalSize:false};
     this.mediaQueryChanged=this.mediaQueryChanged.bind(this);
   }
   
   setOriginalSize(originalSize){
     this.setState(Object.assign({}, this.state,{originalSize}));
   }
  componentWillMount(){
     styles.mql.addListener(this.mediaQueryChanged);
   }
   componentWillUnmount() {
     styles.mql.removeListener(this.mediaQueryChanged);
   }
   mediaQueryChanged(){
     this.setState(Object.assign({}, this.state, {mql:styles.msql}));
   }
   render(){
    var imageURL=this.props.image.s3BaseURL+"/"+this.props.image.filename+"?cacheid="+this.props.cacheid;
    var {width, height}=this.props.image;
    var {originalSize} =this.state;
    
    return(
           <div style={styles.previewImageContainer}>
                 <img src={imageURL} style={styles.imagezone(width, height,originalSize)}/>
                 <div  style={styles.imageFooter}>                        
                      <button type="button" className="btn btn-primary btn-normal imageControlButton" onClick={(evt) => {
                          this.props.setEditImageMode(true);
                      }}>Replace Image</button>
                      <DisplayShowOriginalImageButton width={width} height={height} originalSize={originalSize}
                      setOriginalSize={this.setOriginalSize.bind(this)}/>
                      <DisplayShowScaledImageButton originalSize={originalSize}
                      setOriginalSize={this.setOriginalSize.bind(this)}/>
                 </div>
           </div>
    );
  }

}

class DisplayShowOriginalImageButton extends Component{
  
  render(){
      if(this.props.originalSize){
        return null;
      }
      var fitResolution=imageUtil.calculateFitImageWidth({width:this.props.width,height:this.props.height});
      if(this.props.width<=fitResolution.width){
          return null;
      }
      return(
        <button type="button" className="btn btn-primary btn-normal imageControlButton" onClick={(evt) => {
            this.props.setOriginalSize(true);
        }}>View {this.props.width} x {this.props.height}</button>
      );
  }
  
}




class DisplayShowScaledImageButton extends Component{
  
  render(){
      if(!this.props.originalSize){
        return null;
      }      
      return(
        <button type="button" className="btn btn-primary btn-normal imageControlButton" onClick={(evt) => {
            this.props.setOriginalSize(false);
        }}>Back to scaled view</button>
      );
  }
  
}




