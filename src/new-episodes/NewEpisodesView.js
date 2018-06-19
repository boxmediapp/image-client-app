import React, {Component} from 'react'
import ListNewEpisodes from "./ListNewEpisodes";
import {genericUtil} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues} from "../configs";

import {AppHeader,SearchWithDateRangeChannel,LoadingIcon,ModalDialog} from "../components";
import {styles} from "./styles";

var LOAD_EPISODE_STATUS={
      LOADING:0,
      PARTIAL_LOADED:1,
      FAILED:2,
      FULLY_LOADED:3
};
export default class NewEpisodesView extends Component{


  constructor(props){
        super(props);
        this.state=this.getStateFromProps(this.props);
  }
  
  componentWillMount(){
    this.startLoadChannels();
    this.startSearch(this.state.queryparameters);
  }
  startLoadChannels(){
    api.getAllBoxChannels().then(channels=>{
        this.setChannels(channels);
    }).catch(error=>{
      this.setErrorMessage("failed to load the channels:"+error);
    });
  }
  setChannels(channels){
    this.setState(Object.assign({},this.state,{channels}));
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
     var episodesState=LOAD_EPISODE_STATUS.FAILED;
     this.episodesState=episodesState;
     this.setState(Object.assign({}, this.state,{modalMessage,episodesState}));
  }


  getStateFromProps(props){
    var search=genericUtil.getQueryParam(props.location.search, "search");
    if(!search){
      search="";
    }
    var sortBy=genericUtil.getQueryParam(props.location.search, "sortBy");
    var sortOrder=genericUtil.getQueryParam(props.location.search, "sortOrder");
    var fromDate=genericUtil.getQueryParam(props.location.search, "fromDate");
    var toDate=genericUtil.getQueryParam(props.location.search, "toDate");
    var channelId=genericUtil.getQueryParam(props.location.search, "channelId");
    if(!sortBy){
         sortBy="lastModifiedAt";
         sortOrder="desc";
    }
    return {
                 modalMessage:null,
                 episodes:[],
                 channelId:null,
                 queryparameters:{search,fromDate,toDate,channelId,sortBy,sortOrder},
                 channels:[],
                 episodesState:LOAD_EPISODE_STATUS.LOADING
            };

  }



  startLoadEpisodes(){
    var episodesState=LOAD_EPISODE_STATUS.LOADING;
    this.episodesState=episodesState;
    this.setState(Object.assign({},this.state,{episodesState}));
  }
  startSearch(queryparameters){
     this.startLoadEpisodes();
    api.findNewEpisodes(queryparameters).then(episodes =>{
      this.setEpisodes(episodes,queryparameters);
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
      api.findNewEpisodes(this.state.queryparameters,start).then(episodes =>{
               console.log("Next batch of data is loaded");
               this.appendEpisodeForNextPage(episodes);
           });
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



  getNextPageStart(){
    if(this.episodesState===LOAD_EPISODE_STATUS.PARTIAL_LOADED){
          return this.state.episodes.length;
    }
    else{
          return -1;
    }
  }


  setEpisodes(episodes, queryparameters){
        var recordLimit=appdata.getAppConfig().recordLimit;
        var episodesState=LOAD_EPISODE_STATUS.PARTIAL_LOADED;
        if(episodes.length<recordLimit){
              episodesState=LOAD_EPISODE_STATUS.FULLY_LOADED;
        }
        this.episodesState=episodesState;
        this.setState(Object.assign({},this.state,{episodes,episodesState,queryparameters}));
  }
  onSearch(newquery){

    var queryparameters=Object.assign({},this.state.queryparameters,newquery);

    queryparameters.fromDate=genericUtil.dateValueToTimestamp(newquery.fromDate,"00:00:00");

    queryparameters.toDate=genericUtil.dateValueToTimestamp(newquery.toDate,"23:59:59");


    this.startSearch(queryparameters);
  }
  changeSort(sortBy, sortOrder){
      console.log("change sort here:sortBy=["+sortBy+"]sortOrder=["+sortOrder);
      var queryparameters=this.state.queryparameters;
      queryparameters.sortBy=sortBy;
      queryparameters.sortOrder=sortOrder;
      this.startSearch(queryparameters);
  }

  render(){


      var queryparameters={search:this.state.queryparameters.search};
      queryparameters.fromDate=genericUtil.timestampToDateValue(this.state.queryparameters.fromDate);
      queryparameters.toDate=genericUtil.timestampToDateValue(this.state.queryparameters.toDate);
       return (
           <div>
             <AppHeader selected="newepisodes"/>
             <div style={AppHeader.styles.content}>
               <div style={styles.listHeader}>
                 <SearchWithDateRangeChannel queryparameters={queryparameters} onSearch={this.onSearch.bind(this)}
                   channels={this.state.channels}/>
                 <LoadingIcon loading={this.state.episodesState===LOAD_EPISODE_STATUS.LOADING}/>
               </div>

                <ListNewEpisodes episodes={this.state.episodes}
                  onLoadLoadNextPage={this.onLoadLoadNextPage.bind(this)}
                   queryparameters={this.state.queryparameters}
                   changeSort={this.changeSort.bind(this)}/>
            </div>
            <ModalDialog message={this.state.modalMessage}/>
           </div>
         );
  }


}
