import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {styles} from "./styles";
import {ProgressBar,ModalDisplayImage} from "../index";

import {textValues} from "../../configs";



export default class RenderImage extends Component{
  render(){
    var imageURL=null;
    var width=0;
    var height=0;

    if(this.props.imagePreviewUrl){
        imageURL=  this.props.imagePreviewUrl;
        width=this.props.width;
        height=this.props.height;
    }
    else if(this.props.image){
        imageURL=this.props.image.s3BaseURL+"/"+this.props.image.filename;
        width=this.props.image.width;
        height=this.props.image.height;
    }
    else{
      return (
        <div className="dropzone">
            <Dropzone onDrop={this.props.onDrop.bind(this)} style={styles.dropzone()}>
              {
                textValues.uploadHDImageText.map((txt,ind)=>{
                  return(<div style={styles.previewText} key={ind}>{txt}</div>);
                })
              }
            </Dropzone>
        </div>

      );
    }
    return(
           <div style={styles.previewImageContainer}>
                 <div  className="dropzone">
                     <Dropzone onDrop={this.props.onDrop} style={styles.dropzone(width, height)}>
                            <img src={imageURL} style={styles.dropzone(width, height)}/>
                            <ProgressBar {...this.props}/>
                     </Dropzone>
                 </div>
                 <div  style={styles.imageFooter}>
                          <RenderUploadButton {...this.props}/>
                          <ModalDisplayImage imageURL={imageURL} width={width} height={height}/>
                 </div>
           </div>
    );
  }



}



class RenderUploadButton extends Component{

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