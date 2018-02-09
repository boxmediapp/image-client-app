import React, {Component} from 'react'
import {ModalDialog} from "../components";
import {genericUtil} from "../utils";

import {store,appdata} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import "./styles/index.css";


export default class ImageSetOperations extends Component{
  constructor(props){
      super(props);
      this.state={modalMessage:null};
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
  checkPermission(){
      var userinfo=appdata.getUserInfo();
      if(genericUtil.doesUserHasFullAccess(userinfo)){
         return true;
      }
      else{
        var modalMessage={
               title:textValues.permissionError.title,
               content:textValues.permissionError.content,
               onConfirm:this.onClearMessage.bind(this),
               confirmButton:"OK"
        }
        this.setState(Object.assign({}, this.state,{modalMessage}));
        return false;
      }
  }
  displayConfirmDeleteDialog(){
    if(this.checkPermission()){
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
  }


  render(){


        return (
                <div className="container">
                        <div className="row">
                           <div className="col-sm-4 formFieldWithLabel">
                                <button type="button" className="btn btn-primary btn-normal" onClick={(evt) => {

                                    this.displayConfirmDeleteDialog();
                                }}>Delete</button>
                                <button type="button" className="btn btn-primary btn-normal" onClick={(evt) => {
                                       if(this.checkPermission()){
                                          this.props.approveImageSet();
                                       }
                                     }}>Approve</button>

                               <button type="button" className="btn btn-primary btn-normal" onClick={(evt) => {
                                            if(this.checkPermission()){
                                                  this.props.copyImageSet();
                                            }
                                          }}>{textValues.copyImageSet.action}</button>
                           </div>

                       </div>
                      <ModalDialog message={this.state.modalMessage}/>
               </div>
          );

  }


}
