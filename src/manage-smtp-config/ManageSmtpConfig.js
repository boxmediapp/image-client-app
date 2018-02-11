import React, {Component} from 'react'
import {api} from "../api";

import {ModalDialog,AppHeader} from "../components";
import {styles} from "./styles";
import {textValues} from "../configs";

var RENDER_ACTION={
  LOADING:0,
  LOADED:1
}
export  default class ManageSmtpConfig extends Component {

  constructor(props){
          super(props);
          this.state={modalMessage:null,renderAction:RENDER_ACTION.LOADING,smtpConfig:this.buildSmtp() }
  }
  buildSmtp(smtpConfig){

    if(!smtpConfig){
      smtpConfig={};
    }
    if(!smtpConfig.smtpHost){
      smtpConfig.smtpHost="";
    }
    if(!smtpConfig.smtpPort){
      smtpConfig.smtpPort="";
    }
    if(!smtpConfig.username){
      smtpConfig.username="";
    }
    if(!smtpConfig.password){
      smtpConfig.password="";
    }
    if(!smtpConfig.fromEmailAddress){
      smtpConfig.fromEmailAddress="";
    }
    if(!smtpConfig.fromName){
      smtpConfig.fromName="";
    }
    if(!smtpConfig.accountAdmins){
      smtpConfig.accountAdmins="";
    }
    if(!smtpConfig.accountAdmins){
      smtpConfig.accountAdmins="";
    }
return smtpConfig;

  }
  componentWillMount(){
      this.loadSMTPConfig();
  }
  setSMTPConfig(configname, configvalue){
    var smtpConfig=Object.assign({},this.state.smtpConfig);
    smtpConfig[configname]=configvalue;
    this.setState({modalMessage:null,renderAction:RENDER_ACTION.LOADING,smtpConfig});
  }


  loadSMTPConfig(){
      api.getSMTPConfig().then(smtpConfig=>{
            console.log("smtpConfig:"+JSON.stringify(smtpConfig));
            this.setState({modalMessage:null,renderAction:RENDER_ACTION.LOADED,smtpConfig:this.buildSmtp(smtpConfig)});
      }).catch(error=>{
            var modalMessage={
                   title:textValues.manageSMTPConfig.loadingError.title,
                   content:"Error"+error,
                   onConfirm:()=>{
                          this.setState({modalMessage:null,renderAction:RENDER_ACTION.LOADED,smtpConfig:{}});
                   },
                   confirmButton:"Ok"
            }
            this.setState({modalMessage,renderAction:RENDER_ACTION.LOADING,smtpConfig:{}});
      });
  }
  updateSMTPConfig(){
      api.updateSMTPConfig(this.state.smtpConfig).then(response=>{
           var modalMessage={
               title:textValues.manageSMTPConfig.updateSucess.title,
               content:textValues.manageSMTPConfig.updateSucess.content,
               onConfirm:()=>{
                      this.setState({modalMessage:null,renderAction:RENDER_ACTION.LOADED,smtpConfig:this.state.smtpConfig});
               },
               confirmButton:"Ok"
           }
           this.setState({modalMessage,renderAction:RENDER_ACTION.LOADING,smtpConfig:this.state.smtpConfig});
      }).catch(error=>{
        var modalMessage={
               title:textValues.manageSMTPConfig.updateError.title,
               content:"Error"+error,
               onConfirm:()=>{
                      this.setState({modalMessage:null,renderAction:RENDER_ACTION.LOADED,smtpConfig:this.state.smtpConfig});
               },
               confirmButton:"Ok"
        }
        this.setState({modalMessage,renderAction:RENDER_ACTION.LOADING,smtpConfig:this.state.smtpConfig});
      })
  }

  render(){
    console.log(":::::before render:"+JSON.stringify(this.state.smtpConfig));
    return (
      <div>
          <AppHeader selected="admin"/>

          <div style={AppHeader.styles.content}>
                     <div style={styles.contentContainer}>
                        <div style={styles.formContainer}>
                            <div style={styles.title}>SMTP Configuration</div>
                            <div className="form-group">
                                <label htmlFor="smtpHost">SMTP Host:</label>
                                <input type="text" className="form-control" id="smtpHost" placeholder="SMTP Host"
                                onChange={(evt) => {
                                this.setSMTPConfig("smtpHost",evt.target.value);
                              }} value={this.state.smtpConfig.smtpHost}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="smtpPort">SMTP Port:</label>
                                <input type="text" className="form-control" id="smtpPort" placeholder="SMTP Port"
                                onChange={(evt) => {
                                this.setSMTPConfig("smtpPort",evt.target.value);

                              }} value={this.state.smtpConfig.smtpPort}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">SMTP Username:</label>
                                <input type="text" className="form-control" id="username" placeholder="SMTP Username"
                                onChange={(evt) => {
                                  this.setSMTPConfig("username",evt.target.value);

                              }} value={this.state.smtpConfig.username}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">SMTP Password:</label>
                                <input type="password" className="form-control" id="password" placeholder="SMTP Password"
                                onChange={(evt) => {
                                    this.setSMTPConfig("password",evt.target.value);

                              }} value={this.state.smtpConfig.password}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="fromEmailAddress">From Email Address:</label>
                                <input type="text" className="form-control" id="fromEmailAddress" placeholder="From Email Address"
                                onChange={(evt) => {
                                      this.setSMTPConfig("fromEmailAddress",evt.target.value);

                              }} value={this.state.smtpConfig.fromEmailAddress}/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="fromName">From Name:</label>
                                <input type="text" className="form-control" id="fromName" placeholder="From Name"
                                onChange={(evt) => {
                                      this.setSMTPConfig("fromName",evt.target.value);

                              }} value={this.state.smtpConfig.fromName}/>
                            </div>




                            <div className="form-group">
                                <label htmlFor="accountAdmins">Account Admins:</label>
                                <input type="text" className="form-control" id="accountAdmins" placeholder="Account Admin Email Addresses (comma separaed)"
                                onChange={(evt) => {
                                      this.setSMTPConfig("accountAdmins",evt.target.value);

                              }} value={this.state.smtpConfig.accountAdmins}/>
                            </div>

                            <div className="form-group">
                             <button type="submit" className="btn btn-primary btn-block createAccountButton"onClick={(evt) => {
                                      this.updateSMTPConfig();
                                  }}>Update</button>
                              </div>

                        </div>
                    </div>

         </div>
          <ModalDialog message={this.state.modalMessage}/>
      </div>
    );
  }


}
