import React, {Component} from 'react'
import {ModalDialog} from "../components";
import {genericUtil} from "../utils";

import {episodedata,store} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import "./styles/index.css";


export default class DisplaySetProperty extends Component{
  constructor(props){
      super(props);
      this.state={title:this.props.title, modalMessage:null};
  }
  onClearMessage(){
    this.setState(Object.assign({}, this.state,{modalMessage:null}));
  }
  onConfirmDeleteImageSet(){
    this.onClearMessage();
    this.props.deleteImageSet();
  }
  onCancelDeleteImageSet(){
    this.onClearMessage();
  }
  displayConfirmDeleteDialog(){
    var modalMessage={
           title:textValues.deleteImageSetDialog.title,
           content:textValues.deleteImageSetDialog.content,
           onConfirm:this.onConfirmDeleteImageSet.bind(this),
           confirmButton:textValues.deleteImageSetDialog.confirm,
           cancelButton:textValues.deleteImageSetDialog.cancel,
           onCancel:this.onCancelDeleteImageSet.bind(this)
    }
    this.setState(Object.assign({}, this.state,{modalMessage}));

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
                            <div className="col-sm-4 formFieldWithLabel">
                               <label htmlFor="contractNumber">Contract Number:</label>
                               <input type="text" className="form-control" id="contractNumber" placeholder="Contract number" name="contractNumber" value={contractNumber} readOnly={true}/>
                             </div>
                             <div className="col-sm-4 formFieldWithLabel">
                               <label htmlFor="episodeNumber">Episode Number:</label>
                             <input type="text" className="form-control" id="episodeNumber" placeholder="Episode Number" name="episodeNumber" readOnly={true} value={episodeNumber}/>
                           </div>
                           <div className="col-sm-4 formFieldWithLabel">
                                <button type="button" className="btn btn-primary btn-normal" onClick={(evt) => {

                                    this.displayConfirmDeleteDialog();
                                }}>Delete</button>
                                <button type="button" className="btn btn-primary btn-normal" onClick={(evt) => {
                                         this.props.approveImageSet();
                                     }}>Approve</button>
                           </div>
                           
                           
                           
                       </div>
                       <div className="row">
                         <div className="col-sm-12 formFieldWithLabel">
                            <label htmlFor="title">Title:</label>
                            <input type="text" className="form-control" id="title" placeholder="Title" name="title" value={title} onChange={evt=>{this.setTitle(evt.target.value)}}/>
                            <DisplayTitleUpdateButton statedata={this.state} {...this.props} updateTitle={this.updateTitle.bind(this)}/>
                          </div>
                       </div>
                      <ModalDialog message={this.state.modalMessage}/>
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
