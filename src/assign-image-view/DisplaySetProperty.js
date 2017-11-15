import React, {Component} from 'react'
import {ListEpisodes} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import "./styles/index.css";


export default class DisplaySetProperty extends Component{
  constructor(props){
      super(props);
      this.state={title:this.props.title};
  }

  setTitle(title){
      this.setState(Object.assign({}, this.state, {title}));
  }
  updateTitle(){
        this.props.updateTitle(this.state.title);
  }
  render(){
        var {contractNumber,episodeNumber,title}=this.props;
        title=this.state.title;
        return (
                <div className="container">
                        <div className="row">
                            <div className="col-sm-6 formFieldWithLabel">
                               <label htmlFor="contractNumber">Contract Number:</label>
                               <input type="text" className="form-control" id="contractNumber" placeholder="Contract number" name="contractNumber" value={contractNumber} readOnly={true}/>
                             </div>
                             <div className="col-sm-6 formFieldWithLabel">
                               <label htmlFor="episodeNumber">Episode Number:</label>
                             <input type="text" className="form-control" id="episodeNumber" placeholder="Episode Number" name="episodeNumber" readOnly={true} value={episodeNumber}/>
                           </div>
                       </div>
                       <div className="row">
                         <div className="col-sm-12 formFieldWithLabel">
                            <label htmlFor="title">Title:</label>
                            <input type="text" className="form-control" id="title" placeholder="Title" name="title" value={title} onChange={evt=>{this.setTitle(evt.target.value)}}/>
                            <DisplayTitleUpdateButton statedata={this.state} {...this.props} updateTitle={this.updateTitle.bind(this)}/>
                          </div>
                       </div>
               </div>
          );




  }


}
class DisplayTitleUpdateButton extends Component{
  render(){
      if(this.props.statedata.title===this.props.title){
          return null;
      }
      else{
        return(

          <button type="button" className="btn btn-primary btn-normal" onClick={(evt) => {

                   this.props.updateTitle();
               }}>Update</button>

        );
      }
  }
}
