import React, {Component} from 'react'
import {api} from "../api";


import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'

import {textValues} from "../configs";
import {AppHeader} from "../app-header";

import {styles} from "./styles";
import {genericUtil} from "../../utils";
import {appdata} from "../../store";

export  default class NoServicesView extends Component {


        render(){
          var pathname=genericUtil.getPathName();
          var username=appdata.getUserInfo().username;

        return (
          <div>
                <AppHeader selected="home"/>
                  <div style={AppHeader.styles.content}>
                             <div style={styles.contentContainer}>
                                  <div style={styles.contentContainer}>
                                      <div style={styles.formContainer}>
                                          <div style={styles.title}>{textValues.noServices.title}</div>
                                          <div className="content">
                                                <div>The path "{pathname}" is not permitted to the user {username}.
                                                </div>
                                                <div>you may need to sign out and sign in again </div>



                                          </div>
                                      </div>
                                  </div>
                            </div>
                  </div>
        </div>
        );

    }

}
