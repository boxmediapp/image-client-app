import React, {Component} from 'react';
import {Table, Column, Cell} from "fixed-data-table-2";
import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'
import {api} from "../api";
import {textValues,localImages} from "../configs";
import {LoadingIcon,ModalDialog} from "../components";
import {styles} from "./styles";
import {genericUtil} from "../utils";
import {store,appdata} from "../store";

export default class CopyImageSetDialog extends Component{
  constructor(props){
      super(props);
      this.state=this.buildNewState();
  }
  buildNewState(newState){
    var st={
      loading:true,
      modalMessage:null,
      episodes:[],
      errorMessage:null,
      progress:0,
      disableDeleteButton:true,
      disableCopyButton:true,
    };
    if(newState){
        return Object.assign(st,newState);
    }
    else{
      return st;
    }
  }
  setNewState(newState){
    var newState=this.buildNewState(newState);
    this.setState(newState);
  }
  doesUserHasFullAccess(){
    var userinfo=appdata.getUserInfo();
    return genericUtil.doesUserHasFullAccess(userinfo);

  }
  onConfirmDeleteImageSet(){
     this.deleteImageSet(this.state.episodes);
  }
  deleteImageSet(episodes){
    if((!episodes)|| (!episodes.length)){
          this.startSearch(this.props.imageSetToCopy);
          return;
    }
    else{
        this.setNewState({loading:false,episodes:this.state.episodes,progress:episodes.length});
    }
    if(episodes[0].data.canDelete){
            api.deleteImageSet(episodes[0].data.imageSets[0]).then(result=>{
                episodes.splice(0,1);
                this.deleteImageSet(episodes);
          }).catch(error=>{
              console.error(error);
              this.setNewState({loading:false,errorMessage:textValues.copyImageSet.deleteImageSet.deleteError+error});
          });
    }
    else{
        episodes.splice(0,1);
        this.deleteImageSet(episodes);
    }
  }
  onCancelDeleteImageSet(){
    this.setState(Object.assign({}, this.state,{modalMessage:null}));
  }
  displayConfirmDeleteDialog(){
    if(this.doesUserHasFullAccess()){
          var modalMessage={
                 title:textValues.copyImageSet.deleteImageSet.title,
                 content:textValues.copyImageSet.deleteImageSet.content,
                 onConfirm:this.onConfirmDeleteImageSet.bind(this),
                 confirmButton:textValues.deleteImageSetDialog.confirm,
                 cancelButton:textValues.deleteImageSetDialog.cancel,
                 onCancel:this.onCancelDeleteImageSet.bind(this)
          }
          this.setState(Object.assign({}, this.state,{modalMessage}));
      }
  }
  startSearch(imageSetToCopy){
    if(!imageSetToCopy){
          return;
    }
    this.setNewState();
    var disableDeleteButton=true;
    var disableCopyButton=true;
    api.findEpisodes({contractNumber:imageSetToCopy.contractNumber}).then(episodes =>{
      if(episodes && episodes.length>0){
          episodes=episodes.filter(episode=>episode.programmeNumber!==imageSetToCopy.programmeNumber);
          episodes.forEach(episode=>{
              episode.data={
                  imageSets:[],
                  canCopy:false,
                  canDelete:false
              };

              if(episode.imageSets){
                  episode.data.imageSets=episode.imageSets.filter(imgset=>imgset.imageSetType===imageSetToCopy.imageSetType);

                  episode.data.imageSets.forEach(imageSet=>{
                      imageSet.data={
                        link:textValues.assignImageByContractAndEpidodeNumber.link+"/?contractNumber="+imageSet.contractNumber+"&episodeNumber="+imageSet.episodeNumber,
                        url:null
                      };
                      var thumbnailImages=imageSet.images.filter(image=>image.width===192 && image.height===108);
                      if(!thumbnailImages.length){
                          thumbnailImages=imageSet.images;
                      }
                      if(thumbnailImages.length){
                          imageSet.data.url=thumbnailImages[0].s3BaseURL+"/"+thumbnailImages[0].filename;
                      }

                  });
                  if(episode.data.imageSets.length){
                      episode.data.canDelete=true;
                      disableDeleteButton=false;
                  }
                  else{
                    disableCopyButton=false;
                    episode.data.canCopy=true;
                  }

              }
              else{
                  disableCopyButton=false;
                  episode.data.canCopy=true;
              }



          });
      }
      else{
        episodes=[];
      }
      this.setNewState({loading:false,episodes,progress:0,disableDeleteButton,disableCopyButton});
   }).catch(error=>{
        console.error(error);
        this.setNewState({loading:false,errorMessage:textValues.copyImageSet.error.loadFailed+error});
   });

  }

  componentDidMount(){
     console.log("******didMount******");
      this.startSearch(this.props.imageSetToCopy);
  }
  componentDidUpdate(prevPops){
    console.log("******didUpdate******");
     if(this.props.imageSetToCopy!=prevPops.imageSetToCopy){
        this.startSearch(this.props.imageSetToCopy);
     }
  }
  deleteExistingImages(){

  }




  dismissDialog(){
      this.props.dismissDialog();
  }
  startCopyImageSet(){
      this.copyImageSet(this.props.imageSetToCopy.id,this.state.episodes);
  }
  copyImageSet(imagesetid, episodes){

      if((!episodes)|| (!episodes.length)){
            this.startSearch(this.props.imageSetToCopy);
            return;
      }
      else{
          this.setNewState({loading:false,episodes:this.state.episodes,progress:episodes.length});
      }

      var mediaCommand={
        command:"copy_image_set",
        imagesetId:imagesetid,
        episodeid:episodes[0].id
      };

      if(episodes[0].data.canCopy){
            api.sendCommand(mediaCommand).then(result=>{
                  episodes.splice(0,1);
                  this.copyImageSet(imagesetid,episodes);
            }).catch(error=>{
                console.error(error);
                this.setNewState({loading:false,errorMessage:textValues.copyImageSet.error.copyError+error});
            });
      }
      else{
          episodes.splice(0,1);
          this.copyImageSet(imagesetid,episodes);
      }


  }




