import React, {Component} from 'react'
import ListNewEpisodes from "./ListNewEpisodes";
import {genericUtil} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues} from "../configs";

import {AppHeader,SearchBox,LoadingIcon,ModalDialog} from "../components";
import {styles} from "./styles";


export default class NewEpisodesView extends Component{
  constructor(props){
        super(props);
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

  bindToStore(){
    this.state=Object.assign({loading:true,modalMessage:null},episodedata.getEpisodeList());

    this.ubsubsribe=store.subscribe(()=>{
            this.setEpisodes(episodedata.getEpisodeList());
    });
  }
  setSearch(search){
    this.setState(Object.assign({}, this.state,{search}));
  }
  bindToQueryParameters(){
       var search=genericUtil.getQueryParam(this.props.location.search, "search");
       if(!search){
         search="";
       }
       this.startSearch(search);
  }
  setLoading(loading){
    this.setState(Object.assign({}, this.state,{loading}));
  }
  startSearch(search){
    this.setLoading(true);
    api.findNotProcessedEpisodes(search).then(episodes =>{
      this.setLoading(false);
       var recordLimit=appdata.getAppConfig().recordLimit;
       episodedata.setEpisodeList({episodes,search,recordLimit});
   }).catch(error=>{

       this.setLoading(false);
       this.setErrorMessage("Error loading data from the server");
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
            api.findNotProcessedEpisodes(this.state.search,episodedata.getNextBatchState()).then(episodes =>{
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


  render(){
      this.loadingNextPage=false;
       return (
           <div>
             <AppHeader selected="newepisodes"/>
             <div style={AppHeader.styles.content}>
               <div style={styles.listHeader}>
                 <SearchBox search={this.state.search} startSearch={this.startSearch.bind(this)}/>
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
