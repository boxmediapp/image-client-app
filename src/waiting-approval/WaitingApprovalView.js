import React, {Component} from 'react'
import {api} from "../api";


import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'

import {textValues} from "./configs";
import {AppHeader} from "../components";
import {appdata,store} from "../store";
import {styles} from "./styles";

export  default class WaitingApprovalView extends Component {

        render(){
          var userinfo=  appdata.getUserInfo();
        return (
          <div>
                <AppHeader selected="home"/>
                  <div style={AppHeader.styles.content}>
                             <div style={styles.contentContainer}>
                                  <div style={styles.contentContainer}>
                                      <div style={styles.formContainer}>
                                          <div style={styles.title}>Welcome {userinfo.username}!</div>
                                          <div className="content">
                                                {textValues.home.message}
                                          </div>
                                      </div>
                                  </div>
                            </div>
                  </div>
        </div>
        );

    }

}
