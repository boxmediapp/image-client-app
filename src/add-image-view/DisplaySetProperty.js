import React, {Component} from 'react'
import {ListEpisodes,ImageUploader} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {images,textValues} from "../configs";
import "./styles/index.css";

export default class DisplaySetProperty extends Component{
  render(){


        var {contractNumber,episodeNumber,title}=this.props;
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
               </div>
          );
    



  }


}
