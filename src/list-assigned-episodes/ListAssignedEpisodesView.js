import React, {Component} from 'react'

import {genericUtil} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import "./styles/index.css";
import {AppHeader,SearchBox,LoadingIcon,MessageDialog} from "../components";
import ListAssignedEpisodes from "./ListAssignedEpisodes";
import {styles} from "./styles";
var LOAD_EPISODE_STATUS={
      LOADING:0,
      PARTIAL_LOADED:1,
      FAILED:2,
      FULLY_LOADED:3
};

export default class ListAssignedEpisodesView extends Component{

  constructor(props){
        super(props);
        this.state=this.getStateFromProps(this.props);


  }
  getStateFromProps(props){
    var search=genericUtil.getQueryParam(props.location.search, "search");
    if(!search){
      search="";
    }
    var programmeNumber=genericUtil.getQueryParam(this.props.location.search, "programmeNumber");
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
                 queryparameters:{search,programmeNumber,fromDate,toDate,channelId,sortBy,sortOrder},
                 channels:[],
                 episodesState:LOAD_EPISODE_STATUS.LOADING
            };

  }
  componentWillMount(){
    this.startSearch(this.state.queryparameters);
  }
  startLoadEpisodes(){
    var episodesState=LOAD_EPISODE_STATUS.LOADING;
    this.episodesState=episodesState;
    this.setState(Object.assign({},this.state,{episodesState}));
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
  onClearMessage(){
    this.setState(Object.assign({}, this.state,{modalMessage:null}));
  }
  startSearch(queryparameters){
     this.startLoadEpisodes();

       if(queryparameters.programmeNumber){
         // api.findAssignedEpisodesByProgrammeNumber(queryparameters.programmeNumber).then(episodes =>{
         //
         //      //this.setImageSets(episodes);
         // }).catch(error=>{
         //       this.setErrorMessage("Error loading episode data from the server"+error);
         // });
       }
       else {
          api.findAssignedEpisodes(queryparameters).then(episodes =>{

              this.setEpisodes(episodes,queryparameters);
          }).catch(error=>{
                this.setErrorMessage("Error loading episode data from the server"+error);
          });
       }

  }
  getNextPageStart(){
    if(this.episodesState===LOAD_EPISODE_STATUS.PARTIAL_LOADED){
          return this.state.episodes.length;
    }
    else{
          return -1;
    }
  }
  onLoadLoadNextPage(){
    var start=this.getNextPageStart();
      if(start<=0){
            return;
      }
      this.startLoadEpisodes();
      api.findAssignedEpisodes(this.state.queryparameters,start).then(episodes =>{
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



  setEpisodes(episodes, queryparameters){
        var recordLimit=appdata.getAppConfig().recordLimit;
        var episodesState=LOAD_EPISODE_STATUS.PARTIAL_LOADED;
        if(episodes.length<recordLimit){
              episodesState=LOAD_EPISODE_STATUS.FULLY_LOADED;
        }
        this.episodesState=episodesState;
        this.setState(Object.assign({},this.state,{episodes,episodesState,queryparameters}));
  }
  changeSort(sortBy, sortOrder){
      console.log("change sort here:sortBy=["+sortBy+"]sortOrder=["+sortOrder);
      var queryparameters=this.state.queryparameters;
      queryparameters.sortBy=sortBy;
      queryparameters.sortOrder=sortOrder;
      this.startSearch(queryparameters);
  }
  render(){

       return (
           <div>
             <AppHeader selected="assignedEpisodes"/>
             <div style={AppHeader.styles.content}>
                <div style={styles.listHeader}>
                    <SearchBox search={this.state.search} startSearch={(search)=>{
                          var queryparameters=this.state.queryparameters;
                          queryparameters.search=search;
                          this.startSearch(queryparameters);
                      }}/>
                      <LoadingIcon loading={this.state.episodesState===LOAD_EPISODE_STATUS.LOADING}/>
                </div>

                 <ListAssignedEpisodes episodes={this.state.episodes}
                   onLoadLoadNextPage={this.onLoadLoadNextPage.bind(this)}
                    queryparameters={this.state.queryparameters}
                    changeSort={this.changeSort.bind(this)}/>

             </div>


           </div>
         );
  }


}
class DisplayNotRecords extends Component{
  render(){

    if(this.props.loading){
        return null;
    }
    else if(this.props.episodes && this.props.episodes.length>0){
      return null;
    }
    else{
      var message={
        content:"No Assgined images found"
      }
       return(
         <MessageDialog message={message}/>
       );
    }
  }
}
