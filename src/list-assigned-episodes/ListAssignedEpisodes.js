import React, {Component} from 'react'

import {Table, Column, Cell} from "fixed-data-table-2";
import {textValues,localImages} from "../configs";
import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'
import {styles} from "./styles";
export  default class ListAssignedEpisodes extends Component {

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
                            }]

    };

    return(
      <div className="content">
               <Table
                 rowHeight={150}
                 headerHeight={50}
                 rowsCount={episodes.length}
                 width={1050}
                 height={1000}>

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
                                    columnKey="imageSets"
                                    header={<Cell>Images</Cell>}
                                    cell={<ImageCell data={data}/>}
                                    fixed={true}
                                    width={500}
                                    />
                          <Column
                                         columnKey="title"
                                         header={<HeaderCellSorting data={data}/>}
                                         cell={<TextCell data={data}/>}
                                         fixed={true}
                                         width={300}
                                         />

        </Table>
    </div>
     );
  }



}



class TextCell extends Component {
  render() {

    const {data, rowIndex, columnKey, ...props} = this.props;
    if(data && data.episodes && data.episodes.length && (rowIndex+10)>=data.episodes.length){
      this.props.data.onLoadLoadNextPage();
    }
    return (
      <Cell {...props}>
        {data.episodes[rowIndex][columnKey]}
      </Cell>
    );
  }
};

class ImageCell extends Component {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    var imageSets=data.episodes[rowIndex].imageSets;
    var link=textValues.assignImageByContractAndEpidodeNumber.link+"/?contractNumber="+data.episodes[rowIndex].contractNumber+"&episodeNumber="+data.episodes[rowIndex].episodeNumber;


    return (
      <Cell {...props}>
            <div style={styles.thumbnailContainer}>
                    {imageSets.map(imageSet=>{
                        return (
                          <Link to={link} key={imageSet.id}>
                          <div key={imageSet.id} style={styles.thumbnail}>
                                <DisplayThumbnail imageSet={imageSet}/>
                          </div>
                          </Link>

                        );
                    })}
            </div>
      </Cell>
    );
  }


}

class DisplayThumbnail extends Component{
    render(){
      var imageSet=this.props.imageSet;
      var link=textValues.assignImageByContractAndEpidodeNumber.link+"/?contractNumber="+imageSet.contractNumber+"&episodeNumber="+imageSet.episodeNumber;
      var thumbnailImages=imageSet.images.filter(image=>image.width===192 && image.height===108);
      var imgurl=null;
      var width=0;
      var height=0;
      var imgurl=null;
      if(thumbnailImages[0]){
          imgurl=thumbnailImages[0].s3BaseURL+"/"+thumbnailImages[0].filename;
          width=thumbnailImages[0].width;
          height=thumbnailImages[0].hight;
      }
      if(!imgurl){
        imgurl=localImages.missing;
        width=192;
        height=108;
      }
      return(
              <img src={imgurl} style={styles.image(width,height)}/>
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
