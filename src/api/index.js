
import "whatwg-fetch";
import {config} from "../configs";
import {appdata} from "../store";
import {genericUtil} from "../utils";

var appconfig=appdata.getAppConfig();


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
    return pHTTPPostRequest("accounts/login",headers, JSON.stringify({username:username}));
  }
  refreshLogin(userInfo){
      return httpPostRequest("accounts/refresh-login", JSON.stringify({userInfo}));
  }
  logout(userinfo){
      if(!userinfo){
          return;
        }
        var clientId=userinfo.clientId;
        var clientSecret=userinfo.clientSecret;
        if(!clientId){
            return;
          }
          if(!clientSecret){
            return;
          }
          var expiresAt=userinfo.expiresAt;
          var now=new Date();
          if(now.getTime()>=expiresAt){
            return;
          }
          var headers=pBuildHttpHeaderWithUsernameAndPassword(clientId,clientSecret);
          return pHTTPPostRequest("accounts/user-logout",headers, JSON.stringify(userinfo));
    }
    createAccount(user){
       return httpPostRequest("accounts/create-account", JSON.stringify(user));
    }
    updateUserAccount(userAccount){
        return httpPostRequest("accounts/user-account", JSON.stringify(userAccount));
    }
         loadConfig(){
           return httpGetRequest("app/info").then(function(data){
             return data.appconfig;
           });
         }
         requestS3UploadURL(request){
           return httpPostRequest("presigned", JSON.stringify(request));
         }
         findNewEpisodes(request, start=0){

               var queryurl="image-service/box-episodes?numberOfImageSets=0&start="+start;
               if(request.search){
                 queryurl+="&search="+request.search;
               }
               if(request.sortBy){
                 queryurl+="&sortBy="+request.sortBy;
               }
               if(request.sortOrder){
                 queryurl+="&sortOrder="+request.sortOrder;
               }
               if(request.fromDate){
                 queryurl+="&from="+request.fromDate;
               }
               if(request.toDate){
                 queryurl+="&to="+request.toDate;
               }
               if(request.channelId){
                 queryurl+="&channelId="+request.channelId;
               }


               return httpGetRequest(queryurl);
         }
         findScheduleEpisodes(request, start=0){

               var queryurl="image-service/box-schedule-episodes?start="+start;
               if(request.search){
                 queryurl+="&search="+request.search;
               }
               if(request.sortBy){
                 queryurl+="&sortBy="+request.sortBy;
               }
               if(request.sortOrder){
                 queryurl+="&sortOrder="+request.sortOrder;
               }
               if(request.fromDate){
                 queryurl+="&from="+genericUtil.dateValueToTimestamp(request.fromDate,"00:00:00");
               }
               if(request.toDate){
                 queryurl+="&to="+genericUtil.dateValueToTimestamp(request.toDate,"23:59:59");
               }
               if(request.channelId){
                 queryurl+="&channelId="+request.channelId;
               }
               return httpGetRequest(queryurl);
         }
         findAssignedEpisodes(search, start=0){
               var queryurl="image-service/box-episodes?minNumberOfImageSets=1&start="+start;
               if(search){
                 queryurl+="&search="+search;
               }
               return httpGetRequest(queryurl);
         }
         findAssignedEpisodesByProgrammeNumber(programmeNumber, start=0){
               var queryurl="image-service/box-episodes?minNumberOfImageSets=1&start="+start;
               if(programmeNumber){
                 queryurl+="&programmeNumber="+programmeNumber;
               }
               return httpGetRequest(queryurl);
         }

         getEpisodeById(id){
            return httpGetRequest("image-service/box-episodes/"+id);
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
         deleteImageSet(imageSet){
           return httpDeleteRequest("image-service/image-sets/"+imageSet.id);
         }
         getSummaries(){
               return httpGetRequest("image-service/summaries");
         }
         getClientImages(programmeNumber){
             if(programmeNumber){
               return httpGetRequest("image-service/clients/images?programmeNumber="+programmeNumber);
             }
             else{
               return httpGetRequest("image-service/clients/images");
             }

         }
         sendCommand(command){
            return httpPostRequest("commands", JSON.stringify(command));
         }
         getTasks(){
            return httpGetRequest("tasks?importScheduleType=IMPORT_BOX_EPISODE");
         }
         createTask(task){
           return httpPostRequest("tasks", JSON.stringify(task));
         }
         removeTask(task){
           return httpDeleteRequest("tasks/"+task.id);
         }
         getAllBoxChannels(){
           return httpGetRequest("box-channels");
         }

}


const api=new ServiceAPI();

export {api};
