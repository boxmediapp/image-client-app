import React, {Component} from 'react'

import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import "./styles/index.css";
import {AppHeader,SearchBox,LoadingIcon,MessageDialog} from "../components";
import ListAssignedEpisodes from "./ListAssignedEpisodes";
import {styles} from "./styles";

export default class ListAssignedEpisodesView extends Component{

  constructor(props){
        super(props);
        this.bindToQueryParameters();
  }

  bindToQueryParameters(){
       var search=genericUtil.getQueryParam(this.props.location.search, "search");
       var programmeNumber=genericUtil.getQueryParam(this.props.location.search, "programmeNumber");
       this.state={episodes:[], search, programmeNumber, loading:true};
       if(this.state.programmeNumber){
         api.findAssignedEpisodesByProgrammeNumber(this.state.programmeNumber).then(episodes =>{
              this.setLoading(false);
              this.setImageSets(episodes);
         }).catch(error=>{
               this.setLoading(false);
         });
       }
       else {
          api.findAssignedEpisodes(this.state.search).then(episodes =>{
              this.setLoading(false);
              this.setEpisodes(episodes);
          }).catch(errror=>{
                this.setLoading(false);
          });
       }

  }
  startSearch(search){
    api.findAssignedEpisodes(search).then(episodes =>{

        this.setState(Object.assign({},this.state,{episodes,search, programmeNumber:""}));
    });
  }

  setLoading(loading){
    this.setState(Object.assign({}, this.state,{loading}));
  }




  setEpisodes(episodes){
      this.setState(Object.assign({},this.state,{episodes}));
  }
  render(){
       return (
           <div>
             <AppHeader selected="assignedEpisodes"/>
             <div style={AppHeader.styles.content}>
                <div style={styles.listHeader}>
                    <SearchBox search={this.state.search} startSearch={this.startSearch.bind(this)}/>
                    <LoadingIcon loading={this.state.loading}/>
                </div>
               <ListAssignedEpisodes episodes={this.state.episodes}/>
               <DisplayNotRecords loading={this.state.loading} episodes={this.state.episodes}/>
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
