import React, {Component} from 'react'
import  "./styles/AppHeader.css";
import {images,textValues} from "../../configs";
import TopMenu from "./TopMenu";
export  default class AppHeader extends Component {

    render(){
        return (
            <div className="header">


                    <div className="titleContainer">
                            <img src={images.logo} className="logo"/>
                    </div>

                      <TopMenu selected={this.props.selected}/>
                  
                      <div id="appTitle">{textValues.title}</div>

              </div>
        );

    }

}
