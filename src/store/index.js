import React,{Component} from "react";


import configStore  from "./configStore";

import {userSettings} from "./reducers/userSettings";
import {applicationSettings} from "./reducers/applicationSettings"

const store=configStore();

const data={
  setCredentials:function(username,password){
    store.dispatch(userSettings.actions.username(username));
    store.dispatch(userSettings.actions.password(password));
  },
  buildAuthorization:function(username,password){
    return "Basic " + btoa(username+":"+password)
  },
  getAuthorization:function(){
    var username=store.getState().userSettings.username;
    var password=store.getState().userSettings.password;
    if(!username || !password){
      return null;
    }
    else{
      return this.buildAuthorization(username,password);
    }
  },
  setAppConfig:function(appconfig){
    store.dispatch(applicationSettings.actions.appconfig(appconfig));
  },
  getAppConfig:function(){
    return store.getState().applicationSettings.appconfig;
  }
};

export {data,store};
