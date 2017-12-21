import React, {Component} from 'react'

import {AppLogin,LoginAppHeader} from "../components";
import {textValues} from "../configs";

import  "./styles/DisplayLogin.css";
import {genericUtil} from "../utils";
export  default class DisplayLogin extends Component {
  constructor(props){
    super(props);
    this.state={message:null};
  }
  onClearMessage(){
    this.setState(Object.assign({}, this.state,{message:null}));
  }
  setErrorMessage(content){
     var message={
            title:"Error",
            content,
            onConfirm:this.onClearMessage.bind(this),
            confirmButton:"OK"
     }
     this.setState(Object.assign({}, this.state,{message}));
  }

  onLoginFail(){
        this.setErrorMessage("Login failed");
  }
    render() {
        return (
        <div>
          <LoginAppHeader/>

                <div style={LoginAppHeader.styles.content}>
                          <AppLogin onLoginFail={this.onLoginFail.bind(this)}/>
                          <DisplayMessage message={this.state.message}/>

                </div>
          </div>
                );

    }
  }
class DisplayMessage extends Component{
  render(){
    if(this.props.message!=null && this.props.message.content){
      return (
        <div className="content">
            <div className='errorMessage'>{this.props.message.content}</div>
        </div>

      )
    }
    else{
      return null;
    }
  }
}
