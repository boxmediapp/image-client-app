import React, {Component} from 'react'

import {LoginForm} from "../components";
import {images,textValues} from "../configs";

import  "./styles/DisplayLogin.css";
import AutoLogin from "../do-not-check-in";
export  default class DisplayLogin extends Component {

    render() {
        return (
        <div>

          <div className="header">
                 <img src={images.logo} className="logo"/>
                 <div className="title">
                       {textValues.title}
                 </div>
          </div>
                <div className="container">

                    <div className="mainContent">
                          <LoginForm/>
                    </div>
                </div>
          </div>
                );

    }
  }
