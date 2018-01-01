import React, {Component} from 'react'
import ListImages from "./ListImages";
import {genericUtil} from "../../utils";


import {api} from "../api";
import {textValues} from "../configs";
import {styles} from './styles';

import {AppHeader} from "../app-header";
import {SearchBox,LoadingIcon,MessageDialog} from "../../components";


export default class ImageSearchView extends Component{

    constructor(props){
          super(props);
         this.state={images:[], programmeNumber:null,search:null,loading:false};
    }
    componentWillMount(){
          this.bindToQueryParameters();
    }
    bindToQueryParameters(){
         var programmeNumber=genericUtil.getQueryParam(this.props.location.search, "programmeNumber");
         var search=genericUtil.getQueryParam(this.props.location.search, "search");

         this.setState(Object.assign({}, this.state,{programmeNumber,search,loading:true}));

         this.searchByProgrammeNumber(programmeNumber);


    }
    searchByProgrammeNumber(programmeNumber){
      this.setLoading(true);
      api.getClientImages({programmeNumber}).then(images =>{
            this.setLoading(false);
             this.setImages(images);
       }).catch(error=>{
            console.log("Error in search:"+error);
            this.setLoading(false);
       });
    }
    searchBySearch(search){
      this.setLoading(true);
      api.getClientImages({search}).then(images =>{
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
               <AppHeader selected="imageSearch"/>
               <div style={AppHeader.styles.content}>
                 <div style={styles.listHeader}>
                     <SearchBox search={this.state.search} startSearch={this.searchBySearch.bind(this)}/>
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
