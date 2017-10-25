
import "whatwg-fetch";
import {config} from "../configs";
import {appdata} from "../store";



const pHTTPGetRequest=function(path, headers){
  return fetch(config.api.getUrl(path),{headers})
  .then(function(response) {
        return response.text();
  }).then(function(body) {
      return JSON.parse(body);
  });
};
const pHTTPPostRequest=function(path, headers, body){
  return fetch(config.api.getUrl(path),{headers, method:"POST", body})
  .then(function(response) {
        return response.text();
  }).then(function(body) {
      return JSON.parse(body);
  });
};


const pBuildHttpHeader=function(){
       return {Authorization: appdata.getAuthorization()};
};

const pBuildHttpHeaderWithUsernameAndPassword=function(username,password){
      return {Authorization: appdata.buildAuthorization(username,password)};
};

const httpGetRequest=function(path){
  var headers=pBuildHttpHeader();
  return pHTTPGetRequest(path,headers);
}
const httpPostRequest=function(path,body){
  var headers=pBuildHttpHeader();
  return pHTTPPostRequest(path,headers,body);
}

class ServiceAPI {

        login(username,password){
                var headers=pBuildHttpHeaderWithUsernameAndPassword(username,password);
                return pHTTPGetRequest("users",headers);
         }

         loadConfig(){
           return httpGetRequest("app/info").then(function(data){
             return data.appconfig;
           });
         }
         requestS3UploadURL(request){
           return httpPostRequest("presigned", JSON.stringify(request));
         }
         findNotProcessedEpisodes(search){
               if(search){
                      return httpGetRequest("image-service/not-processed-episodes?search="+search);
               }
               else{
                 return httpGetRequest("image-service/not-processed-episodes");
               }
         }
         getEpisodeById(id){
            return httpGetRequest("image-service/not-processed-episodes/"+id);
         }
         createImageSet(imageset){
            return httpPostRequest("images/image-sets", JSON.stringify(imageset));
         }
         createImage(setid,image){
           return httpPostRequest("images/image-sets/"+setid, JSON.stringify(image));
         }

}


const api=new ServiceAPI();

export {api};
