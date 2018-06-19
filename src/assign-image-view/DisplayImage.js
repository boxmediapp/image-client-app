import React, {Component} from 'react'
import {ListEpisodes,ImageUploader,DisplayImateForReplace,ModalDialog} from "../components";
import {genericUtil} from "../utils";

import {store,appdata} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import "./styles/index.css";
import {styles} from "./styles";
import SelectImageStatus from "./SelectImageStatus";
export default class DisplayImage extends Component{

      constructor(props){
            super(props);
            this.state={...this.props.image, image:this.props.image, mql:styles.msql,modalMessage:null,
            edit:false, cacheid:1};
      }
      onClearMessage(){
        this.setState(Object.assign({}, this.state,{modalMessage:null}));
      }
      setErrorMessage(content){
         var modalMessage={
                title:"Error",
                content,
                onConfirm:this.onClearMessage.bind(this),
                confirmButton:"OK"
         }
         this.setState(Object.assign({}, this.state,{modalMessage}));
      }
      setEditImageMode(edit){
        this.setState(Object.assign({}, this.state,{edit}));

      }
      onConfirmDeleteImage(){
        this.onClearMessage();
        this.props.deleteImage(this.props.image);
      }
      onCancelDeleteImage(){
        this.onClearMessage();
      }
      checkPermission(){
          var userinfo=appdata.getUserInfo();
          if(genericUtil.doesUserHasFullAccess(userinfo)){
             return true;
          }
          else{
            var modalMessage={
                   title:textValues.permissionError.title,
                   content:textValues.permissionError.content,
                   onConfirm:this.onClearMessage.bind(this),
                   confirmButton:"OK"
            }
            this.setState(Object.assign({}, this.state,{modalMessage}));
            return false;
          }
      }
      displayConfirmDeleteDialog(){
        if(this.checkPermission()){
          var modalMessage={
                 title:textValues.deleteImageDialog.title,
                 content:textValues.deleteImageDialog.content,
                 onConfirm:this.onConfirmDeleteImage.bind(this),
                 confirmButton:textValues.deleteImageDialog.confirm,
                 cancelButton:textValues.deleteImageDialog.cancel,
                 onCancel:this.onCancelDeleteImage.bind(this)
          }
          this.setState(Object.assign({}, this.state,{modalMessage}));
        }
      }
      displayConfirmCopyToMediaAppDialog(){
          if(this.checkPermission()){
                var modalMessage={
                       title:textValues.uploadToMediaAppDialog.title,
                       content:textValues.uploadToMediaAppDialog.content,
                       onConfirm:this.onClearMessage.bind(this),
                       confirmButton:textValues.uploadToMediaAppDialog.confirm,
                }
                this.setState(Object.assign({}, this.state,{modalMessage}));
          }

      }
      uploadImageToMediaApp(){
            this.state.image.imageBoxMediaStatus="UPLOADED";
            this.onClearMessage();
            var mediaCommand={
              command:"copy-image-to-box-media-app",
              imageId:this.state.image.id
            };
            api.sendCommand(mediaCommand).then(sucess=>{
              this.displayConfirmCopyToMediaAppDialog();
            }).catch(error=>{
              this.setErrorMessage("Failed to upload the image to box media app:"+error);
            });



      }
      componentWillMount(){
        this.mediaQueryChanged=this.mediaQueryChanged.bind(this);
        styles.mql.addListener(this.mediaQueryChanged);
      }
      componentWillUnmount() {
        styles.mql.removeListener(this.mediaQueryChanged);
      }
      mediaQueryChanged(){
        this.setState(Object.assign({}, this.state, {mql:styles.msql}));
      }

      buildFileName(width, height, filetype){
        return this.state.filename;
      }
      isUploadImageSizeCorrect(width, height){
        return width && height && this.props.image.width==width && this.props.image.height ==height;
      }

