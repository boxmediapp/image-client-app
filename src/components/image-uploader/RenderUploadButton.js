import React, {Component} from 'react'
import {styles} from "./styles";

export default class RenderUploadButton extends Component{

      render(){
         if(!this.props.imagePreviewUrl){
           return null;
         }

         if(!this.props.imageTags){
           return null;
         }
         if(this.props.filepath){
           return null;
         }
         if(this.props.isUploadImageSizeCorrect()){
           return (
               <div style={styles.uploadButtonContainer}>
                 <button type="button" className="btn btn-default" onClick={this.props.onUpload}>Upload</button>
               </div>
             );
         }
         else{
           return null;
         }


        }
}
