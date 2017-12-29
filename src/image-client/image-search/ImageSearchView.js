import React, {Component} from 'react'
import ListImages from "./ListImages";
import {genericUtil} from "../../utils";


import {api} from "../api";
import {textValues} from "../configs";
import {styles} from './styles';

import {AppHeader} from "../menu";
import {SearchBox,LoadingIcon,MessageDialog} from "../../components";


export default class ImageSearchView extends Component{

    constructor(props){
          super(props);
          this.bindToQueryParameters();
    }

    bindToQueryParameters(){
         var programmeNumber=genericUtil.getQueryParam(this.props.location.search, "programmeNumber");
         this.state={images:[], programmeNumber,loading:true};

         this.searchByProgrammeNumber(programmeNumber);


    }
    searchByProgrammeNumber(programmeNumber){
      this.setLoading(true);
      api.getClientImages(programmeNumber).then(images =>{
            this.setLoading(false);
             this.setImages(images);
       });
    }

    setImages(images){
        this.setState(Object.assign({},this.state,{images}));
    }
    setLoading(loading){
      this.setState(Object.assign({}, this.state,{loading}));
    }
    render(){
         return (
             <div>
               <AppHeader selected="clientsView"/>
               <div style={AppHeader.styles.content}>
                 <div style={styles.listHeader}>
                     <SearchBox search={this.state.programmeNumber} startSearch={this.searchByProgrammeNumber.bind(this)}/>
                     <LoadingIcon loading={this.state.loading}/>
                 </div>


                 <ListImages images={this.state.images}/>
                 <DisplayNotRecords loading={this.state.loading} images={this.state.images}/>
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
    else if(this.props.images && this.props.images.length>0){
      return null;
    }
    else{
      var message={
        content:"No client images found"
      }
       return(
         <MessageDialog message={message}/>
       );
    }
  }
}
