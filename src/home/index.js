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



import {styles} from "./styles";
import {globalStyles} from "../components/styles";

import {TopMenu} from "../menu";
import {CreateImageForm} from "../create-image-form";
import {ImageUploader} from "../image-uploader";
import {LoginForm} from "../login-form";
import {storeHelper,store} from "../store";





export  class Home extends Component {
  constructor(props){
    super(props);
    this.state={authorization:storeHelper.getAuthorization()};

    store.subscribe(()=>{
          this.setState(Object.assign({}, this.state, {authorization:storeHelper.getAuthorization()}));
    });

  }
render() {
      console.log("******:");

      if(this.state.authorization){
            return(
              <div className="container">
                  <div style={globalStyles.headerSection}>
                       <TopMenu selected="home"/>
                  </div>
                  <div id="mainContent">
                        <CreateImageForm/>
                        <ImageUploader/>
                  </div>

              </div>
            );
  }
else{
    return (
      <div className="container">
          <div style={globalStyles.headerSection}>
          </div>
          <div id="mainContent">
                <LoginForm/>
          </div>
      </div>
            );
  }

}

}
