var config={
    apikey:"k7jc3QcMPKEXGW5UC",
    securityGroup:"1CNbWCFpsbmRQuKdd",
    api:{
      base:"https://image.boxnetwork.co.uk/mule/boxtv/",
      getUrl(path){
        return this.base+path;
      }
    },

}
export default config;
