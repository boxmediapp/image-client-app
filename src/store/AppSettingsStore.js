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
  

  setAppConfig(appconfig){
    this.store.dispatch(applicationSettings.actions.appconfig(appconfig));
  }
  getAppConfig(){
    return this.store.getState().applicationSettings.appconfig;
  }
}
