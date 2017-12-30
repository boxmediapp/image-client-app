var config={
    api:{
      base:"https://api.boxplus.com/mule/boxtv/",      
      getUrl(path){
        return this.base+path;
      }
    }
}
export default config;
