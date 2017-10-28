import {textValues,imageRequirements} from "../configs";

import {api} from "../api";

import ImageUtil from "./ImageUtil";
import GenericUtil from "./GenericUtil";
import {episodedata,store,appdata} from "../store";
const imageUtil=new ImageUtil();
const genericUtil=new GenericUtil();


export default class ResizeProcess{
      constructor(caller,data){
        this.caller=caller;
        this.data=data;
        this.appconfig=appdata.getAppConfig();
      }
      createImageSet(data){
        var imageset={
             episodeId:this.data.episodeId,
             programmeNumber:this.data.contractNumber+"/"+this.data.episodeNumber,
             title:this.data.title,
             fileCounter:this.data.fileCounter
        }
        return api.createImageSet(imageset);
      }

      buildFileName(width, height, filetype){
        var appconfig=appdata.getAppConfig();
        var uploadFilename=genericUtil.buildImageFileName(this.data.contractNumber,this.data.episodeNumber,this.data.fileCounter,width, height,filetype);
        return this.appconfig.imageClientFolder+"/"+uploadFilename;
      }

      onMainAssetUploaded(data){
            this.createImageSet(data).then(imageSet=>{
                    var image={
                       filename:data.filepath,
                       s3BaseURL:data.baseURL,
                       width:data.width,
                       height:data.height,
                       tags:data.imageTags,
                       imageSet:imageSet,
                       imageStatus:'WAITING_APPROVE',
                    };
                    api.createImage(image).then(image=>{
                          this.startResizeProcess(imageSet,image);
                    });
              });
        }
        isMainImageSizeCorrect(width, height){
            return width && height && width==1920 && height ==1080;
        }
        getSourceImageInfo(){
          return {
              width:this.image.width,
              height:this.image.height,
              imageURL:imageUtil.getS3ImageURL(this.image)
          };
        }
      startResizeProcess(imageSet,image){
         this.imageSet=imageSet;
         this.image=image;
         this.goto(1);
      }
      goto(step){
            this.step=step;
            if(step>=imageRequirements.length){
              this.caller.onProcessCompleted();
            }
            else{
                  this.caller.startResize(this.step,this.imageSet,this.image);
                  this.startResize();
            }
      }
      startResize(){
        var imageURL=imageUtil.getS3ImageURL(this.image);
        var sourceWidth=this.image.width;
        var sourceHeight=this.image.height;
        var sourceX=0;
        var sourceY=0;
        var destX=sourceX;
        var destY=sourceY;
        var destWidth=imageRequirements[this.step].width;
        var destHeight=imageRequirements[this.step].height;

        this.width=destWidth;
        this.height=destHeight;
        var imageType="png";
        this.imageType=imageType;
        imageUtil.resizeImage({imageURL,sourceWidth,sourceHeight,sourceX,sourceY,destX,destY,destWidth,destHeight,
          imageType,onComplete:this.onResizeComplete.bind(this)});
      }
      onResizeComplete(resizedImage){
          var filepath=this.buildFileName(this.width, this.height,this.imageType);
          var uploadRequest={
                    file:filepath,
                    bucket:this.appconfig.imageBucket
          };
         api.requestS3UploadURL(uploadRequest).then(s3=>{
           this.filepath=s3.file;
           this.baseURL=s3.baseURL;
           genericUtil.startUpload({s3,
                file:resizedImage,
                onProgress:this.onUploadProgess.bind(this),
                onComplete:this.onUploadComplete.bind(this),
                onError:this.onUploadError.bind(this),
                onAbort:this.onUploadAborted.bind(this)
           });

        });
      }

      onUploadProgess(progressValue,total){
        this.caller.setProgressValue(progressValue,total);
      }
      onUploadError(result){
        console.log("error:"+JSON.stringify(result));
        this.caller.clearProgress();
        this.caller.setErrorMessage(textValues.upload.failed);
      }
      onUploadAborted(){
        this.caller.clearProgress();
        this.caller.setErrorMessage(textValues.upload.aborted);
      }
      onUploadComplete(data, props){
        var image={
           filename:this.filepath,
           s3BaseURL:this.baseURL,
           width:this.width,
           height:this.height,
           tags:this.image.tags,
           imageSet:this.imageSet,
           imageStatus:'WAITING_APPROVE',
        };
        api.createImage(image).then(image=>{
              this.goto(this.step+1);
        });

      }

}
