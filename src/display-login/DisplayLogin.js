import React, {Component} from 'react'

import {AppLogin} from "../components";
import AppHeader from "./app-header/AppHeader"
import {textValues} from "../configs";

import  "./styles/DisplayLogin.css";
import {genericUtil} from "../utils";
import {styles} from "./styles";
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

  onLoginFail(error){
        this.setErrorMessage("Failed to sign in");
  }
    render() {
        return (
        <div>
          <AppHeader/>

                <div style={AppHeader.styles.content}>
                          <AppLogin onLoginFail={this.onLoginFail.bind(this)}/>
                          <SubscriptionLink/>
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


class SubscriptionLink extends Component{
  render(){
      return (
        <div className="content">
            <div   style={styles.subscription}>
                <a href={textValues.signup.link}>{textValues.signup.linkText}</a>
            </div>
        </div>

      )

  }
}
