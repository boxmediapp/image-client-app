
import React, {Component} from "react";
import {styles} from './styles';
import "./styles/BigIcon.css";
import {
  Link

} from 'react-router-dom'

export default class BigIcon extends Component {

    render(){

        return (
            <div className="round-button">
               <div className="round-button-circle">
                 <Link to={this.props.link} className="round-button">
                  {this.props.title}
                    </Link>
               </div>
               <div>{this.props.content}</div>
            </div>
        );

    }

}
