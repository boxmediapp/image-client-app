import "whatwg-fetch";
import {config} from "../configs";
class DatabaseAPI {

        login(username,password){
                var headers={Authorization: "Basic " + btoa(username+":"+password)};
                return fetch(config.api.getUrl("users"),{headers})
                .then(function(response) {
                      return response.text();
                }).then(function(body) {
                    return JSON.parse(body);
                });
         }
}


const data=new DatabaseAPI();

export {data};
