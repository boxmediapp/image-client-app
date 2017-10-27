//var episodeId=genericUtil.getPathVariable(this.props.location.pathname,textValues.episode.view.link);

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
    return contractNumber+"_"+episodeNumber+"_"+fileVersion+"_"+width+"x"+height+"."+type;
  }


}
