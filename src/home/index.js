import React, {Component} from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/styles/index.css";

import {textValues,images} from  "../configs";
import {DisplayBlockText,ShowImage,DownloadApp,RenderText,ContactUsButton} from "../components";
import {
  BrowserRouter as Router,
  Route,
  Link,
  withRouter
} from 'react-router-dom'


import DemoInput from "./DemoInput";
import {styles} from "./styles";
import {globalStyles} from "../components/styles";

import {TopMenu} from "../menu";
import {CreateImageForm} from "../create-image-form";
export  class Home extends Component {

render() {

    return (
      <div className="container">
          <div style={globalStyles.headerSection}>
               <TopMenu selected="home"/>
          </div>
          <div id="mainContent">
                <CreateImageForm/>
          </div>



      </div>
            );
  }
}
