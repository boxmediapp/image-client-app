import React, {Component} from 'react'
import {localImages,textValues} from "../../configs";
import {styles} from "./styles";
export  default class LoginAppHeader extends Component {

    render(){

        return (

          <div style={styles.header()}>
                  <div style={styles.titleContainer}>
                          <img src={localImages.logo} className="logo"/>
                  </div>
                    <div style={styles.appTitle}>{textValues.title}</div>

            </div>


        );

    }

}


LoginAppHeader.styles=styles;
