import React, {Component} from 'react'


import {config} from "../../configs";

import {CodeDataRenderer} from "global-input-react";
import  "./styles/LoginForm.css";
import {api} from "../../api";
import {appdata} from "../../store";
import {genericUtil} from "../../utils";

export default class LoginForm extends Component {
   constructor(props){
     super(props);
     this.state={username:"",password:""};
   }
   setUsername(username){
        this.setState(Object.assign({}, this.state,{username}));
   }
   setPassword(password){

   this.setState(Object.assign({}, this.state,{password}));
 }
  login(){
      const {username,password}=this.state;
      var that=this;
      api.login(username,password).then(function(user){
          appdata.setCredentials(username,password);
          genericUtil.saveCred(username,password);
      }).catch(function(){
             that.props.onLoginFail();             
      });
  }

      buildGlobalInputConfig(){
      return {
            url:config.url,
            apikey:config.apikey,
            securityGroup:config.securityGroup,
            initData:{
              action:"input",
              dataType:"login",
              form:{
                id: "daCbO8wfgBfdVfTke",
                title:"Sign In",
                label:"Image App Sign In",
                fields:[{
                          id:"emailAddress",
                          label:"Email address",
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
                       <div className="col-sm-6">
                              <CodeDataRenderer service={this}  config={this.buildGlobalInputConfig()} level="H" size="300" showControl={false}/>
                              <div className="globalInputText">Powered by <a href="https://globalinput.co.uk/">Global Input Software</a>
                              </div>
                      </div>
                    </div>
            </div>
          );
        }
}


class DisplaySignInForm extends Component{
  render(){
    return(
    <div className="loginForm">
       <div className="loginTitle">LOGIN</div>
       <div className="content">
            <div className="row">
               <div className="col-sm-12">
                  <label htmlFor="username">Username:</label>
                  <input type="text" className="form-control" id="username" placeholder="Username" name="username"  onChange={(evt) => {
                  this.props.setUsername(evt.target.value);
                }} value={this.props.username}/>
               </div>

               <div className="col-sm-12">
                  <label htmlFor="password">Password:</label>
                  <input type="password" className="form-control" id="password" placeholder="Password" name="password" onChange={(evt) => {
                        this.props.setPassword(evt.target.value);
                        }} value={this.props.password} />
               </div>
               <div className="col-sm-12">
                  <button type="button" className="btn btn-primary btn-block" onClick={(evt) => {
                           this.props.login();
                       }}>Login</button>
               </div>
            </div>
       </div>



    </div>
  );


  }
}
