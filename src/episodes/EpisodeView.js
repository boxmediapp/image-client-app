import React, {Component} from 'react'
import {ListEpisodes,ImageUploader} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {textValues} from "../configs";


export default class EpisodeView extends Component{

  constructor(props){
        super(props);
        var episodeId=genericUtil.getPathVariable(this.props.location.pathname,textValues.episode.view.link);
        var episode=episodedata.findEpisodeById(episodeId);
        this.state={episode};
        this.ubsubsribe=store.subscribe(()=>{
              var episode=episodedata.findEpisodeById(episodeId);
              this.setEpisode(episode);
        });
         api.getEpisodeById(episodeId).then(episode =>{
            episodedata.updateEpsiode(episode);
        });

  }
  setEpisode(episode){
    if(episode===this.state.episode || episodedata.isEpisodeIsIdentical(episode, this.state.episode)){
        return;
    }
    this.setState(Object.assign({}, this.state,{episode}));
  }

onUploadComplete(filename, baseURL, imageTags, width,height){
        console.log(filename+" is uploaded:"+baseURL);
        var imageset={
             tags:imageTags,
             episodeId:this.state.episode.id,
             programmeNumber:this.state.episode.programmeNumber,
             title:this.state.episode.title
        }
        api.createImageSet(imageset).then(function(imageset){
            var image={
               filename:filename,
               s3BaseURL:baseURL,
               width:width,
               height:height
            };
            api.createImage(imageset.id,image).then(function(image){
                  console.log("***image created:"+JSON.stringify(image));
            }).catch(error=>{
                console.error("****:"+error);
            });

            console.log("success:"+JSON.stringify(imageset));
        }).catch(function(error){
          console.error("****:"+error);
        });

}
  render(){

      var episode=this.state.episode;
      if(episode){

        return (
          <div className="container">
                  <div className="row">
                      <div className="col-sm-6">
                         <label htmlFor="contractNumber">Contract Number:</label>
                         <input type="text" className="form-control" id="contractNumber" placeholder="Contract number" name="contractNumber" value={episode.contractNumber} readOnly={true}/>
                       </div>
                       <div className="col-sm-6">
                         <label htmlFor="episodeNumber">Episde Number:</label>
                       <input type="text" className="form-control" id="episodeNumber" placeholder="Episode Number" name="episodeNumber" readOnly={true} value={episode.episodeNumber}/>
                     </div>
                 </div>
                 <div className="row">
                   <div className="col-sm-12">
                      <label htmlFor="title">Title:</label>
                      <input type="text" className="form-control" id="title" placeholder="Title" name="title" value={episode.title} readOnly={true}/>
                    </div>
                 </div>
                 <DisplatImageSets episode={this.state.episode} onComplete={this.onUploadComplete.bind(this)} imageSets={this.state.episode.imageSets}/>

                 <div className="row">
                   <div className="col-sm-12">
                       <ImageUploader episode={this.state.episode}  onComplete={this.onUploadComplete.bind(this)}/>
                   </div>
                 </div>


         </div>
          );
      }
      else{
        return null;
      }

  }

  componentWillUnmount(){
    if(this.ubsubsribe){
      this.ubsubsribe();
    }
  }
}




class DisplatImageSets extends Component{


  render(){

      var imageSets=this.props.imageSets;
      if(imageSets){

        return imageSets.map(this.renderImageSet);
      }
      else{
        return null;
      }

  }
renderImageSet(imgset){
  var that=this;
  if(!imgset || !imgset.images){
    return null;
  }
  return(
        <div className="imageSetRecord">
            <div className="imageSetTag">
               {imgset.tags}
             </div>
             <DisplayImages episode={this.props.episode} onComplete={this.props.onComplete} imageSet={imgset} images={imgset.images} />

       </div>
     );
 }


}
class DisplayImages extends Component{
  render(){
      var images=this.props.images;
     if(images){
         return images.map(this.renderImage);
     }
     else{
       return null;
     }

  }
  renderImage(image){
    return(
          <ImageUploader episode={this.props.episode} onComplete={this.props.onComplete} imageSet={this.props.imageSet}  image={image}/>
       );
  }
}
