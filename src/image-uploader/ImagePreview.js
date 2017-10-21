import React, {Component} from 'react';
import  "./styles/ImagePreview.css";

export default class ImagePreview extends Component {
   render(){
     const {imagePreviewUrl}=this.props.data;
     if(imagePreviewUrl){
       return(
          <div  className="previewContainer">
               <img src={imagePreviewUrl} className="imagePreview"/>
          </div>
       );
     }
     else{
        return(
          <div className="previewText">Click or drag and drop the image to  here</div>
        );

     }

   }

}
