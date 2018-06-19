import React, {Component} from 'react'

import {genericUtil} from "../utils";

import {store,appdata} from "../store";
import {api} from "../api";
import {textValues} from "../configs";
import "./styles/index.css";


export default class DisplaySetProperty extends Component{
  constructor(props){
      super(props);
      this.state=this.getStateFromProps(this.props);
  }

 componentWillReceiveProps(nextProps){
     if(this.props.title!=nextProps.title || this.props.imageSetType!=nextProps.imageSetType){
        this.setState(this.getStateFromProps(nextProps))
     }
  }

  getStateFromProps(props){
      return {title:props.title,imageSetType:props.imageSetType};
  }


  setTitle(title){
      this.setState(Object.assign({}, this.state, {title}));
  }
  setImageSetType(imageSetType){
      this.setState(Object.assign({}, this.state, {imageSetType}));
  }
  updateImageSetProperty(){
        this.props.updateImageSetProperty(this.state);
  }
  renderUpdateButton(){
      if(this.state.title===this.props.title && this.state.imageSetType===this.props.imageSetType){
          return null;
      }
      else{
        return(
          <button type="button" className="btn btn-primary btn-normal" onClick={(evt) => {
                   this.updateImageSetProperty();
               }}>Update</button>

        );
      }
  }
  renderImageType(){
      var checked=false;
      if(this.state.imageSetType ==='CUT_OUT'){
            checked=true;
      }
      return(
        <div className="col-sm-2">
              <label htmlFor="isCutout">Cutout</label>
                <input id="isCutout" name="isCutout" type="checkbox" checked={checked}
                  style={{marginLeft:5}}
                  onChange={evt=>{
                    if(appdata.isUserAdmin()){
                      if(evt.target.checked){
                          this.setImageSetType('CUT_OUT');
                      }
                      else{
                          this.setImageSetType('DEFAULT');
                      }
                    }

                  }}/>
       </div>


      );

  }

  render(){
        var {contractNumber,episodeNumber,title,imageType}=this.props;
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
                           {this.renderImageType()}
                           <div className="col-sm-2 formFieldWithLabel">
                             {this.renderUpdateButton()}
                         </div>
                       </div>
                       <div className="row">
                         <div className="col-sm-12 formFieldWithLabel">
                            <label htmlFor="title">Title:</label>
                            <input type="text" className="form-control" id="title" placeholder="Title" name="title" value={title} onChange={evt=>{this.setTitle(evt.target.value)}}/>
                          </div>
                       </div>


               </div>
          );




  }


}
