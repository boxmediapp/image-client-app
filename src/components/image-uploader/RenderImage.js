import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import {styles} from "./styles";
import {ProgressBar} from "../index";
import RenderDimension from "./RenderDimension";
import RenderTagInput from "./RenderTagInput";
import RenderUploadButton from "./RenderUploadButton";
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
                <div style={styles.previewText}>Click or drag and drop the image to  here</div>
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
                          <RenderDimension {...this.props}/>
                          <RenderTagInput {...this.props}/>
                          <RenderUploadButton {...this.props}/>
                 </div>
           </div>
    );
  }



}
