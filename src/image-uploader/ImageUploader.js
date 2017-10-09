import React, {Component} from 'react'


import {textValues,images} from  "../configs";
import Dropzone from 'react-dropzone'


export  default class ImageUploader extends Component {
   constructor(props){
     super(props);
     this.state={files:null,imagePreviewUrl:null};
   }
   onDrop(acceptedFiles, rejectedFiles){

      if(acceptedFiles && acceptedFiles.length>0){
        var acceptedFile=acceptedFiles[0];
        let reader = new FileReader();
        reader.onloadend = () => {
                this.setState({
                  file: acceptedFile,
                  imagePreviewUrl: reader.result
                });
         };
        reader.readAsDataURL(acceptedFile);
      }


   }
  render() {

    return (
               <div class="container">
                       <div class="row">
                         <div class="col-sm-12">
                              <div className="dropzone">
                                  <Dropzone onDrop={this.onDrop.bind(this)}>
                                      <ImagePreview url={this.state.imagePreviewUrl}/>
                                  </Dropzone>
                              </div>
                         </div>
                      </div>
                      <div class="row">
                          <div class="col-sm-12">
                                <button type="button" class="btn btn-default">Upload</button>
                          </div>
                      </div>




              </div>
            );
  }
}

class ImagePreview extends Component {
   render(){
     if(this.props.url){
       return(
           <img src={this.props.url}/>
       );
     }
     else{
        return(
          <div className="previewText">Drag and drop the image to  here</div>
        );

     }

   }

}
