import React, {Component} from 'react'

import {Table, Column, Cell} from "fixed-data-table-2";
import {textValues,localImages} from "../configs";
import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'

export  default class ListImages extends Component {

    render(){
        var images=this.props.images;
        if(images && images.length>0){
          return this.renderImages(images);
        }
        else{
          return null;
        }

    }

  renderImages(images){
    return(
      <div className="content">
               <Table
                 rowHeight={150}
                 headerHeight={50}
                 rowsCount={images.length}
                 width={1500}
                 height={1000}>
                 <Column
                   columnKey="id"
                   header={<Cell>ID</Cell>}
                   cell={<TextCell data={images}/>}
                   fixed={true}
                   width={100}
                   />
                         <Column
                           columnKey="contractNumber"
                           header={<Cell>Contract</Cell>}
                           cell={<TextCell data={images}/>}
                           fixed={true}
                           width={100}
                           />
                          <Column
                               columnKey="episodeNumber"
                               header={<Cell>Episode</Cell>}
                               cell={<TextCell data={images}/>}
                               fixed={true}
                               width={100}
                               />
                          <Column
                                    columnKey="tags"
                                    header={<Cell>Tags</Cell>}
                                    cell={<TextCell data={images}/>}
                                    fixed={true}
                                    width={100}
                                    />
                             <Column
                                    columnKey="width"
                                    header={<Cell>Width</Cell>}
                                    cell={<TextCell data={images}/>}
                                    fixed={true}
                                    width={100}
                                    />
                                <Column
                                         columnKey="height"
                                         header={<Cell>Height</Cell>}
                                         cell={<TextCell data={images}/>}
                                         fixed={true}
                                         width={100}
                                />

                                <Column
                                                    columnKey="title"
                                                    header={<Cell>Title</Cell>}
                                                    cell={<TextCell data={images}/>}
                                                    fixed={true}
                                                    width={300}
                                                    />
                               <Column
                                    columnKey="url"
                                    header={<Cell>URL</Cell>}
                                    cell={<ActiveCell data={images}/>}
                                    fixed={true}
                                    width={600}
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


class ActiveCell extends Component {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
        <a href={data[rowIndex][columnKey]}>{data[rowIndex][columnKey]}</a>
      </Cell>
    );
  }
};
