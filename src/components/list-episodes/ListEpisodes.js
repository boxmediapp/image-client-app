import React, {Component} from 'react'

import {Table, Column, Cell} from "fixed-data-table-2";
import {textValues} from "../../configs";
import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'

export  default class ListEpisodes extends Component {

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
    return(
      <div>
               <Table
                 rowHeight={50}
                 headerHeight={50}
                 rowsCount={episodes.length}
                 width={1000}
                 height={1000}>
                 <Column
                          columnKey="id"
                          header={<Cell></Cell>}
                          cell={<ActionCell data={episodes}/>}
                          fixed={true}
                          width={50}
                          />

                 <Column
                   columnKey="contractNumber"
                   header={<Cell>Contract</Cell>}
                   cell={<TextCell data={episodes}/>}
                   fixed={true}
                   width={100}
                   />
                <Column
                     columnKey="episodeNumber"
                     header={<Cell>Episode</Cell>}
                     cell={<TextCell data={episodes}/>}
                     fixed={true}
                     width={100}
                     />
                <Column
                       columnKey="imageStatus"
                       header={<Cell>Status</Cell>}
                       cell={<TextCell data={episodes}/>}
                       fixed={true}
                       width={200}
                       />
                <Column
                         columnKey="title"
                         header={<Cell>Title</Cell>}
                         cell={<TextCell data={episodes}/>}

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


class ActionCell extends Component {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    var link=textValues.episode.view.link+"/"+data[rowIndex][columnKey];

    return (
      <Cell {...props}>
        <Link to={link}>
              {textValues.episode.view.text}
        </Link>
      </Cell>
    );
  }


}
