import {userSettings} from "./reducers/userSettings";
import {applicationSettings} from "./reducers/applicationSettings"
export default class AppSettingsStore{
  constructor(store){
    this.store=store;
  }
  setUserInfo(userinfo){
    this.store.dispatch(userSettings.actions.setUserinfo(userinfo));
  }
  getUserInfo(){
    return this.store.getState().userSettings.userinfo;
  }
  buildAuthorization(clientId,clientSecret){
    return "Basic " + btoa(clientId+":"+clientSecret)
  }
  getAuthorization(){
    var userinfo=this.store.getState().userSettings.userinfo;

    if(!userinfo){
      return null;
    }
    var clientId=userinfo.clientId;
    var clientSecret=userinfo.clientSecret;
    if(!clientId || !clientSecret){
      return null;
    }
    else{
      return this.buildAuthorization(clientId,clientSecret);
    }
  }
  setAppConfig(appconfig){
    this.store.dispatch(applicationSettings.actions.appconfig(appconfig));
  }
  getAppConfig(){
    return this.store.getState().applicationSettings.appconfig;
  }
}
