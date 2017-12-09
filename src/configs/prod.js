var config={
    apikey:"k7jc3QcMPKEXGW5UC",
    securityGroup:"1CNbWCFpsbmRQuKdd",
    version:"1.1.12",
    api:{
      base:"https://mediaapp.boxplus.com/mule/boxtv/",
      getUrl(path){
        return this.base+path;
      }
    },
    normalImageWidth:533,
    normalImageHeight:300
}
export default config;
