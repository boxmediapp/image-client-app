import React, {Component} from 'react'
import {CodeDataRenderer} from "global-input-react";
import {genericUtil} from "../utils";


import {api} from "../api";
import {textValues, config} from "../configs";
import {styles} from './styles';


import {BigButton,ModalDialog,AppHeader} from "../components";
import {appdata} from "../store";

var USER_ACTION={
     VERIFY_ORIGINAL_PASSWORD:0,
     SHOW_USER_DETAILS:1,
     UPDATE_FIRST_NAME:2,
     UPDATE_LAST_NAME:3,
     UPDATE_EMAIL:4,
     UPDATE_PASSWORD:5,
     UPDATE_COMPANY:6
}
export default class AccountView extends Component{

  constructor(props){
    super(props);
    this.state={
        password:"",
        firstName:"",
        lastName:"",
        email:"",
        company:"",
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
  setLastName(lastName){
         this.setState(Object.assign({}, this.state,{lastName}));
  }
  setEmail(email){
         this.setState(Object.assign({}, this.state,{email}));
  }
  setCompany(company){
         this.setState(Object.assign({}, this.state,{company}));
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
                  action:"UPDATE_USER_ACCOUNT",
                  firstName:this.state.firstName
              }).then(success=>{
                var userAccount=Object.assign({}, this.state.userAccount,{firstName:this.state.firstName});
                this.startSelectDataItemToModify(userAccount);
              }).catch(error=>{
                  this.setErrorMessage(textValues.account.modifyFirstName.error+":"+error);
              });
        }
  }
  updateLastName(){
        if(this.state.lastName){
              api.updateUserAccount({
                  action:"UPDATE_USER_ACCOUNT",
                  lastName:this.state.lastName

              }).then(success=>{
                var userAccount=Object.assign({}, this.state.userAccount,{lastName:this.state.lastName});
                this.startSelectDataItemToModify(userAccount);
              }).catch(error=>{
                  this.setErrorMessage(textValues.account.modifyLastName.error+":"+error);
              });
        }
  }
  updateEmail(){
        if(this.state.email){
              api.updateUserAccount({
                  action:"UPDATE_USER_ACCOUNT",
                  email:this.state.email
              }).then(success=>{
                var userAccount=Object.assign({}, this.state.userAccount,{email:this.state.email});
                this.startSelectDataItemToModify(userAccount);
              }).catch(error=>{
                  this.setErrorMessage(textValues.account.modifyEmail.error+":"+error);
              });
        }
  }
  updatePassword(){
        if(this.state.password && this.state.password.length>3){
              api.updateUserAccount({
                  action:"UPDATE_USER_ACCOUNT",
                  password:this.state.password
              }).then(success=>{
                var userAccount=Object.assign({}, this.state.userAccount,{password:this.state.password});
                this.startSelectDataItemToModify(userAccount);
              }).catch(error=>{
                  this.setErrorMessage(textValues.account.modifyPassword.error+":"+error);
              });
        }
  }
  updateCompany(){
        if(this.state.company){
              api.updateUserAccount({
                  action:"UPDATE_USER_ACCOUNT",
                  company:this.state.company
              }).then(success=>{
                var userAccount=Object.assign({}, this.state.userAccount,{company:this.state.company});
                this.startSelectDataItemToModify(userAccount);
              }).catch(error=>{
                  this.setErrorMessage(textValues.account.modifyCompany.error+":"+error);
              });
        }
  }
  onClearMessage(){
    this.setState(Object.assign({}, this.state,{modalMessage:null}));
  }

  startSelectDataItemToModify(userAccount){
       this.setState(Object.assign({}, this.state,{userAccount,action:USER_ACTION.SHOW_USER_DETAILS}));
       var initData={
                  action:"input",
                  dataType:"select",
                  form:{
                        title:textValues.account.selectDataToModify.title,
                        fields:[{
                           label:textValues.account.selectDataToModify.firstName.label,
                           type:"button",
                           operations:{
                                   onInput:this.startUpdateFirstname.bind(this)
                           }

                         },{
                            label:textValues.account.selectDataToModify.lastName.label,
                            type:"button",
                            operations:{
                                    onInput:this.startUpdateLastname.bind(this)
                            }

                          },{
                             label:textValues.account.selectDataToModify.email.label,
                             type:"button",
                             operations:{
                                     onInput:this.startUpdateEmail.bind(this)
                             }

                           },{
                              label:textValues.account.selectDataToModify.password.label,
                              type:"button",
                              operations:{
                                      onInput:this.startUpdatePassword.bind(this)
                              }

                            },{
                               label:textValues.account.selectDataToModify.company.label,
                               type:"button",
                               operations:{
                                       onInput:this.startUpdateCompany.bind(this)
                               }

                             }]
                   }

       };
       this.initGlobalInput(initData);
  }
  initGlobalInput(initData){
      if(this.globalInput && this.globalInput.connector){
              this.globalInput.connector.sendInitData(initData) ;
      }
      else{
              console.log("Not connected");
      }
  }

  verifyOriginalPassword(){
          api.updateUserAccount({action:"VERIFY_PASSWORD",
          password:this.state.password}).then(
              result=>{
                if(result.error || (!result.username)){
                      this.setErrorMessage(textValues.account.originalPasswordVerify.verification.error+":"+result.error);
                      return;
                }
                this.startSelectDataItemToModify(result);
              }
          ).catch(error=>{
              this.setErrorMessage(textValues.account.originalPasswordVerify.verification.error+":"+error);
          });
  }

  startUpdateFirstname(){
      var firstName=this.state.userAccount.firstName;
      this.setState(Object.assign({}, this.state,{firstName,action:USER_ACTION.UPDATE_FIRST_NAME}));
      var initData={
                  action:"input",
                  dataType:"form",
                  form:{
                          id: this.state.userAccount.username+"@"+config.appid,
                          title:textValues.account.modifyFirstName.title,
                          fields:[{
                              id:"firstName",
                              label:textValues.account.modifyFirstName.label,
                              value:firstName,
                              operations:{
                                      onInput:this.setFirstName.bind(this)
                              }
                           },{
                             label:"Update",
                             type:"button",
                             operations:{
                                     onInput:this.updateFirstName.bind(this)
                             }

                           },{
                             label:"Cancel",
                             type:"button",
                             operations:{
                                     onInput:this.startSelectDataItemToModify.bind(this)
                             }

                           }]
                     }

       };
       this.initGlobalInput(initData);
  }
  startUpdateLastname(){
    var lastName=this.state.userAccount.lastName;
    this.setState(Object.assign({}, this.state,{lastName,action:USER_ACTION.UPDATE_LAST_NAME}));
    var initData={
                action:"input",
                dataType:"form",
                form:{
                        id: this.state.userAccount.username+"@"+config.appid,
                        title:textValues.account.modifyLastName.title,
                        fields:[{
                            id:"lastName",
                            label:textValues.account.modifyLastName.label,
                            value:lastName,
                            operations:{
                                    onInput:this.setLastName.bind(this)
                            }
                         },{
                           label:"Update",
                           type:"button",
                           operations:{
                                   onInput:this.updateLastName.bind(this)
                           }

                         },{
                              label:"Cancel",
                              type:"button",
                              operations:{
                                    onInput:this.startSelectDataItemToModify.bind(this)
                              }

                         }]
                   }

     };
     this.initGlobalInput(initData);
 }