      onUploadComplete(data){
                console.log("Image is replaced");
                this.setEditImageMode(false);
                var cacheid=this.state.cacheid+1;
                var edit=false;

                if(this.state.image.imageBoxMediaStatus==="UPLOADED"){
                    this.state.image.imageBoxMediaStatus="CAN_UPLOAD";
                    api.updateImage(this.state.image);
                }
                this.setState(Object.assign({}, this.state, {cacheid,edit}));
      }
      setTags(tags){
         this.setState(Object.assign({}, this.state,{tags}));
      }
      updateTags(tags){
            var image=Object.assign({},this.state.image,{tags});
            this.setState(Object.assign({},this.state,{image}));
            api.updateImage(image);
      }
      updateImageStatus(imageStatus){
            var image=Object.assign({},this.state.image,{imageStatus});
            this.setState(Object.assign({},this.state,{image}));
            api.updateImage(image);
      }
      onDropFailed(errorMessage){
            this.setErrorMessage(errorMessage);
      }
      onDropSucess(imageInfo){
        if(this.isUploadImageSizeCorrect(imageInfo.width,imageInfo.height)){
              return true;
        }
        else{
          this.setErrorMessage(textValues.notCorrectSize.droppedImage+imageInfo.width+" x "+imageInfo.height+textValues.notCorrectSize.required);
          return false;
        }
      }
      onUploadError(result){
        console.log("error:"+JSON.stringify(result));
        this.setErrorMessage(textValues.upload.failed);
      }


      render(){
              var appconfig=appdata.getAppConfig();
              return(
                     <div style={styles.imageRecord()}>

                     <DisplayImageEditor onComplete={this.onUploadComplete.bind(this)}
                     image={this.props.image}
                     buildFileName={this.buildFileName.bind(this)}
                     bucket={appconfig.imageBucket} updateTags={this.updateTags.bind(this)}
                     onDropFailed={this.onDropFailed.bind(this)}
                     onDropSucess={this.onDropSucess.bind(this)}
                     onUploadError={this.onUploadError.bind(this)} edit={this.state.edit}
                     setEditImageMode={this.setEditImageMode.bind(this)} cacheid={this.state.cacheid}/>

                                  <div style={styles.imageRightProperty}>
                                       <DisplayImageProperty {...this.state} setTags={this.setTags.bind(this)}
                                         updateTags={this.updateTags.bind(this)} updateImageStatus={this.updateImageStatus.bind(this)}/>
                                         <div style={styles.imageButtonsContainer}>
                                            <button type="button" className="btn btn-primary btn-normal imageButtons" onClick={(evt) => {
                                                 this.displayConfirmDeleteDialog();
                                             }}>Delete</button>
                                             
                                        </div>
                                </div>
                                <ModalDialog message={this.state.modalMessage}/>

                    </div>
                  );

      }
}

class DisplayImageEditor extends Component{
    render(){
            if(this.props.edit){
                  return(
                    <ImageUploader {...this.props}/>
                  );
            }
            else{
                return (
                  <DisplayImateForReplace {...this.props}/>
                );
            }
    }


}


class DisplayImageProperty extends Component{
  constructor(props){
        super(props);
        var tags=this.props.image.tags;
        if(!tags){
          tags="";
        }
        this.state={tags};
  }
  setTags(tags){
     this.setState(Object.assign({}, this.state,{tags}));
  }

  render(){
        var {width, height}=this.props.image;
        return(
            <div style={styles.imageProperty}>
                     <div className="formFieldWithLabel">
                            <div className="labelContainer">Resolution:</div>
                            <div className="fieldValue">{width} x {height}</div>
                     </div>
                     <div style={styles.imageProperty}>
                              <div className="formFieldWithLabel">
                                     <div className="labelContainer">Tags:</div>
                                     <div className="fieldValue">
                                         <input type="text"
                                           className="form-control" id="imageTags"

                                           value={this.state.tags}

                                           onChange={evt=>this.setTags(evt.target.value)}/>
                                         <DisplayUpdateTagsButton tags={this.state.tags} image={this.props.image} updateTags={this.props.updateTags}/>
                                     </div>
                              </div>
                     </div>
                     <div style={styles.imageProperty}>
                        <SelectImageStatus imageStatus={this.props.image.imageStatus} updateImageStatus={this.props.updateImageStatus}/>
                     </div>




            </div>


        );

  }
}
class DisplayUpdateTagsButton extends Component {
      render(){
           if(this.props.image.tags !=this.props.tags){
             return (
               <button type="button" className="btn btn-primary btn-block" onClick={(evt) => {
                        this.props.updateTags(this.props.tags);
                    }}>Update Tags</button>
             );
           }
           else{
             return null;
           }

      }

}

class DisplayBoxMediaButtons extends Component{
  render(){
    if(this.props.image.imageBoxMediaStatus ==="CAN_UPLOAD"){
      return(
        <button type="button" className="btn btn-primary btn-normal" onClick={(evt) => {
                 this.props.uploadToBoxMediaApp();
             }}>Upload to Box Media</button>
      );
    }
    else{
      return null;
    }


  }


}
