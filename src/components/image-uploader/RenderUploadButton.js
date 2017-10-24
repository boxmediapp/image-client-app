import React, {Component} from 'react'
import {styles} from "./styles";

export default class RenderUploadButton extends Component{
      isImageSizeCorrect(requiredWidth, requiredHeight){
            return this.props.width && this.props.height && this.props.width==requiredWidth && this.props.height ==requiredHeight;
      }
      render(){
         if(!this.props.imagePreviewUrl){
           return null;
         }
         if(this.props.image){
              if(!this.isImageSizeCorrect(this.props.image.width,this.props.image.height)){
                return null;
              }
         }
         else{
           if(!this.isImageSizeCorrect(1920,1080)){
             return null;
           }
         }
         if(!this.props.imageTags){
           return null;
         }
         return (
             <div style={styles.uploadButtonContainer}>
               <button type="button" className="btn btn-default" onClick={this.props.onUpload}>Upload</button>
             </div>
           );
        }
}
