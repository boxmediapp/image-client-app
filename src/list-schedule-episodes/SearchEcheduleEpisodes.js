import React, {Component} from 'react'
import "./styles/index.css";

import {styles} from "./styles";
import {genericUtil} from "../utils";

var weeknames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var weekoptions=[];
for(var i=0;i<weeknames.length;i++){
    weekoptions.push({
        value:i,
        label:weeknames[i]
    });
}


export default class SearchEcheduleEpisodes extends Component{
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
      this.state.pressWeek="";
      this.state.pressYear=(new Date()).getFullYear();
      this.state.weekStarts=1;
      this.state.weekEnds=6;
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


  autoFillDateFields(pressYear,pressWeek,weekStarts,weekEnds){
    if(pressYear && pressWeek){
      var range=genericUtil.getDateFromWeekOfYear(parseInt(pressYear),parseInt(pressWeek)-1,parseInt(weekStarts),parseInt(weekEnds));
      var fromDate=genericUtil.timestampToDateValue(range.fromDate);
      var toDate=genericUtil.timestampToDateValue(range.toDate);
      this.setState(Object.assign({}, this.state,{pressYear,pressWeek,weekStarts,weekEnds,fromDate,toDate}));
    }
    else{
      this.setState(Object.assign({}, this.state,{pressYear,pressWeek,weekStarts,weekEnds}));
    }
  }
  setPressWeek(pressWeek){
      this.autoFillDateFields(this.state.pressYear,pressWeek,this.state.weekStarts,this.state.weekEnds);
  }
  setPressYear(pressYear){
      this.autoFillDateFields(pressYear,this.state.pressWeek,this.state.weekStarts,this.state.weekEnds);
  }
  setWeekStarts(weekStarts){
    this.autoFillDateFields(this.state.pressYear,this.state.pressWeek,weekStarts,this.state.weekEnds);
  }
  setWeekEnds(weekEnds){
    this.autoFillDateFields(this.state.pressYear,this.state.pressWeek,this.state.weekStarts,weekEnds);
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

      <div className="content">
          <div className="row">
                <div className="col-sm-12">
                      Week:
                      <input type="text" style={styles.week} value={this.state.pressWeek} onChange={evt=>this.setPressWeek(evt.target.value)}/>
                      of year
                      <input type="text" style={styles.year} value={this.state.pressYear} onChange={evt=>this.setPressYear(evt.target.value)}/>
                      Weeks starts from
                      <SelectWeekStartsEndsDate value={this.state.weekStarts} onChange={this.setWeekStarts.bind(this)}/>
                      to <SelectWeekStartsEndsDate value={this.state.weekEnds} onChange={this.setWeekEnds.bind(this)}/>
                </div>
          </div>

          <div className="row">

                <div className="col-sm-12  searchWithChannelBox">

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
             </div>
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

class SelectWeekStartsEndsDate extends Component{
  renderOption(option,index){
    return(
        <option value={option.value} key={index}>{option.label}</option>
    );
  }
  render(){


    return(
              <select  value={this.props.value} onChange={evt=>{this.props.onChange(evt.target.value)}}>
                  {weekoptions.map(this.renderOption)}
              </select>

      );
  }

}
