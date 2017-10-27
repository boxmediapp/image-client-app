import React, {Component} from 'react'
import {ListEpisodes,ImageUploader} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {textValues} from "../configs";


export default class AddNewImageView extends Component{

  constructor(props){
        super(props);
        


        var episodeId=genericUtil.getQueryParam(this.props.location.search, "episodeid");
        var episode=null;
        if(episodeId){
              episode=episodedata.findEpisodeById(episodeId);
              if(episode){
                 contractNumber=episode.contractNumber;
                 episodeNumber=episode.episodeNumber;
                 title=episode.title;
                 if(episode.imageSets){
                   imageSets=episode.imageSets;
                 }
              }
              this.loadEpisodeById(episodeId);
        }
        this.state={contractNumber,episodeNumber,title,imageSets, episodeId};
        this.ubsubsribe=store.subscribe(()=>{
              var episode=episodedata.findEpisodeById(episodeId);
              if(episode){
                    this.setContractNumber(episode.contractNumber);
                    this.setEpisodeNumber(episode.episodeNumber);
                    this.setTitle(episode.title);
                    if(episode.imageSets){
                          this.setImageSets(episode.imageSets);
                    }
              }


        });
  }
  loadEpisodeById(episodeId){
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
  setImageSets(imageSets){
      if(imageSets===this.state.imageSets){
            return;
      }
    this.setState(Object.assign({}, this.state,{imageSets}));

  }
  setTitle(title){
    if(title===this.state.title){
        return;
    }
    this.setState(Object.assign({}, this.state,{title}));
  }

createImageSet(data, props){
  if(props.imageSet){
    return Promise.resolve(props.imageSet);
  }

  var episodeid=this.state.episodeId;
  if(!episodeid){
    if(episodeid=this.state.imageSets){
        episodeid=this.state.imageSets[0].episodeId;
    }
  }
  var imageset={
       episodeId:episodeid,
       programmeNumber:props.contractNumber+"/"+props.episodeNumber,
       title:props.title,
       fileCounter:props.fileCounter
  }
  return api.createImageSet(imageset);
}
onUploadComplete(data,props){

        this.createImageSet(data,props).then(imageset=>{
          var image={
             filename:data.filename,
             s3BaseURL:data.baseURL,
             width:data.width,
             height:data.height,
             tags:data.imageTags,
             imageSet:imageset,
             imageStatus:'WAITING_APPROVE',
          };
          api.createImage(image).then(function(image){
                console.log("***image created:"+JSON.stringify(image));
          }).catch(error=>{
              console.error("****:"+error);
          });
        }).catch(function(error){
          console.error("****:"+error);
        });


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
   constructor(props){
     super(props);
   }

  render(){
      if(this.props.imageSets){
            return this.props.imageSets.map(imgSet=>{
              if(imgSet.images){
                return(
                  <DisplayImages {...this.props} imageSet={imgSet} images={imgSet.images} />
                );
              }
              else{
                return null;
              }

            });
      }
      else{
        return null;
      }

  }

}
class DisplayImages extends Component{
  render(){

      return(
        <div>
            {this.props.images.map(image=>{
                return (
                   <ImageUploader {...this.props}  image={image}/>
                 );
            })}

        </div>
      );
  }

}
