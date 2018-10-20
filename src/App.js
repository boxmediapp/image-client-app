import React, {Component} from 'react'

import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/App.css";


import {textValues,images} from  "./configs";

import {appdata,store} from "./store";
import {api} from "./api";

import {DisplayLogin} from "./display-login";



import {genericUtil} from "./utils";
import {ModalDialog} from "./components";

import {LoadingScreen} from "./loading-screen";
import RenderImageApp from "./RenderImageApp";
import {WaitingApprovalApp}  from "./waiting-approval";
import {ImageClientApp} from "./image-client";
import {SignUpView} from "./sign-up";


export default class App extends Component{
  constructor(props){
    super(props);
    this.state={userinfo:"", loading:true};

  }
  componentWillMount(){
    this.ubsubsribe=store.subscribe(this.receiveStateFromStore.bind(this));
    genericUtil.clearOldStorage();
    var userInfo=genericUtil.loadUserInfo();
    if(genericUtil.isUserInfoValid(userInfo)){
        appdata.setUserInfo(userInfo);
    }
    else{
      this.state.loading=false;
    }
  }
  componentWillUnmount(){
    if(this.ubsubsribe){
      this.ubsubsribe();
    }
    genericUtil.stopRefreshLoginThread();
  }
  receiveStateFromStore(){
       var userinfo= appdata.getUserInfo();
       if(!userinfo){
          if(this.state.userinfo){
            api.logout(this.state.userinfo);
            this.setState(Object.assign({}, this.state, {userinfo:null,loading:false}));
            genericUtil.signout();
          }
          return;
       }
       if(userinfo === this.userinfo){
            return;
       }
       this.userinfo=userinfo;
       if(userinfo.application==="boxmedia" ||userinfo.application==="boximage"){
               api.loadConfig().then(appconfig=>{
                        var loading=false;
                        console.log("config is loaded");
                        this.setState(Object.assign({}, this.state, {userinfo,loading}));
                        console.log("config is set");
                        appdata.setAppConfig(appconfig);

               }).catch((err)=>{
                   console.error("failed to load the appinfo:"+err);
                   appdata.setUserInfo(null);
                   this.setState(Object.assign({}, this.state, {userinfo:null,loading:false}));
               });
       }
       else{
          var loading=false;
          this.setState(Object.assign({}, this.state, {userinfo,loading}));
       }
       genericUtil.startRefreshLoginThread(userinfo,api.refreshLogin.bind(api), appdata);
  }







  render(){

              var pathname=genericUtil.getPathName();

              if(this.state.loading){
                  return (<LoadingScreen/>);
              }
              else if(pathname && pathname===textValues.signup.link){
                  return <SignUpView/>
              }
              else if(this.state.userinfo){
                    if(genericUtil.canUserAccessApp(this.state.userinfo)){
                      return (<RenderImageApp userinfo={this.state.userinfo}/>);
                    }
                    else if(genericUtil.isUserImageClient(this.state.userinfo)){
                      return (<ImageClientApp userinfo={this.state.userinfo}/>);
                    }

                    else{
                      return (<WaitingApprovalApp userinfo={this.state.userinfo}/>);
                    }
              }

              else{
                return (
                    <DisplayLogin/>
                );
              }



    }



}
