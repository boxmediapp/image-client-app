import React, {Component} from 'react'
import {CodeDataRenderer} from "global-input-react";
import {genericUtil} from "../../utils";


import {api} from "../api";
import {textValues, config} from "../configs";
import {styles} from './styles';

import {AppHeader} from "../app-header";
import {BigButton,ModalDialog} from "../../components";
import {appdata} from "../../store";

var USER_ACTION={
     VERIFY_ORIGINAL_PASSWORD:0,
     SHOW_USER_DETAILS:1,
     MODIFY_FIRST_NAME:2
}
export default class AccountView extends Component{

  constructor(props){
    super(props);
    this.state={
        password:"",
        firstName:"",
        action:USER_ACTION.VERIFY_ORIGINAL_PASSWORD,
        modalMessage:null,
        userAccount:{}
    };
  }
  setPassword(password){
         this.setState(Object.assign({}, this.state,{password}));
  }
  setFirstName(firstName){
         this.setState(Object.assign({}, this.state,{firstName}));
  }
  setErrorMessage(message){
    var modalMessage={
           title:textValues.signup.error.title,
           content:message,
           onConfirm:this.onClearMessage.bind(this),
           confirmButton:"Ok"
    }
    this.setState(Object.assign({}, this.state,{modalMessage}));
  }
  updateFirstName(){
        if(this.state.firstName){
              api.updateUserAccount({
                  firstName:this.state.firstName
              }).then(success=>{
                var userAccount=Object.assign({}, this.state.userAccount,{firstName:this.state.firstName});
                this.setState(Object.assign({}, this.state,{action:USER_ACTION.SHOW_USER_DETAILS,userAccount}));
                if(this.globalInput && this.globalInput.connector){
                      var initData=this.buildSelectDataGlobalInputConfig();
                        this.globalInput.connector.sendInitData(initData);
                }
                else{
                  console.log("No connector");
                }

              }).catch(error=>{
                  this.setErrorMessage(textValues.account.modifyFirstName.error+":"+error);
              });
        }
  }

  onClearMessage(){
    this.setState(Object.assign({}, this.state,{modalMessage:null}));
  }



  verifyOriginalPassword(){
    api.updateUserAccount({action:"VERIFY_PASSWORD",
    password:this.state.password}).then(
        result=>{
          if(result.error || (!result.username)){
                this.setErrorMessage(textValues.account.originalPasswordVerify.verification.error+":"+result.error);
                return;
          }
          else{
              var userAccount=result;
              this.setState(Object.assign({}, this.state,{userAccount,action:USER_ACTION.SHOW_USER_DETAILS}));
              if(this.globalInput && this.globalInput.connector){
                      var initData=this.buildSelectDataGlobalInputConfig();
                      this.globalInput.connector.sendInitData(initData);
              }
              else{
                console.log("No connector");
              }
          }

        }
    ).catch(error=>{
        console.error("Failed to update the user account details:"+error);
    })


  }

  startModifyFirstname(){
      console.log("***modify first name:");
      var firstName=this.state.userAccount.firstName;
      this.setState(Object.assign({}, this.state,{firstName,action:USER_ACTION.MODIFY_FIRST_NAME}));
      if(this.globalInput && this.globalInput.connector){
            var initData=this.buildModifyFirstNamelobalInputConfig(firstName);
              this.globalInput.connector.sendInitData(initData);
      }
      else{
        console.log("No connector");
      }
  }
  buildVerifyGlobalInputConfig(){
    var userinfo=appdata.getUserInfo();
    return {
            url:config.url,
            apikey:config.apikey,
            securityGroup:config.securityGroup,
            initData:{
                  action:"input",
                  dataType:"verify",
                  form:{
                        id: userinfo.username+"@"+window.location.host,
                        title:"Verfiy Original Password",
                        label:"Image App Account",
                        fields:[{
                            id:"password",
                            label:"Password",
                            type:"secret",
                            operations:{
                                    onInput:this.setPassword.bind(this)
                            }
                         },{
                           label:"Verify",
                           type:"button",
                           operations:{
                                   onInput:this.verifyOriginalPassword.bind(this)
                           }

                         }]
                   }
              }
     };

  }
  buildSelectDataGlobalInputConfig(){
    var userinfo=appdata.getUserInfo();
    return {
                  action:"input",
                  dataType:"select",
                  form:{
                        title:"Select data to modify",
                        fields:[{
                           label:"First Name",
                           type:"button",
                           operations:{
                                   onInput:this.startModifyFirstname.bind(this)
                           }

                         },{
                            label:"Last Name",
                            type:"button",
                            operations:{
                                    onInput:this.startModifyFirstname.bind(this)
                            }

                          }]
                   }

     };

  }

