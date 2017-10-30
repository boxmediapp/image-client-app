import React, {Component} from 'react'

import {Table, Column, Cell} from "fixed-data-table-2";
import {textValues} from "../configs";
import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'

export  default class ListImageSets extends Component {

    render(){
        var imageSets=this.props.imageSets;
        if(imageSets && imageSets.length>0){
          return this.renderImageSets(imageSets);
        }
        else{
          return null;
        }

    }

  renderImageSets(imageSets){
    return(
      <div className="content">
               <Table
                 rowHeight={50}
                 headerHeight={50}
                 rowsCount={imageSets.length}
                 width={1000}
                 height={1000}>
                       <Column
                        columnKey="id"

                        header={<Cell></Cell>}
                        cell={<ActionCell data={imageSets}/>}
                        fixed={true}
                        width={100}
                        />
                         <Column
                           columnKey="contractNumber"
                           header={<Cell>Contract</Cell>}
                           cell={<TextCell data={imageSets}/>}
                           fixed={true}
                           width={100}
                           />
                          <Column
                               columnKey="episodeNumber"
                               header={<Cell>Episode</Cell>}
                               cell={<TextCell data={imageSets}/>}
                               fixed={true}
                               width={100}
                               />



                                  <Column
                                           columnKey="title"
                                           header={<Cell>Title</Cell>}
                                           cell={<TextCell data={imageSets}/>}
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
    return (
      <Cell {...props}>
        {data[rowIndex][columnKey]}
      </Cell>
    );
  }
};


class ActionCell extends Component {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    var link=textValues.addImageView.contractEpisode.link+"/?contractNumber="+data[rowIndex].contractNumber+"&episodeNumber="+data[rowIndex].episodeNumber;
    var linkText=textValues.addImageView.contractEpisode.text;
    return (
      <Cell {...props}>
        <Link to={link}>
              {linkText}
        </Link>
      </Cell>
    );
  }


}
