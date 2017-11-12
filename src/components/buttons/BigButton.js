
import React, {Component} from "react";
import {styles} from './styles';
import "./styles/BigButton.css";
import {
  Link

} from 'react-router-dom'

export default class BigButton extends Component {

    render(){

        return (
           <div className="round-button-container">
                <div className="round-button">
                   <div className="round-button-circle">
                     <Link to={this.props.link} className="round-button">
                      {this.props.label}
                        </Link>
                   </div>
                </div>
               <div className="rount-button-label">{this.props.content}</div>
           </div>
        );


    }

}
