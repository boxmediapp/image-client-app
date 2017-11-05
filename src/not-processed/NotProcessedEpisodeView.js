import React, {Component} from 'react'
import ListEpisodes from "./ListEpisodes";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import "./styles/index.css";
import {AppHeader,SearchBox} from "../components";



export default class NotProcessedEpisodeView extends Component{
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
       episodedata.setEpisodeList({episodes,search});
   });
  }
  setEpisodes(episodelistdata){

      if(episodedata.isEpisodeListIdentical(this.state,episodelistdata)){
            return;
      }
      this.setState(Object.assign({},this.state,episodelistdata));
  }


  render(){
       return (
           <div>
             <AppHeader selected="episodeList"/>
             <div style={AppHeader.styles.content}>
               <SearchBox search={this.state.search} startSearch={this.startSearch.bind(this)}/>
               <ListEpisodes data={this.state}/>
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
