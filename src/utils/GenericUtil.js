//var episodeId=genericUtil.getPathVariable(this.props.location.pathname,textValues.episode.view.link);
import  CryptoJS from "crypto-js";
export default class GenericUtil{
  getQueryParam(query,variable) {
    if(!query){
      return null;
    }
    query=query.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
  }
  getPathVariable(path,basepath){
    var ind=path.indexOf(basepath);
    if(ind<0){
      return null;
    }
    var ret=path.substring(ind+basepath.length);
    return this.removePrefix(ret,"/");
  }
  getPathName(){
    if(window.location && window.location.pathname){
        return window.location.pathname;
    }
    else{
      return window.location.pathname;
    }
  }
  removePrefix(content,prefix){
    if(content.length<prefix.length){
      return "";
    }
    if(content.charAt(0)==prefix){
      return content.substring(prefix.length);
    }
  }
  startUpload(request){
    var formData = new FormData();
    formData.append("key", request.s3.file);
    formData.append("acl", request.s3.acl);
    formData.append("success_action_status", request.s3.successActionStatus);
    formData.append("policy", request.s3.policy);
    formData.append("x-amz-algorithm", request.s3.xamzAlgorithm);
    formData.append("x-amz-credential", request.s3.xamzCredential);
    formData.append("x-amz-date", request.s3.xamzDate);
    formData.append("x-amz-signature", request.s3.xamzSignature);
    formData.append("file",request.file);
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", function(evt){
      if (evt.lengthComputable) {
         if(request.onProgress){
            request.onProgress(evt.loaded,evt.total);
         }
      }
    });

    xhr.upload.addEventListener("load", function(evt){
      if(request.onComplete){
        if(xhr.responseXML){
            request.onComplete(evt, xhr.responseXML);
        }
        else if(xhr.responseText){
            request.onComplete(evt, xhr.responseText);
        }
        else{
          request.onComplete(evt, xhr.response);
        }

      }

    });
    xhr.upload.addEventListener("error", function(evt){
      if(request.onError){
          request.onError(evt);
      }
    });
    xhr.upload.addEventListener("abort", function(evt){
      if(request.onAbort){
          request.onAbort(evt);
      }
    });
    xhr.open("POST", request.s3.baseURL);
    xhr.send(formData);
  }
  getMaximumFileCounter(imageSets){
    var fileCounter=0;
    if(!imageSets){
      return fileCounter;
    }
    imageSets.forEach(imgset=>{
        if(imgset.fileCounter>fileCounter){
          fileCounter=imgset.fileCounter;
        }
    });
    return fileCounter;
  }
  buildImageFileName(contractNumber, episodeNumber, fileCounter,width,height,type){
    var fileVersion=""+fileCounter;
    while(fileVersion.length<3){
      fileVersion="0"+fileVersion;
    }
    if(typeof contractNumber==='undefined'){
          console.error("contract nunber is undefined in buildImageFileName");
          contractNumber=(new Date()).getTime();
    }
    return contractNumber+"_"+episodeNumber+"_"+fileVersion+"_"+width+"x"+height+"."+type;
  }

  generatateRandomString(length=10){
    var randPassword = Array(length).fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz").map(function(x) { return x[Math.floor(Math.random() * x.length)] }).join('');
    return randPassword;
  }
  encrypt(content, password){
      return escape(CryptoJS.AES.encrypt(content, password).toString());
  }
  decrypt(content, password){
    return CryptoJS.AES.decrypt(unescape(content), password).toString(CryptoJS.enc.Utf8);
  }
  clearOldStorage(){
    localStorage.removeItem("localImageKey");
    localStorage.removeItem("imageCred");
    localStorage.removeItem("box.username");
    localStorage.removeItem("box.password");
  }
  getLocalKey(){
      return "xIiSIif7z0zQurp0y";
  }
  saveUserInfo(userInfo){
      var userInfoString=JSON.stringify(userInfo);
      var key=this.getLocalKey();
      var cred=this.encrypt(userInfoString,key);
      localStorage.setItem('imageUser', cred);
  }



isUserInfoValid(userinfo){
     if(!userinfo){
       return false;
     }
    var expiresAt=userinfo.expiresAt;
    var now=new Date();
    return  userinfo.clientId && userinfo.clientSecret && now.getTime()<expiresAt;
}
doesUserHasFullAccess(userinfo){
    if(!userinfo){
         return false;
    }
    if(!userinfo.roles){
      return false;
    }
    var hasWriteAccess=false;
    userinfo.roles.forEach(role=>{
        if(role.operationAccess==="admin" || role.operationAccess==="full-access"){
              hasWriteAccess=true;
        }
    });
    return hasWriteAccess;
}
canUserAccessApp(userinfo){
  if(!userinfo){
       return false;
  }
  if(!userinfo.roles){
    return false;
  }
  var isApp=false;
  userinfo.roles.forEach(role=>{
      if(role.applicationId==="MEDIA_APP"){
            isApp=true;
      }
  });
  return isApp;
}
isUserImageClient(userinfo){
  if(!userinfo){
       return false;
  }
  if(!userinfo.roles){
    return false;
  }
  var isApp=false;
  userinfo.roles.forEach(role=>{
      if(role.applicationId==="IMAGE_CLIENT_APP"){
            isApp=true;
      }
  });
  return isApp;
}
signout(){
      this.stopRefreshLoginThread();
      if(localStorage.getItem("imageUser")){
            localStorage.removeItem("imageUser");
      }
}
stopRefreshLoginThread(){
  if(this.refreshLoginTimer){
      clearInterval(this.refreshLoginTimer);
      this.refreshLoginTimer=null;
  }
}


