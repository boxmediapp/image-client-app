import React, {Component} from 'react'
import {ListEpisodes} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";

export default class EpisodeListView extends Component{

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
      var imageStatus=genericUtil.getQueryParam(this.props.location.search, "imageStatus");
      var search=genericUtil.getQueryParam(this.props.location.search, "search");
       api.listEpisodes({imageStatus,search}).then(episodes =>{

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
