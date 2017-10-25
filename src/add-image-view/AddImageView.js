import React, {Component} from 'react'
import {ListEpisodes,ImageUploader} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {textValues} from "../configs";


export default class AddImageView extends Component{

  constructor(props){
        super(props);
        //var episodeId=genericUtil.getPathVariable(this.props.location.pathname,textValues.episode.view.link);
        var contractNumber="";
        var episodeNumber="";
        var title="";
        var imageSets=[];



        var episodeId=genericUtil.getQueryParam(this.props.location.search, "episodeid");
        var episode=null;
        if(episodeId){
              episode=episodedata.findEpisodeById(episodeId);
        }
        if(episode){
            contractNumber=episode.contractNumber;
            episodeNumber=episode.episodeNumber;
            title=episode.title;

        }
        this.state={contractNumber,episodeNumber,title,imageSets};

        this.ubsubsribe=store.subscribe(()=>{
              var episode=episodedata.findEpisodeById(episodeId);
              this.setContractNumber(episode.contractNumber);
              this.setEpisodeNumber(episode.episodeNumber);
              this.setTitle(episode.title);
        });
         api.getEpisodeById(episodeId).then(episode =>{
            episodedata.updateEpsiode(episode);
        });

  }

  setContractNumber(contractNumber){
    if(contractNumber===this.state.contractNumber){
        return;
    }
    this.setState(Object.assign({}, this.state,{contractNumber}));
  }
  setEpisodeNumber(episodeNumber){
    if(episodeNumber===this.state.episodeNumber){
        return;
    }
    this.setState(Object.assign({}, this.state,{episodeNumber}));
  }
  setTitle(title){
    if(title===this.state.title){
        return;
    }
    this.setState(Object.assign({}, this.state,{title}));
  }

onUploadComplete(filename, baseURL, imageTags, width,height){
        console.log(filename+" is uploaded:"+baseURL);
        /*
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
*/
}
  render(){

      var {contractNumber,episodeNumber,title,imageSets}=this.state;
      var fileCounter=genericUtil.getMaximumFileCounter(imageSets);

        return (
          <div className="container">
                  <div className="row">
                      <div className="col-sm-6">
                         <label htmlFor="contractNumber">Contract Number:</label>
                         <input type="text" className="form-control" id="contractNumber" placeholder="Contract number" name="contractNumber" value={contractNumber} readOnly={true}/>
                       </div>
                       <div className="col-sm-6">
                         <label htmlFor="episodeNumber">Episde Number:</label>
                       <input type="text" className="form-control" id="episodeNumber" placeholder="Episode Number" name="episodeNumber" readOnly={true} value={episodeNumber}/>
                     </div>
                 </div>
                 <div className="row">
                   <div className="col-sm-12">
                      <label htmlFor="title">Title:</label>
                      <input type="text" className="form-control" id="title" placeholder="Title" name="title" value={title} readOnly={true}/>
                    </div>
                 </div>

                 <DisplatImageSets onComplete={this.onUploadComplete.bind(this)} {...this.state}/>

                 <div className="row">
                   <div className="col-sm-12">
                       <ImageUploader fileCounter={fileCounter} onComplete={this.onUploadComplete.bind(this)} {...this.state}/>
                   </div>
                 </div>

         </div>
          );


  }

  componentWillUnmount(){
    if(this.ubsubsribe){
      this.ubsubsribe();
    }
  }
}




class DisplatImageSets extends Component{


  render(){
      if(this.props.imageSets){
            return this.props.imageSets.map(this.renderImageSet);
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
             <DisplayImages {...this.props} imageSet={imgset} images={imgset.images} />
       </div>
     );
 }


}
class DisplayImages extends Component{
  render(){

     if(this.props.images){
         return this.props.images.map(this.renderImage);
     }
     else{
       return null;
     }

  }
  renderImage(image){
    return(
          <ImageUploader {...this.props}  image={image}/>
       );
  }
}
