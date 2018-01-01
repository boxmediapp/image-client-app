import {config as clientconfig} from "../../configs";
var config=clientconfig;
if(config.api.base!=="http://localb/mule/boxtv/"){
    var config=Object.assign({},clientconfig);
    config.api=Object.assign({},clientconfig.api);
    config.api.base="https://api.boxplus.com/mule/boxtv/";
}

export default config;
