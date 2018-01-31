var config={
    appid:"boxmediaapp",
    apikey:"k7jc3QcMPKEXGW5UC",
    securityGroup:"1CNbWCFpsbmRQuKdd",
    version:"1.1.16",
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
