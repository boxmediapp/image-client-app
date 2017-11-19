import React, {Component} from 'react'
import {AppHeader} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import "./styles/index.css";

import DisplayCreateNewImageSet from "./DisplayCreateNewImageSet";
import DisplayByContractAndEpisodeNumber from "./DisplayByContractAndEpisodeNumber";
import {TopMenu} from "../components";
export default class EpisodeView extends Component{

  constructor(props){
        super(props);
        var episodeId=genericUtil.getQueryParam(this.props.location.search, "episodeid");
        if(episodeId){
              var episode=episodedata.findEpisodeById(episodeId);
              if(episode){
                this.state=episode;
              }
              this.ubsubsribe=store.subscribe(()=>{
                    var episode=episodedata.findEpisodeById(episodeId);
                    if(episode){
                      this.setEpisode(episode);
                    }
              });
              if((!this.state) || (!this.state.imageSets) || (this.state.imageSets.length==0)){
                  this.loadEpisodeById(episodeId);
              }
        }
  }
  loadEpisodeById(episodeId){
    api.getEpisodeById(episodeId).then(episode =>{
       episodedata.updateEpsiode(episode);
   });
  }
  setEpisode(episode){
      this.setState(episode);
  }
  setTitle(title){
    if(title===this.state.title){
        return;
    }
    this.setState(Object.assign({}, this.state,{title}));
  }
  onNewImageCreated(image){
        this.loadEpisodeById(this.state.id);
  }
  onTitleChanged(title){
      this.setTitle(title);
  }
  redirectToImageLibrary(){
    this.props.history.push(textValues.assignedEpisodes.link);
  }
  render(){
    if((!this.state) || (!this.state.imageSets) || (this.state.imageSets.length==0)){
          return (
                <div>
                      <AppHeader selected="newepisodes"/>
                      <div style={AppHeader.styles.content}>
                            <CreateNewImageSetInEpisode {...this.state} onNewImageCreated={this.onNewImageCreated.bind(this)}/>
                      </div>

                </div>
                );

      }
      else{
           return (
             <div>
                   <AppHeader selected="newepisodes"/>
                   <div style={AppHeader.styles.content}>
                      <DisplayByContractAndEpisodeNumber contractNumber={this.state.contractNumber} 
                      episodeNumber={this.state.episodeNumber}
                      redirectToImageLibrary={this.redirectToImageLibrary.bind(this)}/>
                   </div>

            </div>
           )
      }
    }
  componentWillUnmount(){
    if(this.ubsubsribe){
      this.ubsubsribe();
    }
  }
}

class CreateNewImageSetInEpisode extends Component{
    render(){
        if(!this.props.contractNumber){
          return null;
        }
        var fileCounter=1;
          return (
              <DisplayCreateNewImageSet {...this.props}
                  episodeId={this.props.id}
                  title={this.props.title}
                  contractNumber={this.props.contractNumber}
                  episodeNumber={this.props.episodeNumber}
                  fileCounter={fileCounter}
                  tags="episode"
                  onNewImageCreated={this.props.onNewImageCreated}/>
          );

    }

}
