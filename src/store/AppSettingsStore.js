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
  isUserAdmin(){
    var userinfo=this.getUserInfo();
    if(!userinfo){
      return false;
    }
    if(!userinfo.roles){
        return false;
    }
    for(var i=0;i<userinfo.roles.length;i++){
        if(userinfo.roles[i].operationAccess==='admin'){
          return true;
        }
    }
    return false;
  }

  setAppConfig(appconfig){
    this.store.dispatch(applicationSettings.actions.appconfig(appconfig));
  }
  getAppConfig(){
    return this.store.getState().applicationSettings.appconfig;
  }
}
