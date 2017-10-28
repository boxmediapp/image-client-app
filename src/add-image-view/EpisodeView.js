import React, {Component} from 'react'
import {ListEpisodes,ImageUploader} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {images,textValues} from "../configs";
import "./styles/index.css";
import DisplaySetProperty from "./DisplaySetProperty";
import DisplayCreateNewImageSet from "./DisplayCreateNewImageSet";
import DisplayByContractAndEpisodeNumber from "./DisplayByContractAndEpisodeNumber";
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
  render(){
    if((!this.state) || (!this.state.imageSets) || (this.state.imageSets.length==0)){
          return (
                <div>
                      <div className="header">
                             <img src={images.logo} className="logo"/>
                             <div className="title">
                                   {textValues.title}
                             </div>
                      </div>
                      <EpisodeViewDisplaySetProperty data={this.state} onTitleChanged={this.onTitleChanged.bind(this)}/>
                      <CreateNewImageSetInEpisode data={this.state} onNewImageCreated={this.onNewImageCreated.bind(this)}/>
                </div>
                );

      }
      else{
           return (
             <DisplayByContractAndEpisodeNumber contractNumber={this.state.contractNumber} episodeNumber={this.state.episodeNumber}/>
           )
      }
    }
  componentWillUnmount(){
    if(this.ubsubsribe){
      this.ubsubsribe();
    }
  }
}
class EpisodeViewDisplaySetProperty extends Component{
    render(){

          if(this.props.data){
              if(this.props.data.imageSets && this.props.data.imageSets.length>0){
                return null;
              }
              else{

                return(
                    <DisplaySetProperty {...this.props.data} onTitleChanged={this.props.onTitleChanged}/>
                );
              }

          }
          else{
            return null;
          }
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
