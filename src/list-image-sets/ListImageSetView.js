import React, {Component} from 'react'

import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {images,textValues} from "../configs";
import "./styles/index.css";
import {AppHeader} from "../components";
import ListImageSets from "./ListImageSets";

export default class ListImageSetView extends Component{

  constructor(props){
        super(props);
        this.bindToQueryParameters();

  }

  bindToQueryParameters(){
       var search=genericUtil.getQueryParam(this.props.location.search, "search");
       var programmeNumber=genericUtil.getQueryParam(this.props.location.search, "programmeNumber");
       this.state={imageSets:[], search, programmeNumber};
       if(this.state.programmeNumber){
         api.findImageSetsByProgrammeNumber(this.state.programmeNumber).then(imageSets =>{
              this.setImageSets(imageSets);
         });
       }
       else {
          api.findImageSets(this.state.search).then(imageSets =>{
              this.setImageSets(imageSets);
          });
       }

  }
  setImageSets(imageSets){
      this.setState(Object.assign({},this.state,{imageSets}));
  }
  render(){
       return (
           <div>
             <AppHeader selected="imagesets"/>
             <ListImageSets imageSets={this.state.imageSets}/>
           </div>
         );
  }


}
