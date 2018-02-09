
import "whatwg-fetch";
import {config} from "../configs";
import {appdata} from "../store";
import {genericUtil} from "../utils";



class ServiceAPI {
   constructor(config,appdata){
      this.config=config;
      this.appdata=appdata;
      this.clientImagePath="image-service/clients/images";
   }
   handleHttpResponse(response){
      if(!response){
            throw  Error("Network Error");
      }
      if(response.status && response.status>=200 && response.status<300){
            return response.text();
      }
      return response.text().then(text=>{
            var errorMessage=text;
            var errorObj=null;
            try{
                  errorObj=JSON.parse(text);
                  if(errorObj.error){
                      errorMessage=errorObj.error;
                  }
              }
              catch(perror){
                console.error(perror+" when parsing:"+text);
              }
              if((!errorMessage)|| (errorMessage.trim().length===0)){
                    errorMessage="Empty response is received from the server";
              }
              else if(errorMessage.length>80){
                    errorMessage=errorMessage.substring(0,80)+"...";
              }
              let error = Error(errorMessage);
              error.response = response;
              error.errorObj=errorObj;
              throw error;
      });
   }
   converdHttpBodyToJson(body){
     try{
          return JSON.parse(body);
      }
      catch(error){
        console.error(error+" error in parsing JSON:"+body);
        throw new Error("Error parsing the json");
      }
   }
   executeHTTPGetRequestWithHeaders(path, headers){
     if(!headers){
       headers={};
     }
    return fetch(this.config.api.getUrl(path),{headers})
    .then(this.handleHttpResponse.bind(this)).then(this.converdHttpBodyToJson.bind(this));
  };


   executeHTTPPostRequestWithHeaders(path, headers, body){
     if(!headers){
       headers={};
     }
    return fetch(this.config.api.getUrl(path),{headers, method:"POST", body})
    .then(this.handleHttpResponse.bind(this)).then(this.converdHttpBodyToJson.bind(this));

   }

   executeHTTPPutRequestWithHeaders(path, headers, body){
     if(!headers){
       headers={};
     }
    return fetch(this.config.api.getUrl(path),{headers, method:"PUT", body})
    .then(this.handleHttpResponse.bind(this)).then(this.converdHttpBodyToJson.bind(this));

  }


   executeHTTPDeleteRequestWithHeaders(path, headers){
     if(!headers){
       headers={};
     }
    return fetch(this.config.api.getUrl(path),{headers,method:"DELETE"})
    .then(this.handleHttpResponse.bind(this)).then(this.converdHttpBodyToJson.bind(this));
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
    getUserAccount(){
        return this.doGetRequest("accounts/user-account");
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
               if(request.contractNumber){
                 queryurl+="&contractNumber="+request.contractNumber;
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
         getClientImages(request){
             if(!request){
               return this.doGetRequest(this.clientImagePath);
             }
             else if(request.programmeNumber){
               return this.doGetRequest(this.clientImagePath+"?programmeNumber="+request.programmeNumber);
             }
             else if(request.search){
               return this.doGetRequest(this.clientImagePath+"?search="+request.search);
             }
             else{
               return this.doGetRequest(this.clientImagePath);
             }

         }
         sendCommand(command){
            return this.doPostRequest("commands", JSON.stringify(command));
         }
         getTasks(importScheduleType){
              return this.doGetRequest("tasks?importScheduleType="+importScheduleType);
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
