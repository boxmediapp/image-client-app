import React, {Component} from 'react'
import {CodeDataRenderer} from "global-input-react";
import {api} from "../api";
import {config} from "../configs";

import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'


import {ModalDialog} from "../components";
import AppHeader from "./app-header/AppHeader";
import {appdata,store} from "../store";
import {styles} from "./styles";
import {textValues} from "../configs";
import {LoadingScreen} from "../loading-screen";
import "./styles/index.css";

export  default class SignUpView extends Component {
  constructor(props){
        super(props);
        this.state={firstName:"",lastName:"",email:"",password:"",company:"",modalMessage:null};
  }

  setErrorMessage(message){
    var modalMessage={
           title:textValues.signup.error.title,
           content:message,
           onConfirm:this.onClearMessage.bind(this),
           confirmButton:"Ok",
           loading:false,
           created:false
    }
    this.setState(Object.assign({}, this.state,{modalMessage}));
  }

  onClearMessage(){
    this.setState(Object.assign({}, this.state,{modalMessage:null}));
  }
  setFirstName(firstName){
       this.setState(Object.assign({}, this.state,{firstName}));
  }
  setLastName(lastName){
       this.setState(Object.assign({}, this.state,{lastName}));
  }
  setEmail(email){
       this.setState(Object.assign({}, this.state,{email}));
  }
  setPassword(password){
       this.setState(Object.assign({}, this.state,{password}));
  }
  setCompany(company){
       this.setState(Object.assign({}, this.state,{company}));
  }
  buildGlobalInputConfig(){
  return {
        url:config.url,
        apikey:config.apikey,
        securityGroup:config.securityGroup,
        initData:{
          action:"input",
          dataType:"subscribe",
          form:{
            id: "EjpMSalxPX@"+window.location.host,
            title:"Create Account",
            label:"Image App Account",
            fields:[{
                      id:"firstName",
                      label:"First Name",
                      value:this.state.firstName,
                      operations:{
                          onInput:this.setFirstName.bind(this)
                      }

                    },{
                              id:"lastName",
                              label:"Last Name",
                              value:this.state.lastName,
                              operations:{
                                  onInput:this.setLastName.bind(this)
                              }

                    },{
                              id:"email",
                              label:"Email",
                              value:this.state.email,
                              operations:{
                                  onInput:this.setEmail.bind(this)
                              }

                    },{
                       id:"password",
                       label:"Password",
                       type:"secret",
                       operations:{
                         onInput:this.setPassword.bind(this)
                       }

                    },{
                       id:"company",
                       label:"Company",
                       operations:{
                         onInput:this.setCompany.bind(this)
                       }

                    },{
                       label:"Create Account",
                       type:"button",
                       operations:{
                          onInput:this.createAccount.bind(this)
                       }

                    }]
                }
       }
    };
  }

  createAccount(){
    if(!this.state.firstName){
      this.setErrorMessage(textValues.signup.error.firstName);
    }
    else if(!this.state.lastName){
      this.setErrorMessage(textValues.signup.error.lastName);
    }
    else if(!this.state.email){
      this.setErrorMessage(textValues.signup.error.email);
    }
    else if(!this.state.company){
      this.setErrorMessage(textValues.signup.error.company);
    }
    else if(!this.state.password){
      this.setErrorMessage(textValues.signup.error.password.missing);
    }
    else if(this.state.password.trim().length<6){
      this.setErrorMessage(textValues.signup.error.password.tooshort);
    }
    else{
      this.setState(Object.assign({}, this.state,{loading:true}));
      api.createAccount({
          email:this.state.email,
          firstName:this.state.firstName,
          lastName:this.state.lastName,
          password:this.state.password,
          company:this.state.company
       }).then(response=>{

         this.setState(Object.assign({}, this.state,{loading:false,created:true}));
       }).catch(error=>{
         this.setState(Object.assign({}, this.state,{loading:false,created:false}));
        if(error && error.response){
              if(error.response.status===409){
                  this.setErrorMessage("The email address/Username '"+this.state.email+"' already exists.");
              }
              else if(error.response.status===502){
                  this.setErrorMessage("Server seems down, please try again later");
              }
              else{
                  this.setErrorMessage("Server error:"+error.response.status);
              }
        }
        else{
            this.setErrorMessage("Failed to created account:"+error);
        }


       });
    }

  }


renderForm(){
  return (
    <div>
        <AppHeader selected="home"/>

        <div style={AppHeader.styles.content}>
                   <div style={styles.contentContainer}>
                      <div style={styles.formContainer}>
                          <div style={styles.title}>Create Your Account</div>
                          <div className="form-group">
                              <label for="firstName">First Name:</label>
                              <input type="text" className="form-control" id="firstName" placeholder="First Name"
                              onChange={(evt) => {
                              this.setFirstName(evt.target.value);
                            }} value={this.state.firstName}/>
                          </div>
                          <div className="form-group">
                              <label for="lastName">Last Name:</label>
                              <input type="text" className="form-control" id="lastName" placeholder="Last Name"
                              onChange={(evt) => {
                              this.setLastName(evt.target.value);
                            }} value={this.state.lastName}/>
                          </div>
                          <div className="form-group">
                              <label for="email">Email:</label>
                              <input type="text" className="form-control" id="email" placeholder="Email"
                              onChange={(evt) => {
                              this.setEmail(evt.target.value);
                            }} value={this.state.email}/>
                          </div>
                          <div className="form-group">
                              <label for="password">Password:</label>
                              <input type="password" className="form-control" id="password" placeholder="Password"
                              onChange={(evt) => {
                              this.setPassword(evt.target.value);
                            }} value={this.state.password}/>
                          </div>
                          <div className="form-group">
                              <label for="company">Company:</label>
                              <input type="text" className="form-control" id="email" placeholder="Company"
                              onChange={(evt) => {
                              this.setCompany(evt.target.value);
                            }} value={this.state.company}/>
                          </div>
                          <div className="form-group">
                           <button type="submit" className="btn btn-primary btn-block createAccountButton"onClick={(evt) => {
                                    this.createAccount();
                                }}>Create Account</button>
                            </div>

                      </div>
                      <div style={styles.globalInputContainer}>
                        <CodeDataRenderer service={this}  config={this.buildGlobalInputConfig()} level="H" size="300" showControl={false}/>
                        <div style={styles.globalInputText}>Powered by <a href="https://globalinput.co.uk/">Global Input Software</a></div>
                      </div>
                  </div>


       </div>

        <ModalDialog message={this.state.modalMessage}/>


    </div>
  );
}

renderAccountCreated(){
  return (


    <div>
        <AppHeader selected="home"/>
          <div style={AppHeader.styles.content}>
                     <div style={styles.contentContainer}>
                          <div style={styles.contentContainer}>
                              <div style={styles.formContainer}>
                                  <div style={styles.title}>{textValues.signup.welcome.title}</div>
                                  <div className="content">
                                        {textValues.signup.welcome.content[0]}   <a href="/">{textValues.signup.welcome.content[1]}</a>
                                        {textValues.signup.welcome.content[2]}
                                  </div>
                              </div>
                          </div>
                    </div>
          </div>

    </div>
  );
}
        render(){
        if(this.state.loading){
          return (
            <LoadingScreen/>
          );
        }
        else if(this.state.created){
            return this.renderAccountCreated();
        }
        else{

          return this.renderForm();
        }


    }

}
