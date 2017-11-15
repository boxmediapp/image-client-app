import React, {Component} from 'react'

import {Table, Column, Cell} from "fixed-data-table-2";
import {textValues,localImages} from "../configs";
import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'
import {styles} from "./styles";
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
                 rowHeight={150}
                 headerHeight={50}
                 rowsCount={imageSets.length}
                 width={1000}
                 height={1000}>

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
                                           width={550}
                                           />
                                  <Column
                                           columnKey="id"
                                           header={<Cell></Cell>}
                                           cell={<ImageCell data={imageSets}/>}
                                           width={250}
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




class ImageCell extends Component {
  render() {
    const {data, rowIndex, columnKey, ...props} = this.props;
    var link=textValues.assignImageByContractAndEpidodeNumber.link+"/?contractNumber="+data[rowIndex].contractNumber+"&episodeNumber="+data[rowIndex].episodeNumber;
    var linkText=textValues.assignImageByContractAndEpidodeNumber.actionText;


    var images=data[rowIndex].images;
    var thumbnailImages=images.filter(image=>image.width===192 && image.height===108);
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

    return (
      <Cell {...props}>
        <Link to={link}>
          <img src={imgurl} style={styles.image(width,height)}/>
        </Link>

      </Cell>
    );
  }


}
