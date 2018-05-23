import React, {Component} from 'react'
import {ListEpisodes,ModalDialog} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
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
  setErrorMessage(content){
     var modalMessage={
            title:"Error",
            content,
            onConfirm:this.onClearMessage.bind(this),
            confirmButton:"OK"
     }
     this.setState(Object.assign({}, this.state,{modalMessage}));
  }
  setImageSets(imageSets){
      this.setState(Object.assign({},this.state,{imageSets}));
  }

  onNewImageCreated(image){
        this.loadImageSets(this.props.contractNumber,this.props.episodeNumber);
  }
  updateImageSetProperty(imageSet, imagesetProperty){
     imageSet.title=imagesetProperty.title;
     imageSet.imageSetType=imagesetProperty.imageSetType;
     var imageSets=[...this.state.imageSets];
     this.setImageSets(imageSets);
     api.updateImageSet(imageSet);
  }
  deleteImage(image,imageSet){
        imageSet.images=imageSet.images.filter(img=>img.id!==image.id);
        var imageSets=this.state.imageSets;
        if((!imageSet.images)|| (!imageSet.images.length)){
            imageSets=imageSets.filter(imgSet=>imgSet.id!==imageSet.id);
            if((!imageSets) || (!imageSets.length)){
                    this.props.redirectToImageLibrary();
            }
        }
        this.setImageSets(imageSets);
        api.deleteImage(image).then(response=>{
          console.log("delete respose:"+response);
        }).catch(error=>{
           console.error("delete is faled:"+error);
           this.setErrorMessage("failed to delete the image:"+error);
        });
  }
  deleteImageSet(imageSet){
    var imageSets=this.state.imageSets;
    imageSets=imageSets.filter(imageSet=>imageSet!=imageSet);
    this.setState(Object.assign({},this.state, {imageSets}));
    api.deleteImageSet(imageSet).then(response=>{
      console.log("delete respose:"+response);
      if((!imageSets) || (!imageSets.length)){
              this.props.redirectToImageLibrary();
      }
    }).catch(error=>{
       console.error("delete is faled:"+error);
       this.setErrorMessage("failed to delete the image on the server");
    });
  }
  approveImageSet(imageSet){
    var changed=false;
    imageSet.images.forEach(image=>{
      if(image.imageStatus!=="APPROVED"){
            image.imageStatus="APPROVED";
            changed=true;
            api.updateImage(image).catch(error=>{
              this.setErrorMessage("Failed to update Image:"+error);
            });
      }
    });
    if(changed){
        imageSet.images=imageSet.images.map(image=>{
            return Object.assign({},image);
        });
        var imageSets=this.state.imageSets.map(
          imgSet=>{
              if(imgSet===imageSet){
                return Object.assign({},imageSet);
              }
              else{
                return imgSet;
              }
          });
          this.setState(Object.assign({}, this.state,{imageSets}));
    }

  }

  render(){

    return (
          <div>

                <div className="content">

                      {this.state.imageSets.map(imageSet=>{
                        return(
                             <DisplayImageSet imageSet={imageSet} updateImageSetProperty={this.updateImageSetProperty.bind(this)} key={imageSet.id}
                             deleteImage={this.deleteImage.bind(this)}
                             deleteImageSet={this.deleteImageSet.bind(this)}
                             approveImageSet={this.approveImageSet.bind(this)}/>
                        );
                      })}
               </div>
               <div className="content">
                    <CreateNewImageSetInEpisode imageSets={this.state.imageSets} onNewImageCreated={this.onNewImageCreated.bind(this)}/>
              </div>
              <ModalDialog message={this.state.modalMessage}/>
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

                    <DisplayCreateNewImageSet
                        {...imageSet}
                        fileCounter={fileCounter}
                        onNewImageCreated={this.props.onNewImageCreated} tags="episode"/>

                );

        }
        else{
            var fileCounter=1;
            return (
                <DisplayCreateNewImageSet
                    title={this.props.title}
                    contractNumber={this.props.contractNumber}
                    episodeNumber={this.props.episodeNumber}
                    fileCounter={fileCounter}
                    tags="episode"
                    onNewImageCreated={this.props.onNewImageCreated}/>
            );

        }
  }
}
