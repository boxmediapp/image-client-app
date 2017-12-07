import React, {Component} from 'react'
import {localImages,textValues} from "../../configs";
import {styles} from "./styles";
export  default class LoginAppHeader extends Component {

    render(){

        return (

          <div style={styles.header()}>
                  <div style={styles.titleContainer()}>
                          <img src={localImages.logo} style={styles.logo}/>

                           <div style={styles.appTitle}>{textValues.title}</div>
                  </div>


            </div>


        );

    }

}


LoginAppHeader.styles=styles;
