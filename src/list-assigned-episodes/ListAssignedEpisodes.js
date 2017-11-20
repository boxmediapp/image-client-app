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

        var episodes=this.props.episodes;
        if(episodes && episodes.length>0){
          return this.renderEpisodes(episodes);
        }
        else{
          return null;
        }

    }

  renderEpisodes(episodes){
    return(
      <div className="content">
               <Table
                 rowHeight={150}
                 headerHeight={50}
                 rowsCount={episodes.length}
                 width={1000}
                 height={1000}>

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
                                    columnKey="imageSets"
                                    header={<Cell>Images</Cell>}
                                    cell={<ImageCell data={episodes}/>}
                                    fixed={true}
                                    width={500}
                                    />       
                          <Column
                                         columnKey="title"
                                         header={<Cell>Title</Cell>}
                                         cell={<TextCell data={episodes}/>}
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
    var imageSets=data[rowIndex].imageSets;
    var link=textValues.assignImageByContractAndEpidodeNumber.link+"/?contractNumber="+data[rowIndex].contractNumber+"&episodeNumber="+data[rowIndex].episodeNumber;
    
    
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

