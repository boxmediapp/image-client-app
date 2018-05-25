import React, {Component} from 'react'
import QRCode from "qrcode.react";
import {createMessageConnector} from "global-input-message";

import {config,textValues} from "../../configs";


import  "./styles/LoginForm.css";
import {api} from "../../api";
import {appdata} from "../../store";
import {genericUtil} from "../../utils";

export default class AppLogin extends Component {
   constructor(props){
     super(props);
     this.state=this.getStateFromProps(this.props);
   }
   getStateFromProps(props){
        var globalInputState={
          connector:null,
          connected:false,
          senderConnected:false
        }
        return {username:"",password:"", globalInputState};
  }
  componentWillReceiveProps(nextProps){
        //this.setState(this.getStateFromProps(nextProps))
  }

   setUsername(username){
        this.setState(Object.assign({}, this.state,{username}));
   }
   setPassword(password){

   this.setState(Object.assign({}, this.state,{password}));
 }
 componentDidMount(){
      this.connectGlobalInput();
  }
  componentWillUnmount(){
          this.disconnectGlobalInput();
    }
    onSenderConnected(sender, senders){
         console.log("Sender Connected");
         var globalInputState=this.state.globalInputState;
         globalInputState.senderConnected=true;
         this.setState(Object.assign({}, this.state,{globalInputState}));
    }
    onSenderDisconnected(sender,senders){
        this.connectGlobalInput();
   }

  onConnected(){
    console.log("Sender Connected");
    var globalInputState=this.state.globalInputState;
    globalInputState.connected=true;
    this.setState(Object.assign({}, this.state,{globalInputState}));
  }


  disconnectGlobalInput(){
      var globalInputState=this.state.globalInputState;
      if(globalInputState.connector){
              globalInputState.connector.disconnect();
              globalInputState.connector=null;
      }
      this.setState(this.getStateFromProps(this.props));
  }

  sendInputMessage(message, fieldIndex){
    if(this.globalInputState.senderConnected){
       this.globalInputState.connector.sendInputMessage(message,fieldIndex);
    }
  }

    connectGlobalInput(){
        var globalInputState=this.state.globalInputState;
        if(globalInputState.connector){
                globalInputState.connector.disconnect();
                globalInputState.connector=null;
                globalInputState.connected=false;
                globalInputState.senderConnected=false;
        }
        globalInputState.connector=createMessageConnector();
        this.setState(Object.assign({}, this.state,{globalInputState}));
        globalInputState.connector.connect(this.buildGlobalInputConfig());
    }


  login(){
      const {username,password}=this.state;
      var that=this;
      api.login(username,password).then(function(userinfo){
          console.log("****logininfo***"+JSON.stringify(userinfo));
          if(userinfo){
                appdata.setUserInfo(userinfo);
                genericUtil.saveUserInfo(userinfo);
          }
      }).catch(function(error){
             console.error(error);
             that.props.onLoginFail("Failed to sign in");
      });
  }

      buildGlobalInputConfig(){
      return {
            url:config.url,
            apikey:config.apikey,
            securityGroup:config.securityGroup,
            initData:{
              action:"input",
              dataType:"form",
              form:{
                id: "###username###@"+config.appid,
                title:"Sign In",
                label:"boxmedia",
                fields:[{
                          id:"username",
                          label:"Username",
                          value:this.state.username,
                          operations:{
                              onInput:this.setUsername.bind(this)
                          }

                        },{
                           id:"password",
                           label:"Password",
                           type:"secret",
                           operations:{
                             onInput:this.setPassword.bind(this)
                           }

                        },{
                           label:"Login",
                           type:"button",
                           operations:{
                              onInput:this.login.bind(this)
                           }

                        }]
                    }
           },
           onSenderConnected:this.onSenderConnected.bind(this),
           onSenderDisconnected:this.onSenderDisconnected.bind(this),
           onRegistered:(next)=>{
                    next();
                    this.onConnected();
            }
        };
      }
  render() {
          return (
             <div className="container">
                   <div className="row">
                       <div className="col-sm-6">
                               <div className="formContainer">
                                    <DisplaySignInForm username={this.state.username} password={this.state.password}
                                      setUsername={this.setUsername.bind(this)}
                                      setPassword={this.setPassword.bind(this)}
                                      login={this.login.bind(this)}/>
                               </div>
                       </div>
                       {this.renderQRCode()}
                    </div>
            </div>
          );

   }
renderQRCode(){
    var globalInputState=this.state.globalInputState;
    if(globalInputState && globalInputState.connector && globalInputState.connected){
            var qrCodeContent=globalInputState.connector.buildInputCodeData();
            console.log("qrcode:[["+qrCodeContent+"]]");
            return(
              <div className="col-sm-6">
                      <QRCode
                          value={qrCodeContent}
                          level="H"
                          size={300}
                       />
                     <div className="globalInputText">Powered by <a href="https://globalinput.co.uk/">Global Input Software</a>
                     </div>
             </div>
            );
    }
    else{
      return null;
    }

 }

}
class DisplaySignInForm extends Component{
  render(){
    return(
    <div className="loginForm">
       <div className="loginTitle">{textValues.signin.title}</div>
            <div className="loginFieldContainer">
                  <label htmlFor="username">Username:</label>
                  <input type="text" className="form-control" id="username" placeholder="Username" name="username"  onChange={(evt) => {
                  this.props.setUsername(evt.target.value);
                }} value={this.props.username}/>
            </div>

            <div>
                  <label htmlFor="password">Password:</label>
                  <input type="password" className="form-control" id="password" placeholder="Password" name="password" onChange={(evt) => {
                        this.props.setPassword(evt.target.value);
                        }} value={this.props.password} />
            </div>
            <div>
                  <button type="button" className="btn btn-primary btn-block" onClick={(evt) => {
                           this.props.login();
                       }}>Login</button>
            </div>
    </div>
  );


  }
}
