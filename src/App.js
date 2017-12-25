import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/App.css";


import {textValues,images} from  "./configs";

import {appdata,store} from "./store";
import {api} from "./api";

import {DisplayLogin} from "./display-login";
import {EpisodeView,ContractEpisodeNumberView} from "./assign-image-view";
import {NewEpisodesView} from "./new-episodes";
import {ListScheduleEpisodesView} from "./list-schedule-episodes";

import {ClientImagesView} from "./clients-view";
import {Home} from "./home";
import {ManageCacheView,ScheduleImportView} from "./admin";

import {ListImageSetView} from "./list-image-sets";
import {ListAssignedEpisodesView} from "./list-assigned-episodes";
import {genericUtil} from "./utils";
import {ModalDialog} from "./components";

import {LoadingScreen} from "./loading-screen";


export default class App extends Component{
  constructor(props){
    super(props);
    this.state={userinfo:"", message:null,loading:true};
    this.ubsubsribe=store.subscribe(this.receiveStateFromStore.bind(this));
    genericUtil.clearOldStorage();

    var userInfo=genericUtil.loadUserInfo();
    if(genericUtil.isUserInfoValid(userInfo)){
        appdata.setUserInfo(userInfo);
    }
    else{
      this.state.loading=false;
    }

  }

  componentWillUnmount(){
    if(this.ubsubsribe){
      this.ubsubsribe();
    }
    genericUtil.stopRefreshLoginThread();
  }
  receiveStateFromStore(){
       var userinfo= appdata.getUserInfo();
       if(!userinfo){
          if(this.state.userinfo){
            this.setState(Object.assign({}, this.state, {userinfo:null,loading:false}));
            genericUtil.signout();
          }
          return;
       }
       else if(userinfo === this.userinfo){
            return;
       }
       this.userinfo=userinfo;
       api.loadConfig().then(appconfig=>{
                var loading=false;
                this.setState(Object.assign({}, this.state, {userinfo,loading}));
                appdata.setAppConfig(appconfig);
                genericUtil.startRefreshLoginThread(userinfo);
       }).catch((err)=>{
           console.error("failed to load the appinfo:"+err.stack);
           appdata.setUserInfo(null);
           this.setState(Object.assign({}, this.state, {userinfo:null,loading:false}));
           this.setErrorMessage("Login failed:"+err);
       })
  }





  onClearMessage(){
    this.setState(Object.assign({}, this.state,{modalMessage:null}));
  }
  setErrorMessage(content){
     var modalMessage={
            title:"Error",
            content,
            onConfirm:this.onClearMessage.bind(this),
            confirmButton:"OK"
     }
     this.setState(Object.assign({}, this.state,{modalMessage,loading:false}));
  }



  render(){

              if(this.state.loading){
                  return (<LoadingScreen/>);
              }
               else if(this.state.userinfo){
                    return (
                            <Router>
                              <div className="topContainer">
                                  <Route  path={textValues.home.link} exact component={Home}/>
                                  <Route  path={textValues.newepisodes.link}  component={NewEpisodesView}/>
                                  <Route path={textValues.assignImageByEpisode.link} component={EpisodeView}/>
                                  <Route path={textValues.imagesets.link} component={ListImageSetView}/>
                                  <Route path={textValues.assignedEpisodes.link} component={ListAssignedEpisodesView}/>

                                  <Route path={textValues.assignImageByContractAndEpidodeNumber.link} component={ContractEpisodeNumberView}/>
                                  <Route path={textValues.clientsView.link} component={ClientImagesView}/>
                                  <Route path={textValues.cacheMamnagement.link} component={ManageCacheView}/>
                                  <Route path={textValues.scheduleImport.link} component={ScheduleImportView}/>
                                  <Route path={textValues.listScheduleEpisodes.link} component={ListScheduleEpisodesView}/>
                                  <ModalDialog message={this.state.modalMessage}/>
                              </div>

                            </Router>
                      )
                    }
                    else{
                        return (
                            <DisplayLogin/>
                        );

                   }
    }



}
