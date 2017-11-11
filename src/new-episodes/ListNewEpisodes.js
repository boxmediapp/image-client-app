import React, {Component} from 'react'

import {Table, Column, Cell} from "fixed-data-table-2";
import {textValues} from "../configs";
import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'

export  default class ListNewEpisodes extends Component {

    render(){
        var episodes=this.props.data.episodes;
        if(episodes){
          return this.renderEpisodes(episodes);
        }
        else{
          return null;
        }

    }

  renderEpisodes(episodes){
    var data={episodes, lastRecordsDisplayed:this.props.lastRecordsDisplayed}
    return(
      <div className="content">
               <Table
                 rowHeight={50}
                 headerHeight={50}
                 rowsCount={episodes.length}
                 width={1000}
                 height={1000}>
                       <Column
                        columnKey="id"
                        header={<Cell></Cell>}
                        cell={<ActionCell data={data}/>}
                        fixed={true}
                        width={100}
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
                                           width={700}
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
      this.props.data.lastRecordsDisplayed();
    }
    return (
      <Cell {...props}>
        {data.episodes[rowIndex][columnKey]}
      </Cell>
    );
  }
};


class ActionCell extends Component {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    var link=textValues.addImageView.episode.link+"/?episodeid="+data.episodes[rowIndex][columnKey];
    var linkText=textValues.addImageView.episode.text;

    return (
      <Cell {...props}>
        <Link to={link}>
              {linkText}
        </Link>
      </Cell>
    );
  }


}
