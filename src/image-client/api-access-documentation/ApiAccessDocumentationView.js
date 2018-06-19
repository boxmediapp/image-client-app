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

                                                  <DisplayContent content={textValues.apiAccessHelp.content.p2}/>

                                                  <div style={styles.detailsRow}>
                                                      <div style={styles.detailsLabel}>Query parameters:</div>
                                                      <div style={styles.detailsValue}>programmeNumber, search, imageStatus, imageSetType, lastModifiedFrom</div>
                                                  </div>
                                                  <DisplayContent content={textValues.apiAccessHelp.content.p3}/>
                                                  <div style={styles.detailsRow}>
                                                      <div style={styles.sectiontitle}>curl command examples:</div>
                                                  </div>
                                                  <div style={styles.examples}>
                                                    <div style={styles.example}>
                                                        <div style={styles.exampleLabel}>Search by programme number:</div>
                                                        <div style={styles.exampleValue}>curl -u "{userAccount.clientId}:{userAccount.clientSecret}" {serviceEnpoint}?programmeNumber=67141-047</div>
                                                    </div>

                                                    <div style={styles.example}>
                                                        <div style={styles.exampleLabel}>Free text search the images:</div>
                                                        <div style={styles.exampleValue}>curl -u "{userAccount.clientId}:{userAccount.clientSecret}" {serviceEnpoint}?search=Trending</div>
                                                    </div>

                                                    <div style={styles.example}>
                                                        <div style={styles.exampleLabel}>Images last modified since:</div>
                                                        <div style={styles.exampleValue}>curl -u "{userAccount.clientId}:{userAccount.clientSecret}" {serviceEnpoint}?lastModifiedFrom=1517590351000</div>
                                                    </div>
                                                    <div style={styles.example}>
                                                        <div style={styles.exampleLabel}>Cutout images:</div>
                                                        <div style={styles.exampleValue}>curl -u "{userAccount.clientId}:{userAccount.clientSecret}" {serviceEnpoint}?imageSetType=CUT_OUT</div>
                                                    </div>
                                                    <div style={styles.example}>
                                                        <div style={styles.exampleLabel}>Cutout images that are in waiting for approval:</div>
                                                        <div style={styles.exampleValue}>curl -u "{userAccount.clientId}:{userAccount.clientSecret}" {serviceEnpoint}?imageSetType=CUT_OUT&imageStatus=WAITING_APPROVE</div>
                                                    </div>




                                                  </div>

                                                      <div style={styles.section}>
                                                          <div style={styles.sectionTitle}>Pagination</div>
                                                          <DisplayContent content={textValues.apiAccessHelp.content.p4}/>
                                                          <div style={styles.exampleValue}>

                                                            (1) Set the initial values of the variable:
                                                              <div style={styles.exampleValue}>
                                                                limit=100;//the number of records per page is 100
                                                              </div>
                                                              <div style={styles.exampleValue}>
                                                                start=0; //start from the first record (index starts with 0)
                                                              </div>
                                                              <div style={styles.exampleValue}>

                                                              </div>

                                                          </div>

                                                          <div style={styles.exampleValue}>

                                                            (2) Load the array of image metadata from the URL:
                                                              {serviceEnpoint}?start=start&limit=limit

                                                          </div>


                                                          <div style={styles.exampleValue}>

                                                            (3) Process the loaded array.


                                                          </div>


                                                          <div style={styles.exampleValue}>

                                                            (4) Check if the size of array is less than the value of the limit, if yes, finish the process;
                                                            if not then increase the value of the 'start' by the size of the array and then loop back to (2)


                                                          </div>
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