  buildModifyFirstNamelobalInputConfig(firstName){

    return {
                action:"input",
                dataType:"form",
                form:{
                        id: this.state.userAccount.username+"@"+window.location.host,
                        title:"Modifying First Name",
                        fields:[{
                            id:"firstName",
                            label:"First Name",
                            operations:{
                                    onInput:this.setFirstName.bind(this)
                            }
                         },{
                           label:"Update",
                           type:"button",
                           operations:{
                                   onInput:this.updateFirstName.bind(this)
                           }

                         }]
                   }

     };

  }
  renderModifyFirstNameForm(){
      return(
        <div style={styles.contentContainer}>
                  <div style={styles.formContainer}>
                      <div style={styles.title}>{textValues.account.modifyFirstName.title}</div>

                      <div className="form-group">
                          <label htmlFor="firstName">First Name:</label>
                          <input type="text" className="form-control" id="firstName" placeholder="First Name"
                          onChange={(evt) => {
                          this.setFirstName(evt.target.value);
                        }} value={this.state.firstName}/>
                      </div>

                      <div className="form-group">
                       <button type="submit" className="btn btn-primary btn-block createAccountButton"onClick={(evt) => {
                                this.modifyFirstName();
                            }}>Update</button>
                        </div>

                  </div>
            </div>
      );
  }
  renderUserDetailsForm(){
    var userAccount=this.state.userAccount;

    return (
      <div style={styles.formContainer}>
          <div style={styles.title}>User Details for {userAccount.username}</div>

         <div style={styles.detailsRow}>
              <div style={styles.detailsLabel}> First Name:</div>
              <div style={styles.detailsValue}>{userAccount.firstName}</div>
              <div style={styles.controlButton}>
                      <a className="btn btn-primary btn-normal mediaButton"
                            onClick={ evt=> this.startModifyFirstname()}>Modify</a>
              </div>
        </div>



             <div className="form-group">
                 Last Name: {userAccount.lastName}
             </div>
             <div className="form-group">
                 Email:{userAccount.email}
             </div>
             <div className="form-group">
                 password
             </div>
             <div className="form-group">
            Company:{userAccount.company}
             </div>

     </div>
    );



  }

  renderOriginalPasswordVerificationForm(){

      return (

                <div style={styles.contentContainer}>
                          <div style={styles.formContainer}>
                              <div style={styles.title}>{textValues.account.originalPasswordVerify.title}</div>

                              <div className="form-group">
                                  <label htmlFor="password">Original Password:</label>
                                  <input type="password" className="form-control" id="password" placeholder="Password"
                                  onChange={(evt) => {
                                  this.setPassword(evt.target.value);
                                }} value={this.state.password}/>
                              </div>

                              <div className="form-group">
                               <button type="submit" className="btn btn-primary btn-block createAccountButton"onClick={(evt) => {
                                        this.verifyOriginalPassword();
                                    }}>Verify</button>
                                </div>

                          </div>
                          <div style={styles.globalInputContainer}>
                            <CodeDataRenderer service={this}  config={this.buildVerifyGlobalInputConfig()} level="H" size="300" showControl={false}/>
                            <div style={styles.globalInputText}>Powered by <a href="https://globalinput.co.uk/">Global Input Software</a></div>
                          </div>
            </div>








      );


  }
  renderContent(){
    if(this.state.action===USER_ACTION.SHOW_USER_DETAILS){
          return this.renderUserDetailsForm();
    }
    else if(this.state.action===USER_ACTION.MODIFY_FIRST_NAME){
          return this.renderModifyFirstNameForm();
    }
    else{
        return this.renderOriginalPasswordVerificationForm();
    }

  }
  render(){
      return (
        <div>
          <AppHeader selected="account"/>
            <div style={AppHeader.styles.content}>
               {this.renderContent()}
            </div>
            <ModalDialog message={this.state.modalMessage}/>
        </div>
      );

  }

}
