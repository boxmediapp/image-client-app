import React, {Component} from 'react'


import {data} from "../../store";



export default class UploadFileToS3 {

  startUpload(s3, file, onComplete,onProgress, onError, onAbort){


    var formData = new FormData();
    formData.append("key", s3.file);
    formData.append("acl", s3.acl);
    formData.append("success_action_status", s3.successActionStatus);
    formData.append("policy", s3.policy);
    formData.append("x-amz-algorithm", s3.xamzAlgorithm);
    formData.append("x-amz-credential", s3.xamzCredential);
    formData.append("x-amz-date", s3.xamzDate);
    formData.append("x-amz-signature", s3.xamzSignature);
    formData.append("file",file);
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", function(evt){
      if (evt.lengthComputable) {
         if(onProgress){
            onProgress(evt.loaded,evt.total);
         }
      }
    });

    xhr.upload.addEventListener("load", function(evt){
      console.log("comlete:"+JSON.stringify(evt));
      if(onComplete){
          onComplete(evt);
      }

    });
    xhr.upload.addEventListener("error", function(evt){
      console.log("error:"+JSON.stringify(evt));
      if(onError){
          onError(evt);
      }
    });
    xhr.upload.addEventListener("abort", function(evt){
      console.log("abort:"+JSON.stringify(evt));
      if(onAbort){
          onAbort(evt);
      }
    });
    xhr.open("POST", s3.baseURL);
    xhr.send(formData);
  }
}
