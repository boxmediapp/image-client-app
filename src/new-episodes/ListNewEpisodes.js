import React, {Component} from 'react'

import {Table, Column, Cell} from "fixed-data-table-2";
import {textValues,localImages} from "../configs";
import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'
import {styles} from "./styles";
export  default class ListNewEpisodes extends Component {
  
    render(){
      var {episodes,onLoadLoadNextPage}=this.props;
      if(episodes){
        return this.renderEpisodes(episodes,onLoadLoadNextPage);
      }
      else{
        return null;
      }

    }

  renderEpisodes(episodes,onLoadLoadNextPage){
    var queryparameters=this.props.queryparameters;
    var changeSort=this.props.changeSort;
    var data={episodes, queryparameters,onLoadLoadNextPage,changeSort,headers:[{

                                columnKey:"contractNumber",title:"Contract",
                                sortBy:"programmeNumber"
                             },{

                                columnKey:"title",title:"Title",
                                sortBy:"title"
                            },{

                               columnKey:"schedule.scheduleTimestamp",title:"Date",
                               sortBy:"boxSchedule.scheduleTimestamp"
                           },{

                              columnKey:"schedule.channel",title:"Channel",
                              sortBy:"boxSchedule.boxChannel.channelName"
                          }]

    };
    return(
      <div className="content">
               <Table
                 rowHeight={50}
                 headerHeight={50}
                 rowsCount={episodes.length}
                 width={1250}
                 height={1000}>
                       <Column
                        columnKey="id"
                        header={<Cell></Cell>}
                        cell={<ActionCell data={data}/>}
                        fixed={true}
                        width={120}
                        />
                         <Column
                           columnKey="contractNumber"
                           header={<HeaderCellSorting data={data}/>}
                           cell={<TextCell data={data}/>}
                           fixed={true}
                           width={150}
                           />
                          <Column
                               columnKey="episodeNumber"
                               header={<Cell>Episode</Cell>}
                               cell={<TextCell data={data}/>}
                               fixed={true}
                               width={100}
                               />



                                  <Column
                                           columnKey="title"
                                           header={<HeaderCellSorting data={data}/>}
                                           cell={<TextCell data={data}/>}
                                           width={500}
                                           fixed={true}
                                          />
                                          <Column
                                                   columnKey="schedule.scheduleTimestamp"
                                                   header={<HeaderCellSorting data={data}/>}
                                                   cell={<ScheduleDateCell data={data}/>}
                                                   width={200}
                                                   fixed={true}
                                                  />

                                      <Column
                                                  columnKey="schedule.channel"
                                                           header={<HeaderCellSorting data={data}/>}
                                                           cell={<ChannelDateCell data={data}/>}
                                                           width={200}
                                                           fixed={true}
                                                          />




        </Table>
    </div>
     );
  }



}



class TextCell extends Component {
  render() {

    const {data, rowIndex, columnKey, ...props} = this.props;
    if(data.episodes.length && (rowIndex+10)>=data.episodes.length){
      this.props.data.onLoadLoadNextPage();
    }
    return (
      <Cell {...props}>
        {data.episodes[rowIndex][columnKey]}
      </Cell>
    );
  }
};

class DateCell extends Component {
  render() {

    const {data, rowIndex, columnKey, ...props} = this.props;
    if(data.episodes.length && (rowIndex+10)>=data.episodes.length){
      this.props.data.onLoadLoadNextPage();
    }
    var datestring="";
    var timestamp=data.episodes[rowIndex][columnKey];
    if(timestamp){
        var datevalue=new Date(timestamp);
        datestring=datevalue.getDate()+"/"+(datevalue.getMonth()+1)+"/"+datevalue.getFullYear();
    }



    return (
      <Cell {...props}>
        {datestring}
      </Cell>
    );
  }
};
class ScheduleDateCell extends Component {
  render() {

    const {data, rowIndex, columnKey, ...props} = this.props;
    if(data.episodes.length && (rowIndex+10)>=data.episodes.length){
      this.props.data.onLoadLoadNextPage();
    }
    var datestring="";
    if(data.episodes[rowIndex].schedule && data.episodes[rowIndex].schedule.scheduleTimestamp){
          var timestamp=data.episodes[rowIndex].schedule.scheduleTimestamp;
          if(timestamp){
              var datevalue=new Date(timestamp);
              datestring=datevalue.getDate()+"/"+(datevalue.getMonth()+1)+"/"+datevalue.getFullYear();
          }
    }




    return (
      <Cell {...props}>
        {datestring}
      </Cell>
    );
  }
};
class ChannelDateCell extends Component {
  render() {

    const {data, rowIndex, columnKey, ...props} = this.props;
    if(data.episodes.length && (rowIndex+10)>=data.episodes.length){
      this.props.data.onLoadLoadNextPage();
    }
    var channelName="";
    if(data.episodes[rowIndex].schedule && data.episodes[rowIndex].schedule.boxChannel){
          channelName=data.episodes[rowIndex].schedule.boxChannel.channelName;
    }

    return (
      <Cell {...props}>
        {channelName}
      </Cell>
    );
  }
};

class ActionCell extends Component {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    var link=textValues.assignImageByEpisode.link+"/?episodeid="+data.episodes[rowIndex][columnKey];
    var linkText=textValues.assignImageByEpisode.linkText;

    return (
      <Cell {...props} >
        <Link to={link} style={styles.dataCell}>
              {linkText}
        </Link>
      </Cell>
    );
  }


}


class HeaderCellSorting extends Component {
  onChangeSort(matchedHeader,queryparameters,changeSort){
      var sortOrder="desc";
      if(queryparameters.sortBy===matchedHeader.sortBy && queryparameters.sortOrder==='desc'){
              sortOrder="asc";
      }
      changeSort(matchedHeader.sortBy, sortOrder);

  }
    render(){

        var queryparameters=this.props.data.queryparameters;
        var matchedHeaders=this.props.data.headers.filter(h=>h.columnKey===this.props.columnKey);
        var changeSort=this.props.data.changeSort;
        var imageurl=localImages.notSorted;

        var matchedHeader=null;
        if(matchedHeaders.length){
              matchedHeader=matchedHeaders[0];
        }

        if(matchedHeader && queryparameters.sortBy===matchedHeader.sortBy){
            if(queryparameters.sortOrder==='asc'){
              imageurl=localImages.ascending;
            }
            else{
              imageurl=localImages.descending;
            }
        }

        return(
          <Cell>
            <a onClick={e=>{this.onChangeSort(matchedHeader,queryparameters,changeSort)}}>
            <img src={imageurl}/>
            </a>

          {matchedHeader.title}
          </Cell>
        );
    }
}
