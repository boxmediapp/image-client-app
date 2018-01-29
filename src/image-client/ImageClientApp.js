import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import {textValues} from  "./configs";


import {ImageSearchView} from "./image-search";
import {Home} from "./home";
import {appdata,store} from "../store";
import DisplayTAndC from "./DisplayTAndC";
import {genericUtil} from "../utils";
import {ApiAccessDocumentationView} from "./api-access-documentation";
import {NoServicesView} from "./no-services";
import {AccountView} from "../account";

export default class ImageClientApp extends Component{
  constructor(props){
        super(props);
        var userInfo=appdata.getUserInfo();
        this.state={userInfo};
  }

  onAcceptTC(){
      var userInfo=appdata.getUserInfo();
      userInfo.userStatus="accepted";
      appdata.setUserInfo(userInfo);
      genericUtil.saveUserInfo(userInfo);
      this.setState(Object.assign({}, this.state, {userInfo}));
  }
  renderApp(){

    return (
          <Router>
              <div className="topContainer">
                  <Route  path={textValues.home.link} exact component={Home}/>
                  <Route path={textValues.imageSearch.link} component={ImageSearchView}/>
                  <Route path={textValues.apiAccessHelp.link} component={ApiAccessDocumentationView}/>
                  <Route path={textValues.account.link} component={AccountView}/>
                  <Route path={textValues.noServices.link} component={NoServicesView}/>
              </div>

          </Router>
      )
  }
  render(){

    if(!this.state.userInfo.userStatus){
          return (<DisplayTAndC onAcceptTC={this.onAcceptTC.bind(this)}/>);
    }
    else{
      return this.renderApp();
    }

  }
}
