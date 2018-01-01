import React, {Component} from 'react'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'


import "fixed-data-table-2/dist/fixed-data-table.min.css";

import {textValues,config} from "../configs";
import {api} from "../../api";
import {styles} from "./styles";
import ReactMarkdown from "react-markdown";
import {AppHeader} from "../app-header";

export  default class ApiAccessDocumentationView extends Component {

      constructor(props){
        super(props);
        this.state={userAccount:{
              clientId:"",clientSecret:""
        }};
      }
      componentWillMount(){
        this.loadUserAccountData();
      }
      loadUserAccountData(){
        api.getUserAccount().then(userAccount=>{
              this.setUserAccount(userAccount);

        }).catch(error=>{
            console.error("Failed to get the user account details:"+error);
        });

      }
      setUserAccount(userAccount){
        this.setState(Object.assign({}, this.state,{userAccount}));
      }

      regenerateSecret(){

        api.updateUserAccount({action:"REGENERATE_CLIENT_SECRET"}).then(
            userAccount=>{
              this.setUserAccount(userAccount);
            }
        ).catch(error=>{
            console.error("Failed to update the user account details:"+error);
        })

      }
      render(){
          var {userAccount}=this.state;
          var serviceEnpoint=config.api.getUrl(api.clientImagePath);
        return (

             <div>
                  <AppHeader selected="apiAccessHelp"/>
                  <div style={AppHeader.styles.content}>
                             <div style={styles.contentContainer}>
                                          <div className="content">
                                                  <div style={styles.title}> {textValues.apiAccessHelp.content.title} </div>
                                                  <DisplayContent content={textValues.apiAccessHelp.content.p1}/>
                                                  <div style={styles.detailsRow}>
                                                      <div style={styles.detailsLabel}> Client id:</div>
                                                      <div style={styles.detailsValue}>{userAccount.clientId}</div>
                                                  </div>
                                                  <div style={styles.detailsRow}>
                                                      <div style={styles.detailsLabel}> Client secret:</div>
                                                      <div style={styles.detailsValue}>{userAccount.clientSecret}</div>
                                                      <div style={styles.controlButton}>
                                                          <a className="btn btn-primary btn-normal mediaButton"
                                                          onClick={ evt=> this.regenerateSecret()}>Regenerate secret</a>
                                                      </div>
                                                  </div>
                                                  <div style={styles.detailsRow}>
                                                      <div style={styles.detailsLabel}>Service End point:</div>
                                                      <div style={styles.detailsValue}>{serviceEnpoint}</div>
                                                  </div>
                                                  <div style={styles.detailsRow}>
                                                      <div style={styles.detailsLabel}>Accepted parameters:</div>
                                                      <div style={styles.detailsValue}>ProgrammeNumber, search</div>
                                                  </div>

                                          </div>
                            </div>
                  </div>

              </div>

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
