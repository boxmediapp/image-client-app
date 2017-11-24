import React, {Component} from 'react'
import ListNewEpisodes from "./ListNewEpisodes";
import {genericUtil} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues} from "../configs";

import {AppHeader,SearchWithDateRange,LoadingIcon,ModalDialog} from "../components";
import {styles} from "./styles";


export default class NewEpisodesView extends Component{
  constructor(props){
        super(props);       
        this.state={loading:true,modalMessage:null, episodes:[],queryparameters:{}};
  }
  componentWillMount(){
    this.bindToStore();
    this.bindToQueryParameters();
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
       if(!sortBy){
         sortBy="lastModifiedAt";
         sortOrder="desc";
       }       
       this.startSearch({search,sortBy,sortOrder,fromDate,toDate});
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
  onSearch(queryparamter){   
    var query=Object.assign({search:queryparamter.search}, this.state.queryparameters);
          
    query.fromDate=genericUtil.dateValueToTimestamp(queryparamter.fromDate);
    query.toDate=genericUtil.dateValueToTimestamp(queryparamter.toDate);
    
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
                 <SearchWithDateRange queryparameters={queryparameters} onSearch={this.onSearch.bind(this)}/>
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
