import React, {Component} from 'react'

import {localImages,textValues} from "../../configs";
import TopMenu from "./TopMenu";
import {styles} from "./styles";
export  default class AppHeader extends Component {

    render(){
      
        return (
            <div style={styles.header}>
                    <div style={styles.titleContainer}>
                            <img src={localImages.logo} className="logo"/>
                    </div>

                      <TopMenu selected={this.props.selected}/>

                      <div style={styles.appTitle}>{textValues.title}</div>

              </div>



        );

    }

}

AppHeader.styles=styles;
