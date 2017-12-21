import React, {Component} from 'react'

import {AppLogin,LoginAppHeader,LoadingIcon} from "../components";
import {textValues} from "../configs";


import {genericUtil} from "../utils";

export default class LoadingScreen extends Component {
    render() {
        return (
        <div>
          <LoginAppHeader/>

                <div style={LoginAppHeader.styles.content}>
                            <LoadingIcon loading="true"/>
                </div>
          </div>
                );

    }
  }
