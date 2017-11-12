import React, {Component} from 'react'

import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import "./styles/index.css";
import {AppHeader,SearchBox,LoadingIcon,MessageDialog} from "../components";
import ListImageSets from "./ListImageSets";
import {styles} from "./styles";

export default class ListImageSetView extends Component{

  constructor(props){
        super(props);
        this.bindToQueryParameters();
  }

  bindToQueryParameters(){
       var search=genericUtil.getQueryParam(this.props.location.search, "search");
       var programmeNumber=genericUtil.getQueryParam(this.props.location.search, "programmeNumber");
       this.state={imageSets:[], search, programmeNumber, loading:true};
       if(this.state.programmeNumber){
         api.findImageSetsByProgrammeNumber(this.state.programmeNumber).then(imageSets =>{
              this.setLoading(false);
              this.setImageSets(imageSets);
         }).catch(error=>{
               this.setLoading(false);
         });
       }
       else {
          api.findImageSets(this.state.search).then(imageSets =>{
              this.setLoading(false);
              this.setImageSets(imageSets);
          }).catch(errror=>{
                this.setLoading(false);
          });
       }

  }
  startSearch(search){
    api.findImageSets(search).then(imageSets =>{

        this.setState(Object.assign({},this.state,{imageSets,search, programmeNumber:""}));
    });
  }

  setLoading(loading){
    this.setState(Object.assign({}, this.state,{loading}));
  }




  setImageSets(imageSets){
      this.setState(Object.assign({},this.state,{imageSets}));
  }
  render(){
       return (
           <div>
             <AppHeader selected="imagesets"/>
             <div style={AppHeader.styles.content}>
                <div style={styles.listHeader}>
                    <SearchBox search={this.state.search} startSearch={this.startSearch.bind(this)}/>
                    <LoadingIcon loading={this.state.loading}/>
                </div>
               <ListImageSets imageSets={this.state.imageSets}/>
               <DisplayNotRecords loading={this.state.loading} imageSets={this.state.imageSets}/>
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
    else if(this.props.imageSets && this.props.imageSets.length>0){
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
