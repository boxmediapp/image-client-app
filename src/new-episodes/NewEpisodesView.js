import React, {Component} from 'react'
import ListNewEpisodes from "./ListNewEpisodes";
import {genericUtil} from "../utils";

import {episodedata,store,appdata} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import "./styles/index.css";
import {AppHeader,SearchBox} from "../components";



export default class NewEpisodesView extends Component{
  constructor(props){
        super(props);
        this.bindToStore();
        this.bindToQueryParameters();

  }

  bindToStore(){
    this.state=episodedata.getEpisodeList();
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
  startSearch(search){

    api.findNotProcessedEpisodes(search).then(episodes =>{
       var recordLimit=appdata.getAppConfig().recordLimit;
       episodedata.setEpisodeList({episodes,search,recordLimit});
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
               <SearchBox search={this.state.search} startSearch={this.startSearch.bind(this)}/>
               <ListNewEpisodes data={this.state} lastRecordsDisplayed={this.lastRecordsDisplayed.bind(this)} />
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
