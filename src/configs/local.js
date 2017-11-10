var config={
    apikey:"k7jc3QcMPKEXGW5UC",
    securityGroup:"1CNbWCFpsbmRQuKdd",
    api:{
      base:"http://localb/mule/boxtv/",
      getUrl(path){
        return this.base+path;
      }
    },
    normalImageWidth:533,
    normalImageHeight:300
}
export default config;
