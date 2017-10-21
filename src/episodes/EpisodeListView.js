import React, {Component} from 'react'
import {ListEpisodes} from "../components";
import {imageUtil} from "../utils";

import {data,store} from "../store";
import {api} from "../api";
export default class EpisodeListView extends Component{

  constructor(props){
        super(props);
        this.bindToStore();
        this.bindToQueryParameters();

  }
  bindToStore(){
    this.state={episodes:data.epidodes.list(), imageStatus:data.epidodes.imageStatus,search:data.epidodes.search,};
    this.ubsubsribe=store.subscribe(()=>{
          this.setEpisodes(data.epidodes.list(),data.epidodes.imageStatus,data.epidodes.search);
    });
  }
  bindToQueryParameters(){
      var imageStatus=imageUtil.getQueryParam(this.props.location.search, "imageStatus");
      var search=imageUtil.getQueryParam(this.props.location.search, "search");
       api.listEpisodes({imageStatus,search}).then(episodes =>{

          data.epidodes.setEpisodes(episodes,imageStatus,search);
      });
  }
  setEpisodes(episodes,imageStatus,search){
    console.log("::::store:"+episodes);
      if(this.state.episodes===episodes && this.state.imageStatus===imageStatus && this.state.search===search){
        return;
      }
      this.setState(Object.assign({},this.state,{episodes,imageStatus,search}));
      console.log("****store****************"+JSON.stringify(store.getState()));
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