startUpdateEmail(){
  var email=this.state.userAccount.email;
  this.setState(Object.assign({}, this.state,{email,action:USER_ACTION.UPDATE_EMAIL}));
  var initData={
              action:"input",
              dataType:"form",
              form:{
                      id: this.state.userAccount.username+"@"+config.appid,
                      title:textValues.account.modifyEmail.title,
                      fields:[{
                          id:"email",
                          label:textValues.account.modifyEmail.label,
                          value:email,
                          operations:{
                                  onInput:this.setEmail.bind(this)
                          }
                       },{
                         label:"Update",
                         type:"button",
                         operations:{
                                 onInput:this.updateEmail.bind(this)
                         }

                       },{
                            label:"Cancel",
                            type:"button",
                            operations:{
                                  onInput:this.startSelectDataItemToModify.bind(this)
                            }

                       }]
                 }

   };
   this.initGlobalInput(initData);
}

startUpdatePassword(){
  var password=this.state.password;
  this.setState(Object.assign({}, this.state,{password,action:USER_ACTION.UPDATE_PASSWORD}));
  var initData={
              action:"input",
              dataType:"form",
              form:{
                      id: this.state.userAccount.username+"@"+config.appid,
                      title:textValues.account.modifyPassword.title,
                      fields:[{
                          id:"password",
                          label:textValues.account.modifyPassword.label,
                          type:"secret",
                          value:password,
                          operations:{
                                  onInput:this.setPassword.bind(this)
                          }
                       },{
                         label:"Update",
                         type:"button",
                         operations:{
                                 onInput:this.updatePassword.bind(this)
                         }

                       },{
                            label:"Cancel",
                            type:"button",
                            operations:{
                                  onInput:this.startSelectDataItemToModify.bind(this)
                            }

                       }]
                 }

   };
   this.initGlobalInput(initData);
}


