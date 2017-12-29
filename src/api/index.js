
import "whatwg-fetch";
import {config} from "../configs";
import {appdata} from "../store";
import {genericUtil} from "../utils";



class ServiceAPI {
   constructor(config,appdata){
      this.config=config;
      this.appdata=appdata;
   }
   executeHTTPGetRequestWithHeaders(path, headers){
     if(!headers){
       headers={};
     }
    return fetch(this.config.api.getUrl(path),{headers})
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


   executeHTTPPostRequestWithHeaders(path, headers, body){
     if(!headers){
       headers={};
     }
    return fetch(this.config.api.getUrl(path),{headers, method:"POST", body})
    .then(function(response) {
      if((!response) || response.status>=400){
          console.error("failure response on post request:"+path);
          throw Error("HTTP post request response error on:"+path);
      }
          return response.text();
    }).then(function(body) {
        return JSON.parse(body);
    });
   }

   executeHTTPPutRequestWithHeaders(path, headers, body){
     if(!headers){
       headers={};
     }
    return fetch(this.config.api.getUrl(path),{headers, method:"PUT", body})
    .then(function(response) {
      if((!response) || response.status>=400){
          console.error("failure response on put request:"+path);
          throw Error("HTTP put request response error on:"+path);
      }
          return response.text();
    }).then(function(body) {
        return JSON.parse(body);
    });
  }


   executeHTTPDeleteRequestWithHeaders(path, headers){
     if(!headers){
       headers={};
     }
    return fetch(this.config.api.getUrl(path),{headers,method:"DELETE"})
    .then(function(response) {
          if((!response) || response.status>=400){
              console.error("failure response on delete request:"+path);
              throw Error("HTTP response error on:"+path);
          }

          return response.text();
    }).then(function(body) {
        return JSON.parse(body);
    });
  }

  buildHttpHeader(checkExpiration){
        var userinfo=this.appdata.getUserInfo();
        return this.buildHttpHeaderWithUserInfo(userinfo);

  }
  buildHttpHeaderWithUserInfo(userinfo, checkExpiration){
        if(!userinfo){
            return null;
        }
        var clientId=userinfo.clientId;
        var clientSecret=userinfo.clientSecret;
        if(!clientId || !clientSecret){
            return null;
        }
        if(checkExpiration){
            var expiresAt=userinfo.expiresAt;
            var now=new Date();
            if(now.getTime()>=expiresAt){
                return null;
            }
        }
        return {Authorization: "Basic " + btoa(clientId+":"+clientSecret)}

  }

  doPutRequest(path,body){
    var headers=this.buildHttpHeader();
    return this.executeHTTPPutRequestWithHeaders(path,headers,body);
  }
  doPostRequest(path,body){
    var headers=this.buildHttpHeader();
    return this.executeHTTPPostRequestWithHeaders(path,headers,body);
  }
  doDeleteRequest(path){
    var headers=this.buildHttpHeader();
    return this.executeHTTPDeleteRequestWithHeaders(path,headers);
  }
   doGetRequest=function(path){
    var headers=this.buildHttpHeader();
    return this.executeHTTPGetRequestWithHeaders(path,headers);
  }



  login(username,password){
    var headers= {Authorization: "Basic " + btoa(username+":"+password)};
    return this.executeHTTPPostRequestWithHeaders("accounts/login",headers, JSON.stringify({username:username}));
  }
  refreshLogin(userInfo){
      return this.doPostRequest("accounts/refresh-login", JSON.stringify({userInfo}));
  }
  logout(userinfo){
          var oauthHeader=this.buildHttpHeaderWithUserInfo(userinfo, true);
          if(!oauthHeader){
            return;
          }
          return this.executeHTTPPostRequestWithHeaders("accounts/user-logout",oauthHeader, JSON.stringify(userinfo));
    }
    createAccount(user){
       return this.doPostRequest("accounts/create-account", JSON.stringify(user));
    }
    updateUserAccount(userAccount){
        return this.doPostRequest("accounts/user-account", JSON.stringify(userAccount));
    }

    loadConfig(){
           return this.doGetRequest("app/info").then(function(data){
             return data.appconfig;
           });
    }

     requestS3UploadURL(request){
           return this.doPostRequest("presigned", JSON.stringify(request));
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


               return this.doGetRequest(queryurl);
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
               return this.doGetRequest(queryurl);
         }
         findAssignedEpisodes(search, start=0){
               var queryurl="image-service/box-episodes?minNumberOfImageSets=1&start="+start;
               if(search){
                 queryurl+="&search="+search;
               }
               return this.doGetRequest(queryurl);
         }
         findAssignedEpisodesByProgrammeNumber(programmeNumber, start=0){
               var queryurl="image-service/box-episodes?minNumberOfImageSets=1&start="+start;
               if(programmeNumber){
                 queryurl+="&programmeNumber="+programmeNumber;
               }
               return this.doGetRequest(queryurl);
         }

         getEpisodeById(id){
            return this.doGetRequest("image-service/box-episodes/"+id);
         }
         createImageSet(imageset){
            return this.doPostRequest("image-service/image-sets", JSON.stringify(imageset));
         }
         createImage(image){
           return this.doPostRequest("image-service/images", JSON.stringify(image));
         }
         findImageSets(search){
           if(search){
                  return this.doGetRequest("image-service/image-sets?search="+search);
           }
           else{
             return this.doGetRequest("image-service/image-sets");
           }
         }
         findImageSetsByContractAndEpisode(contractNumber,episodeNumber){
              return this.findImageSetsByProgrammeNumber(contractNumber+"-"+episodeNumber);
         }
         findImageSetsByProgrammeNumber(programmeNumber){
              return this.doGetRequest("image-service/image-sets?programmeNumber="+programmeNumber);
         }
         updateImageSet(imageSet){
            return this.doPutRequest("image-service/image-sets/"+imageSet.id, JSON.stringify(imageSet));
         }
         updateImage(image){
            return this.doPutRequest("image-service/images/"+image.id, JSON.stringify(image));
         }
         deleteImage(image){
           return this.doDeleteRequest("image-service/images/"+image.id);
         }
         deleteImageSet(imageSet){
           return this.doDeleteRequest("image-service/image-sets/"+imageSet.id);
         }
         getSummaries(){
               return this.doGetRequest("image-service/summaries");
         }
         getClientImages(programmeNumber){
             if(programmeNumber){
               return this.doGetRequest("image-service/clients/images?programmeNumber="+programmeNumber);
             }
             else{
               return this.doGetRequest("image-service/clients/images");
             }

         }
         sendCommand(command){
            return this.doPostRequest("commands", JSON.stringify(command));
         }
         getTasks(){
            return this.doGetRequest("tasks?importScheduleType=IMPORT_BOX_EPISODE");
         }
         createTask(task){
           return this.doPostRequest("tasks", JSON.stringify(task));
         }
         removeTask(task){
           return this.doDeleteRequest("tasks/"+task.id);
         }
         getAllBoxChannels(){
           return this.doGetRequest("box-channels");
         }
         getUsers(){
           return this.doGetRequest("users");
         }
         loadUserRoles(){
           return this.doGetRequest("user-roles");
         }
         deleteUser(username){
            return this.doDeleteRequest("users/"+username);
          }
          updateUser(user){
            return this.doPutRequest("users/"+user.username,JSON.stringify(user));
          }

}

const api=new ServiceAPI(config, appdata);

export {api,ServiceAPI};
