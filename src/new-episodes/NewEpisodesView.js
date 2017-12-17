import React, {Component} from 'react'
import ListNewEpisodes from "./ListNewEpisodes";
import {genericUtil} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues} from "../configs";

import {AppHeader,SearchWithDateRangeChannel,LoadingIcon,ModalDialog} from "../components";
import {styles} from "./styles";


export default class NewEpisodesView extends Component{
  constructor(props){
        super(props);
        this.state={loading:true,modalMessage:null, episodes:[],queryparameters:{}, channels:[],channelId:null};
  }
  componentWillMount(){
    this.bindToStore();
    this.bindToQueryParameters();
    this.startLoadChannels();
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
     this.setState(Object.assign({}, this.state,{modalMessage}));
  }
  updateFromStore(){
    var episodeStore=episodedata.getEpisodeStore();
    this.setState(Object.assign({},this.state,{episodes:episodeStore.episodes, queryparameters:episodeStore.queryparameters}));
  }
  bindToStore(){
    this.updateFromStore();
    this.ubsubsribe=store.subscribe(()=>{
            this.updateFromStore();
    });
  }

  bindToQueryParameters(){
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
         sortBy="lastModifiedAt";
         sortOrder="desc";
       }
       this.startSearch({search,sortBy,sortOrder,fromDate,toDate,channelId});
  }
  setLoading(loading){
    this.setState(Object.assign({}, this.state,{loading}));
  }
  startSearch(queryparameters){
    this.setLoading(true);
    api.findNewEpisodes(queryparameters).then(episodes =>{
      this.setLoading(false);
       var recordLimit=appdata.getAppConfig().recordLimit;
       episodedata.setEpisodeStore({episodes,queryparameters,recordLimit});
   }).catch(error=>{

       this.setLoading(false);
       this.setErrorMessage("Error loading episode data from the server"+error);
   });
  }
  lastRecordsDisplayed(){
      this.loadNextPage();
  }
  loadNextPage(){
      if(episodedata.getNextBatchState()<0){
        console.log("nore more data on the server");
        return;
      }
      else{

            if(this.loadingNextPage){
              return;
            }
            this.loadingNextPage=true;
            console.log("loading the next page......");
            api.findNewEpisodes(this.state.queryparameters,episodedata.getNextBatchState()).then(episodes =>{
               var recordLimit=appdata.getAppConfig().recordLimit;
               console.log("Next batch of data is loaded");
               episodedata.nextPageEpisodes({episodes,recordLimit});
           });
      }

  }
  setEpisodes(episodelistdata){

      if(episodedata.isEpisodeListIdentical(this.state,episodelistdata)){
            return;
      }
      this.setState(Object.assign({},this.state,episodelistdata));
  }
  onSearch(queryparameters){
    var query=Object.assign({},this.state.queryparameters,queryparameters);

    query.fromDate=genericUtil.dateValueToTimestamp(queryparameters.fromDate,"00:00:00");

    query.toDate=genericUtil.dateValueToTimestamp(queryparameters.toDate,"23:59:59");


    this.startSearch(query);
  }


  render(){
      this.loadingNextPage=false;

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
                 <LoadingIcon loading={this.state.loading}/>
               </div>
               <ListNewEpisodes data={this.state} lastRecordsDisplayed={this.lastRecordsDisplayed.bind(this)} />
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
