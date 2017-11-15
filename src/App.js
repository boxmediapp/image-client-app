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
import {EpisodeView,ContractEpisodeNumberView} from "./add-image-view";
import {NewEpisodesView} from "./new-episodes";
import {ClientImagesView} from "./clients-view";
import {Home} from "./home";
import {AdminView} from "./admin";

import {ListImageSetView} from "./list-image-sets";
import {genericUtil} from "./utils";



export default class App extends Component{
  constructor(props){
    super(props);
    this.state={authorization:appdata.getAuthorization()};
    this.ubsubsribe=store.subscribe(()=>{
          this.setAuthorization(appdata.getAuthorization());
    });

  }
  onLoggedOut(currentAuthorization){
    this.setState(Object.assign({}, this.state, {authorization:null}));
  }
  onLoggedIn(currentAuthorization){
    api.loadConfig().then(appconfig=>{

        appdata.setAppConfig(appconfig);


      this.setState(Object.assign({}, this.state, {authorization:currentAuthorization}));
    }).catch((err)=>{
        console.error("failed to load the appinfo:"+err.stack);

    })


  }
  setAuthorization(currentAuthorization){
       if(this.state.authorization && (!currentAuthorization) ){
             this.onLoggedOut(currentAuthorization);
       }
       else if((!this.state.authorization) && currentAuthorization){
            this.onLoggedIn(currentAuthorization);
       }
       else if(this.state.authorization && currentAuthorization && this.state.authorization!==currentAuthorization){
            this.onLoggedIn(currentAuthorization);
       }

  }
  render(){
                if(this.state.authorization){
                    return (
                            <Router>
                              <div className="topContainer">
                                  <Route  path={textValues.home.link} exact component={Home}/>
                                  <Route  path={textValues.newepisodes.link}  component={NewEpisodesView}/>
                                  <Route path={textValues.assignImageByEpisode.link} component={EpisodeView}/>
                                  <Route path={textValues.imagesets.link} component={ListImageSetView}/>
                                  <Route path={textValues.addImageView.contractEpisode.link} component={ContractEpisodeNumberView}/>
                                  <Route path={textValues.clientsView.link} component={ClientImagesView}/>
                                  <Route path={textValues.admin.link} component={AdminView}/>
                              </div>
                            </Router>
                      )
                    }
                    else{
                        this.autoLogin();
                        return (
                            <DisplayLogin/>

                        );

                   }
    }
    componentWillUnmount(){
      if(this.ubsubsribe){
        this.ubsubsribe();
      }
    }

   autoLogin(){
     var cred=genericUtil.loadCred();
     if(!cred){
         return;
     }
     else{
         var username=cred.username;
         var password=cred.password;
         appdata.setCredentials(username,password);
     }
   }


}
