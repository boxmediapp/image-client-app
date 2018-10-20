import React, {Component} from 'react'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import {api} from "../api";
import "fixed-data-table-2/dist/fixed-data-table.min.css";

import {textValues} from "./configs";
import {ModalDialog,LoadingIcon} from "../components";
import {AppHeader} from "./app-header";
import {appdata,store} from "../store";
import {styles} from "./styles";
import ReactMarkdown from "react-markdown";

export  default class DisplayTAndC extends Component {
      constructor(props){
        super(props);
        this.state={accepted:false,modalMessage:null};
      }
      setErrorMessage(message){
        var modalMessage={
               title:textValues.tc.checkbox.error.title,
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


      toggleAccepted(){
        var accepted=!this.state.accepted;
        this.setState(Object.assign({}, this.state,{accepted}));
      }
      confirmAccept(){
            if(!this.state.accepted){
              this.setErrorMessage(textValues.tc.checkbox.error.content);
            }
            else{
                  this.setState(Object.assign({}, this.state,{loading:true}));
                  var userStatus="accepted";
                  var userAccount={
                      userStatus
                  }
                  api.updateUserAccount(userAccount).then(()=>{
                      this.setState(Object.assign({}, this.state,{loading:true,userStatus}));
                      this.props.onAcceptTC();
                  }).catch(error=>{
                      this.props.onAcceptTC();

                      this.setState(Object.assign({}, this.state,{loading:false}));
                      this.setErrorMessage("Error in connecting to the server:"+error);

                  });
            }
      }
      render(){


        return (
          <Router>
             <div>
                  <AppHeader selected="home"/>
                  <div style={AppHeader.styles.content}>
                             <div style={styles.contentContainer}>
                                          <div className="content">
                                                  <div style={styles.title}> {textValues.tc.title} </div>
                                                  <DisplayContent content={textValues.tc.content.p1}/>
                                                  <div style={styles.checkboxContainer}>
                                                      <input
                                                        type="checkbox"
                                                        checked={this.state.accepted}
                                                        onClick={this.toggleAccepted.bind(this)}
                                                        style={styles.checkbox}
                                                        />
                                                        <span style={styles.checkboxtext}>{textValues.tc.checkbox.p1}{textValues.tc.checkbox.p2}</span>
                                                  </div>
                                                  <DisplaySubmitButton confirmAccept={this.confirmAccept.bind(this)}/>
                                          </div>
                            </div>
                  </div>
                  <ModalDialog message={this.state.modalMessage}/>
              </div>
          </Router>
        );
      }


}

class DisplayContent extends Component{
  renderParagraph(content, index){
      return (<div key={index}>
          <ReactMarkdown source={content}/>
        </div>)


  }
  render(){
    return this.props.content.map(this.renderParagraph);
  }
}

class DisplaySubmitButton extends Component{

    render(){
      if(this.props.loading){
          return(<LoadingIcon/>);
      }
      else{
        return(<button type="submit" className="btn btn-primary btn-normal"onClick={(evt) => {
                 this.props.confirmAccept();
             }}>Send Confirmation</button>
           );
      }

    }

}
