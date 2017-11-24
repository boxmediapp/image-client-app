import React, {Component} from 'react'
import "./styles/index.css";

import {styles} from "./styles";

export default class SearchWithDateRange extends Component{
   constructor(props){
      super(props);
      this.state=Object.assign({fromDate:"", toDate:"", search:""},this.props.queryparameters);
   }
  setSearch(search){
    this.setState(Object.assign({}, this.state,{search}));
  }
  setFromData(fromDate){
    this.setState(Object.assign({}, this.state,{fromDate}));    
  }
  setToData(toDate){
    this.setState(Object.assign({}, this.state,{toDate}));    
  }
  
  handleKeyPress(evt){
    if(evt.key==="Enter"){
        this.onSearch();
    }
  }
  onSearch(evt){      
      this.props.onSearch(this.state);
  }

  render(){
       return (
                <div className="col-sm-6 formFieldWithLabel searchBox">
                 
                 <input type="text" style={styles.search} id="search"  value={this.state.search}
                   onChange={evt=>this.setSearch(evt.target.value)} onKeyPress={this.handleKeyPress.bind(this)}/>
                   
                   <label htmlFor="fromDate">From:</label>
                  <input type="date" style={styles.search} id="fromDate"  value={this.state.fromDate}
                     onChange={evt=>this.setFromData(evt.target.value)} onKeyPress={this.handleKeyPress.bind(this)}/>
                     
                  <label htmlFor="toDate">To:</label>   
                     <input type="date" style={styles.search} id="toDate"  value={this.state.toDate}
                        onChange={evt=>this.setToData(evt.target.value)} onKeyPress={this.handleKeyPress.bind(this)}/>     
                 <span className="input-group-btn">
                     <button className="btn btn-search"
                       onClick={this.onSearch.bind(this)}>
                     <i className="fa fa-search fa-fw"></i> Search</button>
                </span>
             </div>

         );
  }

}
