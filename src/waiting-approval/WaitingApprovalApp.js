import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import {textValues} from  "./configs";

import WaitingApprovalView from "./WaitingApprovalView";



export default class WaitingApprovalApp extends Component{

  render(){
    
    return (
            <Router>
              <div className="topContainer">
                  <Route  path={textValues.home.link} exact component={WaitingApprovalView}/>
              </div>

            </Router>
      )
  }
}
