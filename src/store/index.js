import React,{Component} from "react";


import configStore  from "./configStore";

import {userSettings} from "./userSettings";

const store=configStore();

const storeHelper={
  setCredentials:function(username,password){
    store.dispatch(userSettings.actions.username(username));
    store.dispatch(userSettings.actions.password(password));
  },
  getAuthorization:function(){
    var username=store.getState().userSettings.password;
    var password=store.getState().userSettings.username;
    if(!username || !password){
      return null;
    }
    else{
      return "Basic " + btoa(username+":"+password)
    }
  }


};

export {storeHelper,store};
