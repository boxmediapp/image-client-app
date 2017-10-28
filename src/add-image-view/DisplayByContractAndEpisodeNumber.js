import React, {Component} from 'react'
import {ListEpisodes,ImageUploader} from "../components";
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
        this.state={imageSets:[]};
        this.loadImageSets(this.props.contractNumber,this.props.episodeNumber);
  }
  loadImageSets(contractNumber,episodeNumber){
    if(contractNumber && episodeNumber){
      api.findImageSetsByContractAndEpisode(contractNumber,episodeNumber).then(imageSets =>{
         this.setImageSets(imageSets);
     });
    }
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
  render(){
    return (
          <div>
                <div className="header">
                       <img src={images.logo} className="logo"/>
                       <div className="title">
                             {textValues.title}
                       </div>
                </div>
                <div className="content">

                      {this.state.imageSets.map(imageSet=>{
                        return(
                             <DisplayImageSet imageSet={imageSet} updateImageSetTitle={this.updateImageSetTitle.bind(this)} key={imageSet.id}/>
                        );
                      })}
               </div>
               <div className="content">
                    <CreateNewImageSetInEpisode imageSets={this.state.imageSets} onNewImageCreated={this.onNewImageCreated.bind(this)}/>
              </div>

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
                        onNewImageCreated={this.props.onNewImageCreated}/>
                 </div>
                );

        }
        else{
          return null;
        }
  }
}
