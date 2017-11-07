import React, {Component} from 'react'
import ListImages from "./ListImages";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {textValues} from "../configs";

import {AppHeader,SearchBox} from "../components";



export default class ClientImagesView extends Component{

    constructor(props){
          super(props);
          this.bindToQueryParameters();
    }

    bindToQueryParameters(){
         var programmeNumber=genericUtil.getQueryParam(this.props.location.search, "programmeNumber");
         this.state={images:[], programmeNumber};

         this.searchByProgrammeNumber(programmeNumber);


    }
    searchByProgrammeNumber(programmeNumber){
      api.getClientImages(programmeNumber).then(images =>{
             this.setImages(images);
       });
    }

    setImages(images){
        this.setState(Object.assign({},this.state,{images}));
    }
    render(){
         return (
             <div>
               <AppHeader selected="clients"/>
               <div style={AppHeader.styles.content}>
                 <SearchBox search={this.state.programmeNumber} startSearch={this.searchByProgrammeNumber.bind(this)}/>
                 <ListImages images={this.state.images}/>
               </div>

             </div>
           );
    }
}
