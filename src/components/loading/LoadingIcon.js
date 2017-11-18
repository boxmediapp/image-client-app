
import React, {Component} from "react";
import "./styles/index.css";
import {
  Link

} from 'react-router-dom'

export default class LoadingIcon extends Component {

    render(){
      if(this.props.loading){
        return (
           <div className="smallLoader"></div>
        );
      }
      else{
        return null;
      }



    }

}
