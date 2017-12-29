import React, {Component} from 'react'
import {api} from "../api";


import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'

import {textValues,config} from "../configs";
import {AppHeader,BigButton} from "../components";
import {styles} from "./styles";
import {genericUtil} from "../utils";

export  default class AdminView extends Component {
    constructor(props){
      super(props);
    }
    render(){

        return (
          <div>
            <AppHeader selected="admin"/>

              <div style={AppHeader.styles.content}>
                  <div style={styles.iconContainer}>

                      <BigButton label={textValues.manageUser.linkText}
                                 content={textValues.manageUser.actionText}
                                 link={textValues.manageUser.link}/>

                    <BigButton label={textValues.manageCache.linkText}
                                           content={textValues.manageCache.actionText}
                                           link={textValues.manageCache.link}/>

                    <BigButton label={textValues.manageSchduleImport.linkText}
                                            content={textValues.manageSchduleImport.actionText}
                                            link={textValues.manageSchduleImport.link}/>



            </div>
             </div>




          </div>
        );

    }

}
