import React, {Component} from 'react'
import {localImages,textValues,config} from "../../configs";
import {styles} from "./styles";
export  default class AppHeader extends Component {
    render(){

        return (

          <div style={styles.header()}>
                    <img src={localImages.logo} style={styles.logo}/>
                    <div style={styles.titleContainer()}>
                           <div style={styles.appTitle}>{textValues.title}</div>
                           <div style={styles.appVersion}>Version: {config.version}</div>
                  </div>


            </div>


        );

    }

}


AppHeader.styles=styles;
