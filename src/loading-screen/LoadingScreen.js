import React, {Component} from 'react'

import {LoadingIcon} from "../components";
import {textValues} from "../configs";

import AppHeader from "./app-header/AppHeader";
import {genericUtil} from "../utils";

export default class LoadingScreen extends Component {
    render() {
        return (
        <div>
          <AppHeader/>

                <div style={AppHeader.styles.content}>
                            <LoadingIcon loading="true"/>

                </div>
          </div>
                );

    }
  }
