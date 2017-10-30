import React, {Component} from 'react'
import ListEpisodes from "./ListEpisodes";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {images,textValues} from "../configs";
import "./styles/index.css";
import {AppHeader} from "../components";

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
  bindToQueryParameters(){
    var imageStatus="not-process";
       var search=genericUtil.getQueryParam(this.props.location.search, "search");
       api.findNotProcessedEpisodes(search).then(episodes =>{
          episodedata.setEpisodeList({episodes,imageStatus,search});
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
             <AppHeader selected="episodelink"/>

             <ListEpisodes data={this.state}/>
           </div>
         );
  }

  componentWillUnmount(){
    if(this.ubsubsribe){
      this.ubsubsribe();
    }
  }
}
