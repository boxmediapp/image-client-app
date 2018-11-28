import apppackage from  "../../package.json";
var config={
    appid:"boxmediaapp",
    url:"@@@global_input_url@@@",
    apikey:"@@@global_input_apikey@@@",
    securityGroup:"@@@global_input_apikey_securityGroup@@@",
    version:"*.*.*",
    userGuide:"https://imageapp.boxplus.com/UserGuide.pdf",
    api:{
      base:"https://mediaapp.boxplus.com/mule/boxtv/",
      getUrl(path){
        return this.base+path;
      }
    },
    importScheduleType:'IMPORT_BOX_EPISODE',
    normalImageWidth:533,
    normalImageHeight:300
};


config.version=apppackage.version;
if(process && process.env && process.env.NODE_ENV){
    //prodelopment, production,test environment
    if(process.env.NODE_ENV==='development'){
        config.url=process.env.REACT_APP_GLOBALINPUT_URL;
        config.apikey=process.env.REACT_APP_GLOBALINPUT_APIKEY;
        config.securityGroup=process.env.REACT_APP_GLOBALINPUT_SECURITY_GROUP;
        config.api.base=process.env.REACT_APP_GLOBALINPUT_BASE;
    }
}









export default config;
