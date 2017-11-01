import React, {Component} from 'react'
import "./styles/index.css";

import {styles} from "./styles";

export default class SearchBox extends Component{
   constructor(props){
      super(props);
      var search=this.props.search;
      if(!search){
        search="";
      }
      this.state={search};
   }
  setSearch(search){
    this.setState(Object.assign({}, this.state,{search}));
  }
  handleKeyPress(evt){
    if(evt.key==="Enter"){
        this.startSearch();
    }
  }
  startSearch(evt){
    this.props.startSearch(this.state.search);
  }

  render(){
       return (
                <div className="col-sm-6 formFieldWithLabel searchBox">
                 <label htmlFor="episodeNumber"></label>
                 <input type="text" style={styles.search} id="search"  value={this.state.search}
                   onChange={evt=>this.setSearch(evt.target.value)} onKeyPress={this.handleKeyPress.bind(this)}/>
                 <span className="input-group-btn">
                     <button className="btn btn-search"
                       onClick={this.startSearch.bind(this)}>
                     <i className="fa fa-search fa-fw"></i> Search</button>
                </span>
             </div>

         );
  }

}