startRefreshLoginThread(userinfo, refreshLogin, appdata){
    this.stopRefreshLoginThread();
    if(!userinfo){
          return;
    }
    if(!userinfo.durationInSeconds){
              return;
    }
    if(userinfo.durationInSeconds<45){
      return;
    }

    var refreshInterval=userinfo.durationInSeconds-30;
    if(refreshInterval<0){
        refreshInterval=30;
    }
    this.refreshLoginTimer=setInterval(()=>{
                refreshLogin(userinfo).then(operator=>{
                        var newuserinfo=operator.loginInfo;
                        this.saveUserInfo(newuserinfo);
                        var appuserinfo=appdata.getUserInfo();
                        if(!appuserinfo){
                              appdata.setUserInfo(newuserinfo);
                        }
                        if(newuserinfo.application!==userinfo.application){
                            appdata.setUserInfo(newuserinfo);
                        }
                        return operator;
                }).catch(error=>{
                    console.error(error+" while refreshing login info");
                    this.stopRefreshLoginThread();
                    var us=appdata.getUserInfo();
                    if(us){
                      appdata.setUserInfo(null);
                    }
                });
    },refreshInterval*1000);
}
  loadUserInfo(){
        var imageCred=localStorage.getItem("imageUser");
        if(!imageCred){
          return null;
        }
        var key=this.getLocalKey();
        var credString=null;
      try{
            credString=this.decrypt(imageCred,key);
          }
        catch(error){
          console.error(error+" when decrypting the userInfo");
        }

        if(!credString){
          return null;
        }
        return JSON.parse(credString);
  }


  dateValueToTimestamp(datevalue, timevalue){
    if(!datevalue){
      return null;
    }
    var datevalue=new Date(datevalue+" "+timevalue);
    return datevalue.getTime();
  }
  timestampToDateValue(timestamp){
    if(!timestamp){
      return null;
    }
    var dvalue=new Date(timestamp);

    var fullYear=dvalue.getFullYear();
    var mm=dvalue.getMonth()+1;
    if(mm<10){
      mm="0"+mm;
    }
    var dd=dvalue.getDate();
    if(dd<10){
      dd="0"+dd;
    }
    return fullYear+"-"+mm+"-"+dd;
  }
  timeValueFromNow(seconds){
        var timevalue=new Date();
        timevalue.setSeconds(timevalue.getSeconds() + seconds);
        var hourValue=timevalue.getHours();
        var minutes=timevalue.getMinutes();
        var seconds=timevalue.getSeconds();
        var ret="";
        if(hourValue<10){
          ret+="0"+hourValue;
        }
        else{
          ret+=hourValue;
        }
        ret+=":";
        if(minutes<10){
          ret+="0"+minutes;
        }
        else{
          ret+=minutes;
        }
        ret+=":";
        if(seconds<10){
          ret+="0"+seconds;
        }
        else{
          ret+=seconds;
        }
        return ret;
  }
  getWeek(datevalue){
        var weektime=new Date("2017-01-01");
        var t=datevalue.getTime()-weektime.getTime()/(3600000*24);
        return t%7;
  }
  getDateFromWeekOfYear(year,week,fromWeekDay, toWeekDay){
        var timevalue=new Date(year+"-01-01");
        timevalue.setDate(timevalue.getDate()+7*week);
        var fromDate=timevalue;
        for(var i=0;i<=7;i++){
              var t=new Date(timevalue.getTime());
              t.setDate(t.getDate()-i);
              if(this.getWeek(t)===fromWeekDay){
                fromDate=t;
                break;
              }
              t=new Date(timevalue.getTime());
              t.setDate(t.getDate()+i);
              if(this.getWeek(t)===fromWeekDay){
                fromDate=t;
                break;
              }
        }
        var toDate=fromDate;
        for(var i=0;i<=7;i++){
              var t=new Date(fromDate.getTime());
              t.setDate(t.getDate()+i);
              if(this.getWeek(t)===toWeekDay){
                toDate=t;
                break;
              }
        }
        return {fromDate,toDate};
  }

}


/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
downloaded from the following CDN:
https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js
*/
