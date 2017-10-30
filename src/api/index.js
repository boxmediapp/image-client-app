
import "whatwg-fetch";
import {config} from "../configs";
import {appdata} from "../store";



const pHTTPGetRequest=function(path, headers){
  return fetch(config.api.getUrl(path),{headers})
  .then(function(response) {
    if((!response) || response.status>=400){
        console.error("failure response on get request:"+path);
        throw Error("HTTP get request response error on:"+path);
    }
        return response.text();
  }).then(function(body) {
      return JSON.parse(body);
  });
};
const pHTTPPostRequest=function(path, headers, body){
  return fetch(config.api.getUrl(path),{headers, method:"POST", body})
  .then(function(response) {
    if((!response) || response.status>=400){
        console.error("failure response on post request:"+path);
        throw Error("HTTP post request response error on:"+path);
    }
        return response.text();
  }).then(function(body) {
      return JSON.parse(body);
  });
};

const pHTTPPutRequest=function(path, headers, body){
  return fetch(config.api.getUrl(path),{headers, method:"PUT", body})
  .then(function(response) {
    if((!response) || response.status>=400){
        console.error("failure response on put request:"+path);
        throw Error("HTTP put request response error on:"+path);
    }
        return response.text();
  }).then(function(body) {
      return JSON.parse(body);
  });
};
const pHTTPDeleteRequest=function(path, headers){
  return fetch(config.api.getUrl(path),{headers,method:"DELETE"})
  .then(function(response) {
        if((!response) || response.status>=400){
            console.error("failure response on delete request:"+path);
            throw Error("HTTP response error on:"+path);
        }
      
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
const httpDeleteRequest=function(path){
  var headers=pBuildHttpHeader();
  return pHTTPDeleteRequest(path,headers);
}
const httpPostRequest=function(path,body){
  var headers=pBuildHttpHeader();
  return pHTTPPostRequest(path,headers,body);
}

const httpPutRequest=function(path,body){
  var headers=pBuildHttpHeader();
  return pHTTPPutRequest(path,headers,body);
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
            return httpPostRequest("image-service/image-sets", JSON.stringify(imageset));
         }
         createImage(image){
           return httpPostRequest("image-service/images", JSON.stringify(image));
         }
         findImageSets(search){
           if(search){
                  return httpGetRequest("image-service/image-sets?search="+search);
           }
           else{
             return httpGetRequest("image-service/image-sets");
           }
         }
         findImageSetsByContractAndEpisode(contractNumber,episodeNumber){
              return this.findImageSetsByProgrammeNumber(contractNumber+"-"+episodeNumber);
         }
         findImageSetsByProgrammeNumber(programmeNumber){
              return httpGetRequest("image-service/image-sets?programmeNumber="+programmeNumber);
         }
         updateImageSet(imageSet){
            return httpPutRequest("image-service/image-sets/"+imageSet.id, JSON.stringify(imageSet));
         }
         updateImage(image){
            return httpPutRequest("image-service/images/"+image.id, JSON.stringify(image));
         }
         deleteImage(image){
           return httpDeleteRequest("image-service/images/"+image.id);
         }
         getSummaries(){
               return httpGetRequest("image-service/summaries");
         }
}


const api=new ServiceAPI();

export {api};
