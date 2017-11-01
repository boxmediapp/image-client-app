import {userSettings} from "./reducers/userSettings";
import {applicationSettings} from "./reducers/applicationSettings"
export default class AppSettingsStore{
  constructor(store){
    this.store=store;
  }
  setCredentials(username,password){
    this.store.dispatch(userSettings.actions.username(username));
    this.store.dispatch(userSettings.actions.password(password));
  }
  buildAuthorization(username,password){
    return "Basic " + btoa(username+":"+password)
  }
  getAuthorization(){
    var username=this.store.getState().userSettings.username;
    var password=this.store.getState().userSettings.password;
    if(!username || !password){
      return null;
    }
    else{
      return this.buildAuthorization(username,password);
    }
  }
  setAppConfig(appconfig){
    this.store.dispatch(applicationSettings.actions.appconfig(appconfig));
  }
  getAppConfig(){
    return this.store.getState().applicationSettings.appconfig;
  }
}
