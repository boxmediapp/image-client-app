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
import {EpisodeView} from "./add-image-view";
import {NotProcessedEpisodeView} from "./not-processed";


export default class App extends Component{
  constructor(props){
    super(props);
    this.state={authorization:appdata.getAuthorization()};
    this.ubsubsribe=store.subscribe(()=>{
          this.setAuthorization(appdata.getAuthorization());
    });

  }
  onLoggedout(currentAuthorization){
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
                                  <Route  path={textValues.episode.list.link} exact component={NotProcessedEpisodeView}/>
                                  <Route path={textValues.addImageView.episode.link} component={EpisodeView}/>
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
    componentWillUnmount(){
      if(this.ubsubsribe){
        this.ubsubsribe();
      }
    }
}
