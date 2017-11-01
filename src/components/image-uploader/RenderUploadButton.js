import React, {Component} from 'react'
import {styles} from "./styles";

export default class RenderUploadButton extends Component{

      render(){
         if(!this.props.imagePreviewUrl){
           return null;
         }

         if(this.props.isUploadImageSizeCorrect(this.props.width,this.props.height)){
           return (
               <div style={styles.uploadButtonContainer}>
                 <button type="button" className="btn btn-primary btn-normal" onClick={this.props.onUpload}>Upload</button>
               </div>
             );
         }
         else{
           return null;
         }


        }
}
