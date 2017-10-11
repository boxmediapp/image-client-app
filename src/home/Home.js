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
import {data,store} from "../store";
import {api} from "../api";





export  default class Home extends Component {
  constructor(props){
    super(props);
    this.state={authorization:data.getAuthorization()};

    this.ubsubsribe=store.subscribe(()=>{
          this.setAuthorization(data.getAuthorization());
          console.log("Store AppConfig:"+JSON.stringify(data.getAppConfig()));

    });

  }
 onLoggedout(currentAuthorization){
   this.setState(Object.assign({}, this.state, {authorization:null}));
 }
 onLoggedIn(currentAuthorization){
   api.loadConfig().then(appconfig=>{
     console.log("going to set config:"+JSON.stringify(appconfig));

       data.setAppConfig(appconfig);


     this.setState(Object.assign({}, this.state, {authorization:currentAuthorization}));
   }).catch((err)=>{
       console.error("failed to load the appinfo:"+err.stack);

   })


 }
 setAuthorization(currentAuthorization){
      if(this.state.authorization && (!currentAuthorization) ){
            this.onLoggedOut(currentAuthorization);
      }
      else if((!this.state.authorization) && currentAuthorization){
           this.onLoggedIn(currentAuthorization);
      }
      else if(this.state.authorization && currentAuthorization && this.state.authorization!==currentAuthorization){
           this.onLoggedIn(currentAuthorization);
      }

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


componentWillUnmount(){
  if(this.ubsubsribe){
        this.ubsubsribe();
  }
}


}
