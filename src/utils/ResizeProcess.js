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
        if(!this.caller.props.contractNumber || !this.caller.props.episodeNumber){
           throw Error("contractNumber or epsiodeNumber is empty, failed to create:"+JSON.stringify(data));
        }
        var imageset={
             programmeNumber:this.caller.props.contractNumber+"/"+this.caller.props.episodeNumber,
             title:this.caller.state.title,
             imageSetType:this.caller.state.imageSetType,
             fileCounter:this.caller.props.fileCounter
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
                       tags:this.caller.state.tags,
                       imageSet:imageSet,
                       imageStatus:'APPROVED',
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

        this.width=imageRequirements[this.step].width;
        this.height=imageRequirements[this.step].height;
        this.imageType=imageRequirements[this.step].type;
        this.caller.setResizeProperty(this.width, this.height,this.imageType);

        var resizeRequest={
          imageURL:imageUtil.getS3ImageURL(this.image),
          sourceWidth:this.image.width,
          sourceHeight:this.image.height,
          sourceX:0,
          sourceY:0,
          destX:0,
          destY:0,
          destWidth:this.width,
          destHeight:this.height,
          imageType:this.imageType,
          onComplete:this.onResizeComplete.bind(this)
        };

        this.processResizeRequest(resizeRequest);

        imageUtil.resizeImage(resizeRequest);
      }
      processResizeRequest(resizeRequest){
          var {sourceX,sourceY,sourceWidth,sourceHeight,destWidth,destHeight}=resizeRequest;

          if(Math.round(sourceWidth*destHeight/sourceHeight)==destWidth){
                return;
          }
          var widthDiff=sourceWidth-destWidth;
          var heightDiff=sourceHeight-destHeight;
          var maxWidth=widthDiff>=0?sourceWidth:destWidth;
          var maxHeight=heightDiff>=0?sourceHeight:destHeight;
          if(Math.abs(widthDiff/maxWidth)>Math.abs(heightDiff/maxHeight)){
                resizeRequest.sourceX=(sourceWidth-(sourceHeight*destWidth/destHeight))/2;
                resizeRequest.sourceY=0;
                resizeRequest.sourceWidth=sourceWidth-resizeRequest.sourceX*2
          }
          else{
              throw Error("Not Supported yet");
          }


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
           imageStatus:'APPROVED',
        };
        api.createImage(image).then(image=>{
              this.goto(this.step+1);
        });

      }

}