  renderErrorMessage(title, message){
      return(
        <div style={styles.backdropStyle}>
              <div style={styles.dialogwindow}>
                  <div style={styles.dialogTitle}>{title}</div>
                  <div style={styles.dialogContent}>
                            <div className="message">{message}</div>
                  </div>
                  <div style={styles.footer}>
                        <div style={styles.buttonContainer}>
                           <button  onClick={this.dismissDialog.bind(this)} className="btn btn-primary btn-normal">OK</button>
                        </div>
                  </div>
              </div>
        </div>
        );
  }
  renderLoading(title, message){
    return(
      <div style={styles.backdropStyle}>
          <div style={styles.dialogwindow}>
                  <div style={styles.dialogTitle}>{title}</div>
                  <div style={styles.dialogContent}>

                              <div className="message">{message}</div>
                              <LoadingIcon loading={true}/>

                  </div>
                  <div style={styles.footer}>
                        <div style={styles.buttonContainer}>
                           <button  onClick={this.dismissDialog.bind(this)} className="btn btn-primary btn-normal">Cancel</button>
                        </div>
                  </div>
          </div>
      </div>
  );
  }
listEpisodeRecord(episode, index){
    return(
        <tr key={episode.id}>
          <td style={styles.dialogTableDataCell}>{episode.contractNumber}</td>
          <td style={styles.dialogTableDataCell}>{episode.episodeNumber}</td>
          {this.displayImageSet(episode)}
          <td style={styles.dialogTableDataCell}>{episode.title}</td>
        </tr>
    );
}

displayImageSet(episode){

    if(episode.data.imageSets.length){
      return(
       <td style={styles.existingImageCell}>
           <div style={styles.imagethumbnailContainer}>
             {episode.data.imageSets.map(this.displayImage.bind(this))}
           </div>

       </td>
      );
    }
    else{
       return (<td style={styles.emptyImageCell}></td>);
     }
}
displayImage(imageSet, index){
  if(imageSet.data.url){

    var imageurl=imageSet.data.url+"?cacheid="+ (new Date()).getTime();

    return(

            <div key={imageSet.id}>
                  <Link to={imageSet.data.link} target="_blank">
                   <img src={imageurl} style={styles.imageSetDialogImage}/>
                   </Link>
            </div>

    );
  }



}

renderEpisodeList(){

    var title=textValues.copyImageSet.title;
    if(this.props.imageSetToCopy && this.props.imageSetToCopy.imageSetType==='CUT_OUT'){
      title=textValues.copyImageSet.cutoutTitle;
    }

    return(
      <div style={styles.backdropStyle}>
      <div style={styles.imageSetDialogwindow}>
          <div style={styles.dialogTitle}>{title}</div>
          <div style={styles.imageSetDialogContent}>
                   <div style={styles.tableContent}>
                   <div>{textValues.copyImageSet.content}</div>
                        <table style={styles.dialogTable}>
                          <thead>
                           <tr>
                             <th style={styles.dialogTableHeader}>Contract</th>
                             <th style={styles.dialogTableHeader}>Episode</th>
                             <th style={styles.dialogTableHeader}>Existing Images</th>
                             <th style={styles.dialogTableHeader}>Title</th>
                           </tr>
                           </thead>
                           <tbody>
                             {this.state.episodes.map(this.listEpisodeRecord.bind(this))}
                           </tbody>
                        </table>
                        <div>{textValues.copyImageSet.help}</div>
                    </div>
                        </div>
                        <div style={styles.footer}>

                                <div style={styles.buttonContainer}>
                                   <button  onClick={this.displayConfirmDeleteDialog.bind(this)} disabled={this.state.disableDeleteButton} className="btn btn-primary btn-normal">{textValues.deleteAllImageSet.buttonName}</button>
                                </div>
                                  <div style={styles.buttonContainer}>
                                     <button  onClick={this.startCopyImageSet.bind(this)} disabled={this.state.disableCopyButton} className="btn btn-primary btn-normal">{textValues.copyImageSet.buttonName}</button>
                                  </div>
                                  <div style={styles.buttonContainer}>
                                     <button  onClick={this.props.dismissDialog} className="btn btn-primary btn-normal">Cancel</button>
                                  </div>


                        </div>
                  </div>
                  <ModalDialog message={this.state.modalMessage}/>
              </div>
                );

}

 render(){
     if(!this.props.imageSetToCopy){
        return null;
     }
     if(this.state.errorMessage){
              return this.renderErrorMessage(textValues.copyImageSet.error.title, this.state.errorMessage);
     }
     else if(this.state.progress){
          return this.renderLoading(textValues.copyImageSet.progress.title,textValues.copyImageSet.progress.content+this.state.progress);
     }
     else if(this.state.loading){
          return this.renderLoading(textValues.copyImageSet.loading.title,textValues.copyImageSet.loading.content);
     }
     else if(!this.state.episodes.length){
        return this.renderErrorMessage(textValues.copyImageSet.noEpisodes.title, textValues.copyImageSet.noEpisodes.content);
     }
     else{
        return this.renderEpisodeList();
     }
 }


}
