import React, {Component} from 'react'

import {Table, Column, Cell} from "fixed-data-table-2";
import {textValues} from "../configs";
import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'
import {styles} from "./styles";
export  default class ListScheduleEpisodes extends Component {

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
    var data={episodes, onLoadLoadNextPage}
    return(
      <div className="content">
               <Table
                 rowHeight={50}
                 headerHeight={50}
                 rowsCount={episodes.length}
                 width={1000}
                 height={1000}>

                 <Column
                          columnKey="schedule.scheduleTimestamp"
                          header={<Cell>Date</Cell>}
                          cell={<ScheduleDateCell data={data}/>}
                          width={100}
                          fixed={true}
                         />

               <Column
                        columnKey="schedule.channel"
                        header={<Cell>Channel</Cell>}
                        cell={<ChannelDateCell data={data}/>}
                        width={100}
                        fixed={true}
                />
               <Column
                           columnKey="contractNumber"
                           header={<Cell>Contract</Cell>}
                           cell={<TextCell data={data}/>}
                           fixed={true}
                           width={100}
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
                                           header={<Cell>Title</Cell>}
                                           cell={<TextCell data={data}/>}
                                           width={400}
                                           fixed={true}
                                          />

                                          <Column
                                           columnKey="id"
                                           header={<Cell></Cell>}
                                           cell={<ActionCell data={data}/>}
                                           fixed={true}
                                           width={200}
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
    var link=null;
    var linkText=null;
    var episode=data.episodes[rowIndex];
    if(episode.imageSets && episode.imageSets.length>0){
      link=textValues.assignImageByContractAndEpidodeNumber.link+"/?contractNumber="+episode.contractNumber+"&episodeNumber="+episode.episodeNumber;
      linkText=textValues.assignImageByContractAndEpidodeNumber.linkText;
    }
    else{
          link=textValues.assignImageByEpisode.link+"/?episodeid="+episode.id;
          linkText=textValues.assignImageByEpisode.linkText;
    }


    return (
      <Cell {...props} >
        <Link to={link} style={styles.dataCell}>
              {linkText}
        </Link>
      </Cell>
    );
  }


}
