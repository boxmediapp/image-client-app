import React, {Component} from 'react'
import ListScheduleEpisodes from "./ListScheduleEpisodes";
import {genericUtil} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues} from "../configs";

import {AppHeader,LoadingIcon,ModalDialog} from "../components";
import SearchEcheduleEpisodes from "./SearchEcheduleEpisodes";
import {styles} from "./styles";

var LOAD_EPISODE_STATUS={
      LOADING:0,
      PARTIAL_LOADED:1,
      FAILED:2,
      FULLY_LOADED:3
};

export default class ListScheduleEpisodesView extends Component{
  constructor(props){
        super(props);
        this.state=this.buildDefaultState();
        this.episodesState=this.state.episodesState;
  }
  buildDefaultState(){
    var search=genericUtil.getQueryParam(this.props.location.search, "search");
    if(!search){
      search="";
    }
    var sortBy=genericUtil.getQueryParam(this.props.location.search, "sortBy");
    var sortOrder=genericUtil.getQueryParam(this.props.location.search, "sortOrder");
    var fromDate=genericUtil.getQueryParam(this.props.location.search, "fromDate");
    var toDate=genericUtil.getQueryParam(this.props.location.search, "toDate");
    var channelId=genericUtil.getQueryParam(this.props.location.search, "channelId");
    if(!sortBy){
         sortBy="scheduleTimestamp";
         sortOrder="desc";
    }
    return {
                 modalMessage:null,
                 episodes:[],
                 queryparameters:{search,fromDate,toDate,channelId,sortBy,sortOrder},
                 channels:[],
                 episodesState:LOAD_EPISODE_STATUS.LOADING
            };
  }
  componentWillMount(){
        this.startLoadChannels();
        this.startSearch(this.state.queryparameters);
  }

  setChannels(channels){
        this.setState(Object.assign({},this.state,{channels}));
  }
  setEpisodes(episodes){
      var recordLimit=appdata.getAppConfig().recordLimit;
      var episodesState=LOAD_EPISODE_STATUS.PARTIAL_LOADED;
      if(episodes.length<recordLimit){
            episodesState=LOAD_EPISODE_STATUS.FULLY_LOADED;
      }
      this.episodesState=episodesState;
      this.setState(Object.assign({},this.state,{episodes,episodesState}));
  }
  appendEpisodeForNextPage(ep){
    var recordLimit=appdata.getAppConfig().recordLimit;
    var episodesState=LOAD_EPISODE_STATUS.PARTIAL_LOADED;
    if(ep.length<recordLimit){
          episodesState=LOAD_EPISODE_STATUS.FULLY_LOADED;
    }
    var episodes=[...this.state.episodes,...ep];
    this.episodesState=episodesState;
    this.setState(Object.assign({},this.state,{episodes,episodesState}));
  }
  startLoadEpisodes(){
    var episodesState=LOAD_EPISODE_STATUS.LOADING;
    this.episodesState=episodesState;
    this.setState(Object.assign({},this.state,{episodesState}));
  }
  getNextPageStart(){
    if(this.episodesState===LOAD_EPISODE_STATUS.PARTIAL_LOADED){
          return this.state.episodes.length;
    }
    else{
          return -1;
    }
  }


  startLoadChannels(){
    api.getAllBoxChannels().then(channels=>{
        this.setChannels(channels);
    }).catch(error=>{
      this.setErrorMessage("failed to load the channels:"+error);
    });
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
     var episodesState=LOAD_EPISODE_STATUS.FULLY_LOADED;
     this.episodesState=episodesState;
     this.setState(Object.assign({}, this.state,{modalMessage,episodesState}));
  }


  startSearch(queryparameters){
          this.startLoadEpisodes();
          api.findScheduleEpisodes(queryparameters).then(episodes =>{
              this.setEpisodes(episodes);
         }).catch(error=>{
             this.setErrorMessage("Error loading episode data from the server"+error);
         });
  }

  onLoadLoadNextPage(){
    var start=this.getNextPageStart();
      if(start<=0){
            return;
      }
      this.startLoadEpisodes();
      api.findScheduleEpisodes(this.state.queryparameters,start).then(episodes =>{
               console.log("Next batch of data is loaded");
               this.appendEpisodeForNextPage(episodes);
           });
  }

  onSearch(q){
    var queryparameters=Object.assign({},this.state.queryparameters,q);
    this.setState(Object.assign({}, this.state,{queryparameters}));
    this.startSearch(queryparameters);
  }

  render(){
      var queryparameters={search:this.state.queryparameters.search};
      queryparameters.fromDate=genericUtil.timestampToDateValue(this.state.queryparameters.fromDate);
      queryparameters.toDate=genericUtil.timestampToDateValue(this.state.queryparameters.toDate);
       return (
           <div>
             <AppHeader selected="listScheduleEpisodes"/>
             <div style={AppHeader.styles.content}>
               <div style={styles.listHeader}>
                 <SearchEcheduleEpisodes queryparameters={queryparameters} onSearch={this.onSearch.bind(this)}
                   channels={this.state.channels}/>
                 <LoadingIcon loading={this.state.episodesState===LOAD_EPISODE_STATUS.LOADING}/>
               </div>
               <ListScheduleEpisodes episodes={this.state.episodes} onLoadLoadNextPage={this.onLoadLoadNextPage.bind(this)} />
            </div>
            <ModalDialog message={this.state.modalMessage}/>
           </div>
         );
  }


}
