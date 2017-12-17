import React, {Component} from 'react'
import "./styles/index.css";

import {styles} from "./styles";

export default class SearchWithDateRangeChannel extends Component{
   constructor(props){
      super(props);
      this.state=this.props.queryparameters;
      if(!this.state.fromDate){
        this.state.fromDate="";
      }
      if(!this.state.toDate){
        this.state.toDate="";
      }
      if(!this.state.search){
        this.state.search="";
      }
      if(!this.state.channelId){
        this.state.channelId="";
      }

   }
   setChannelId(channelId){
      this.setState(Object.assign({}, this.state,{channelId}));
   }
  setSearch(search){
    this.setState(Object.assign({}, this.state,{search}));
  }
  setFromDate(fromDate){
    this.setState(Object.assign({}, this.state,{fromDate}));
  }
  setToDate(toDate){
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
                <div className="col-sm-6  searchWithChannelBox">

                 <input type="text" style={styles.search} id="search"  value={this.state.search}
                   onChange={evt=>this.setSearch(evt.target.value)} onKeyPress={this.handleKeyPress.bind(this)}/>

                   <label htmlFor="fromDate">From:</label>
                  <input type="date" style={styles.search} id="fromDate"  value={this.state.fromDate}
                     onChange={evt=>this.setFromDate(evt.target.value)} onKeyPress={this.handleKeyPress.bind(this)}/>

                  <label htmlFor="toDate">To:</label>
                     <input type="date" style={styles.search} id="toDate"  value={this.state.toDate}
                        onChange={
                          (evt)=>{
                              this.setToDate(evt.target.value);
                          }
                        } onKeyPress={this.handleKeyPress.bind(this)}/>

                 <label htmlFor="channelId">Channel:</label>
                           <select id="channelId" name="channelId"
                             value={this.state.channelId} onChange={evt=>{this.setChannelId(evt.target.value)}}>
                                  <option value={''}>All Channels</option>
                                   <RenderChannelOptions channels={this.props.channels}/>
                           </select>
                 <span className="input-group-btn">
                     <button className="btn btn-search"
                       onClick={this.onSearch.bind(this)}>
                     <i className="fa fa-search fa-fw"></i> Search</button>
                </span>
             </div>

         );
  }

}
class RenderChannelOptions extends Component{
  renderChannelOption(channel){
      return (
        <option value={channel.channelId} key={channel.channelId}>{channel.channelName}</option>
      );
  }
   render(){
      return this.props.channels.map(this.renderChannelOption.bind(this));
    }

}