startUpdateCompany(){
  var company=this.state.userAccount.company;
  this.setState(Object.assign({}, this.state,{company,action:USER_ACTION.UPDATE_COMPANY}));
  var initData={
              action:"input",
              dataType:"form",
              form:{
                      id: this.state.userAccount.username+"@"+config.appid,
                      title:textValues.account.modifyCompany.title,
                      fields:[{
                          id:"company",
                          label:textValues.account.modifyCompany.label,
                          value:company,
                          operations:{
                                  onInput:this.setCompany.bind(this)
                          }
                       },{
                         label:"Update",
                         type:"button",
                         operations:{
                                 onInput:this.updateCompany.bind(this)
                         }

                       },{
                            label:"Cancel",
                            type:"button",
                            operations:{
                                  onInput:this.startSelectDataItemToModify.bind(this)
                            }

                       }]
                 }

   };
   this.initGlobalInput(initData);
}




  renderUpdateFirstNameForm(){
      return(
        <div style={styles.contentContainer}>
                  <div style={styles.formContainer}>
                      <div style={styles.title}>{textValues.account.modifyFirstName.title}</div>

                      <div className="form-group">
                          <label htmlFor="firstName">{textValues.account.modifyFirstName.label}:</label>
                          <input type="text" className="form-control" id="firstName"
                              placeholder={textValues.account.modifyFirstName.placeHolder}
                          onChange={(evt) => {
                          this.setFirstName(evt.target.value);
                        }} value={this.state.firstName}/>
                      </div>

                      <div className="form-group">
                       <button type="submit" className="btn btn-primary btn-block createAccountButton"
                            onClick={(evt) => {
                                this.updateFirstName();
                            }}>Update</button>
                        </div>

                  </div>
            </div>
      );
  }
  renderUpdateLastNameForm(){
      return(
        <div style={styles.contentContainer}>
                  <div style={styles.formContainer}>
                      <div style={styles.title}>{textValues.account.modifyLastName.title}</div>

                      <div className="form-group">
                          <label htmlFor="lastName">{textValues.account.modifyLastName.label}:</label>
                          <input type="text" className="form-control" id="lastName"
                              placeholder={textValues.account.modifyLastName.placeHolder}
                          onChange={(evt) => {
                          this.setLastName(evt.target.value);
                        }} value={this.state.lastName}/>
                      </div>

                      <div className="form-group">
                       <button type="submit" className="btn btn-primary btn-block createAccountButton"
                           onClick={(evt) => {
                                this.updateLastName();
                            }}>Update</button>
                        </div>

                  </div>
            </div>
      );
  }

  renderUpdateEmailForm(){
      return(
        <div style={styles.contentContainer}>
                  <div style={styles.formContainer}>
                      <div style={styles.title}>{textValues.account.modifyEmail.title}</div>

                      <div className="form-group">
                          <label htmlFor="email">{textValues.account.modifyEmail.label}:</label>
                          <input type="text" className="form-control" id="email"
                              placeholder={textValues.account.modifyEmail.placeHolder}
                          onChange={(evt) => {
                          this.setEmail(evt.target.value);
                        }} value={this.state.email}/>
                      </div>

                      <div className="form-group">
                       <button type="submit" className="btn btn-primary btn-block createAccountButton"
                         onClick={(evt) => {
                                this.updateEmail();
                            }}>Update</button>
                        </div>

                  </div>
            </div>
      );
  }
  renderUpdatePasswordForm(){
      return(
        <div style={styles.contentContainer}>
                  <div style={styles.formContainer}>
                      <div style={styles.title}>{textValues.account.modifyPassword.title}</div>

                      <div className="form-group">
                          <label htmlFor="password">{textValues.account.modifyPassword.label}:</label>
                          <input type="password" className="form-control" id="password"
                              placeholder={textValues.account.modifyPassword.placeHolder}
                          onChange={(evt) => {
                          this.setPassword(evt.target.value);
                        }} value={this.state.password}/>
                      </div>

                      <div className="form-group">
                       <button type="submit" className="btn btn-primary btn-block createAccountButton" onClick={(evt) => {
                                this.updatePassword();
                            }}>Update</button>
                        </div>

                  </div>
            </div>
      );
  }

  renderUpdateCompanyForm(){
      return(
        <div style={styles.contentContainer}>
                  <div style={styles.formContainer}>
                      <div style={styles.title}>{textValues.account.modifyCompany.title}</div>

                      <div className="form-group">
                          <label htmlFor="company">{textValues.account.modifyCompany.label}:</label>
                          <input type="text" className="form-control" id="company"
                              placeholder={textValues.account.modifyCompany.placeHolder}
                          onChange={(evt) => {
                          this.setEmail(evt.target.value);
                        }} value={this.state.company}/>
                      </div>

                      <div className="form-group">
                       <button type="submit" className="btn btn-primary btn-block createAccountButton"
                         onClick={(evt) => {
                                this.updateCompany();
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
              <div style={styles.listContainer}>
                   <div style={styles.detailsRow}>
                        <div style={styles.detailsLabel}> First Name:</div>
                        <div style={styles.detailsValue}>{userAccount.firstName}</div>
                        <div style={styles.controlButton}>
                                <a className="btn btn-primary btn-normal mediaButton"
                                      onClick={ evt=> this.startUpdateFirstname()}>Modify</a>
                        </div>
                  </div>

                  <div style={styles.detailsRow}>
                       <div style={styles.detailsLabel}> Last Name:</div>
                       <div style={styles.detailsValue}>{userAccount.lastName}</div>
                       <div style={styles.controlButton}>
                               <a className="btn btn-primary btn-normal mediaButton"
                                     onClick={ evt=> this.startUpdateLastname()}>Modify</a>
                       </div>
                 </div>

                 <div style={styles.detailsRow}>
                      <div style={styles.detailsLabel}> Email:</div>
                      <div style={styles.detailsValue}>{userAccount.email}</div>
                      <div style={styles.controlButton}>
                              <a className="btn btn-primary btn-normal mediaButton"
                                    onClick={ evt=> this.startUpdateEmail()}>Modify</a>
                      </div>
                 </div>
                 <div style={styles.detailsRow}>
                      <div style={styles.detailsLabel}>Password:</div>
                      <div style={styles.detailsValue}>*********</div>
                      <div style={styles.controlButton}>
                              <a className="btn btn-primary btn-normal mediaButton"
                                    onClick={ evt=> this.startUpdatePassword()}>Change Password</a>
                      </div>
                 </div>

                 <div style={styles.detailsRow}>
                      <div style={styles.detailsLabel}> Company:</div>
                      <div style={styles.detailsValue}>{userAccount.company}</div>
                      <div style={styles.controlButton}>
                              <a className="btn btn-primary btn-normal mediaButton"
                                    onClick={ evt=> this.startUpdateCompany()}>Modify</a>
                      </div>
                 </div>
           </div>
     </div>
    );



  }

  renderOriginalPasswordVerificationForm(){
    var userinfo=appdata.getUserInfo();
    var globalInputConfig={
                  url:config.url,
                  apikey:config.apikey,
                  securityGroup:config.securityGroup,
                  initData:{
                        action:"input",
                        dataType:"verify",
                        form:{
                              id: userinfo.username+"@"+config.appid,
                              title:textValues.account.originalPasswordVerify.title,
                              label:"ImageApp",
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


      return (

                <div style={styles.contentContainer}>
                          <div style={styles.formContainer}>
                              <div style={styles.title}>{textValues.account.originalPasswordVerify.title}</div>

                              <div className="form-group">
                                  <label htmlFor="password">Password:</label>
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
                            <CodeDataRenderer service={this}  config={globalInputConfig} level="H" size="300" showControl={false}/>
                            <div style={styles.globalInputText}>Powered by <a href="https://globalinput.co.uk/">Global Input Software</a></div>
                          </div>
            </div>








      );


  }
  renderContent(){
    if(this.state.action===USER_ACTION.SHOW_USER_DETAILS){
          return this.renderUserDetailsForm();
    }
    else if(this.state.action===USER_ACTION.UPDATE_FIRST_NAME){
          return this.renderUpdateFirstNameForm();
    }
    else if(this.state.action===USER_ACTION.UPDATE_LAST_NAME){
          return this.renderUpdateLastNameForm();
    }
    else if(this.state.action===USER_ACTION.UPDATE_EMAIL){
          return this.renderUpdateEmailForm();
    }
    else if(this.state.action===USER_ACTION.UPDATE_PASSWORD){
          return this.renderUpdatePasswordForm();
    }
    else if(this.state.action===USER_ACTION.UPDATE_COMPANY){
          return this.renderUpdateCompanyForm();
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
