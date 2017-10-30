import React, {Component} from 'react'
import {AppHeader} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {images,textValues} from "../configs";
import "./styles/index.css";
import DisplaySetProperty from "./DisplaySetProperty";
import DisplayCreateNewImageSet from "./DisplayCreateNewImageSet";
import DisplayByContractAndEpisodeNumber from "./DisplayByContractAndEpisodeNumber";
import {TopMenu} from "../components";
export default class ContractEpisodeNumberView extends Component{

  constructor(props){
        super(props);
         var contractNumber=genericUtil.getQueryParam(this.props.location.search, "contractNumber");
         var episodeNumber=genericUtil.getQueryParam(this.props.location.search, "episodeNumber");
         if(contractNumber){
              this.state={imageSets:[], contractNumber,episodeNumber};
              this.loadImageSets();

        }
  }
  loadImageSets(){
    api.findImageSetsByContractAndEpisode(this.state.contractNumber,this.state.episodeNumber).then(imageSets =>{
       this.setImageSets(imageSets);
   });
  }
  setImageSets(imageSets){
      this.setState(Object.assign({}, this.state,{imageSets}));
  }

  onNewImageCreated(image){
        this.loadImageSets();
  }
  render(){

           return (
             <div>
                   <AppHeader selected="imagesets"/>                   
                   <DisplayByContractAndEpisodeNumber contractNumber={this.state.contractNumber} episodeNumber={this.state.episodeNumber}/>
            </div>
           )

    }

}

class CreateNewImageSetInEpisode extends Component{
    render(){
        if(!this.props.data){
          return null;
        }
        var fileCounter=1;
          return (
              <DisplayCreateNewImageSet {...this.props.data}
                  episodeId={this.props.data.id}
                  title={this.props.data.title}
                  contractNumber={this.props.data.contractNumber}
                  episodeNumber={this.props.data.episodeNumber}
                  fileCounter={fileCounter}
                  onNewImageCreated={this.props.onNewImageCreated}/>
          );

    }

}
