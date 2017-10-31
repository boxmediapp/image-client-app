import React, {Component} from 'react'
import {ListEpisodes,ImageUploader,ModalDialog} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {images,textValues} from "../configs";
import "./styles/index.css";
import {styles} from "./styles";

import DisplayImageSet from "./DisplayImageSet";
import DisplayCreateNewImageSet from "./DisplayCreateNewImageSet";

export default class DisplayByContractAndEpisodeNumber extends Component{

  constructor(props){
        super(props);
        this.state={imageSets:[], modalMessage:null};
        this.loadImageSets(this.props.contractNumber,this.props.episodeNumber);
  }
  loadImageSets(contractNumber,episodeNumber){
    if(contractNumber && episodeNumber){
      api.findImageSetsByContractAndEpisode(contractNumber,episodeNumber).then(imageSets =>{
         this.setImageSets(imageSets);
     });
    }
  }
  onClearMessage(){
    this.setState(Object.assign({}, this.state,{modalMessage:null}));
  }
  setErrorMessage(modalMessage){
    if(modalMessage && typeof modalMessage==="object"){
        modalMessage=JSON.stringify(modalMessage);
    }

     this.setState(Object.assign({}, this.state,{modalMessage}));
  }
  setImageSets(imageSets){
      this.setState(Object.assign({},this.state,{imageSets}));
  }

  onNewImageCreated(image){
        this.loadImageSets(this.props.contractNumber,this.props.episodeNumber);
  }
  updateImageSetTitle(imageSet, title){
     imageSet.title=title;
     var imageSets=[...this.state.imageSets];
     this.setImageSets(imageSets);
     api.updateImageSet(imageSet);
  }
  deleteImage(image,imageSet){
        imageSet.images=imageSet.images.filter(img=>img.id!==image.id);
        var imageSets=this.state.imageSets;
        if((!imageSet.images)|| (!imageSet.images.length)){
            imageSets=imageSets.filter(imgSet=>imgSet.id!==imageSet.id);
        }
        this.setImageSets(imageSets);
        api.deleteImage(image).then(response=>{
          console.log("delete respose:"+response);
        }).catch(error=>{
           console.error("delete is faled:"+error);
           this.setErrorMessage("failed to delete the image on the server");
        });
  }
  render(){
    return (
          <div>

                <div className="content">

                      {this.state.imageSets.map(imageSet=>{
                        return(
                             <DisplayImageSet imageSet={imageSet} updateImageSetTitle={this.updateImageSetTitle.bind(this)} key={imageSet.id} deleteImage={this.deleteImage.bind(this)}/>
                        );
                      })}
               </div>
               <div className="content">
                    <CreateNewImageSetInEpisode imageSets={this.state.imageSets} onNewImageCreated={this.onNewImageCreated.bind(this)}/>
              </div>
              <ModalDialog message={this.state.modalMessage} onClearMessage={this.onClearMessage.bind(this)}/>
          </div>
          );
      }
  componentWillUnmount(){
    if(this.ubsubsribe){
      this.ubsubsribe();
    }
  }
}
class CreateNewImageSetInEpisode extends Component{
    render(){
        if(this.props.imageSets && this.props.imageSets.length>0){
              var fileCounter=genericUtil.getMaximumFileCounter(this.props.imageSets);
              fileCounter++;
              var imageSet=this.props.imageSets[0];


              fileCounter++;
                return (
                  <div style={styles.newImageSetContainer}>
                    <DisplayCreateNewImageSet
                        {...imageSet}
                        fileCounter={fileCounter}
                        onNewImageCreated={this.props.onNewImageCreated} tags="episode"/>
                 </div>
                );

        }
        else{
          return null;
        }
  }
}
