var config={
    appid:"boxmediaapp",
    url:"@@@global_input_url@@@",
    apikey:"@@@global_input_apikey@@@",
    securityGroup:"@@@global_input_apikey_securityGroup@@@",
    version:"1.3.6",
    api:{
      base:"https://mediaapp.boxplus.com/mule/boxtv/",
      getUrl(path){
        return this.base+path;
      }
    },
    importScheduleType:'IMPORT_BOX_EPISODE',
    normalImageWidth:533,
    normalImageHeight:300
}
export default config;
