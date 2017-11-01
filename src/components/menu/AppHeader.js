import React, {Component} from 'react'
import  "./styles/AppHeader.css";
import {localImages,textValues} from "../../configs";
import TopMenu from "./TopMenu";
export  default class AppHeader extends Component {

    render(){
        return (
            <div className="header">


                    <div className="titleContainer">
                            <img src={localImages.logo} className="logo"/>
                    </div>

                      <TopMenu selected={this.props.selected}/>

                      <div id="appTitle">{textValues.title}</div>

              </div>



        );

    }

}
