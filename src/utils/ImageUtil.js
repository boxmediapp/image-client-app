

var normalImageWidth=480;
var normalImageHeight=270;

var mobileImageWidth=190;
var mobileImageHeight=108;



export default class ImageUtil{

  getImageType(content){
    if(!content){
      console.log("Failed to read the file");
      return null;
    }
    var dataPrefix="data:";
    var dataPrefixLength=dataPrefix.length;
    var ib=content.indexOf(dataPrefix);
    if(ib!==0){
        console.log("Failed to read file content");
        return null;
    }
    var slashIndex=content.indexOf('/',dataPrefixLength);
    if(slashIndex<=0){
      console.log("wrong format, slash missing");
      return null;
    }
    var imageString=content.substring(dataPrefixLength,slashIndex);
    if(imageString!=="image"){
      console.log("It is not a image type");
      return null;
    }
    var semiColnIndex=content.indexOf(';',slashIndex+1);
    if(semiColnIndex<=0){
         console.log("Failed to get the image type");
         return null;
    }
    var imageType=content.substring(slashIndex+1,semiColnIndex);
    if(!imageType){
          console.log("empty image type");
          return null;
    }
    return imageType;
  }
  loadImage(imageURL, onComplete){
    var img=new Image();
    img.onload=()=>{
        onComplete(img);
    };
    img.src=imageURL;
  }
  getImagePreviewAndInfo(acceptedFile,onSucess, onError){
        let reader = new FileReader();
        reader.onloadend = () => {
            var imageType=this.getImageType(reader.result);
            var file=acceptedFile;
            var imagePreviewUrl=reader.result;
            if(!imageType){
                onError("The file is not recognized as image type");
                return;
            }
            this.loadImage(imagePreviewUrl,img=>{
                    var imageProperty={file,imagePreviewUrl,imageType,width:img.width,height:img.height};
                    imageProperty.transparency=this.getImageTransParency(imageProperty);
                    onSucess(imageProperty);
                  });
            };
        reader.readAsDataURL(acceptedFile);
  }
  getImageTransParency(imageProperty){
      var img=new Image();
      img.crossOrigin='Anonymous'
      img.src=imageProperty.imagePreviewUrl;
      var canvas = document.createElement('canvas');
      canvas.width = imageProperty.width;
      canvas.height = imageProperty.height;
      canvas.getContext('2d').drawImage(img, 0, 0);
      var imgData=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height);
      var data=imgData.data;
      var transparency=0;
      var counter=0;
      for(var i=0;i<data.length;i+=4){
          if(data[i+3]<255){
              transparency++;
          }
          counter++;
      }
      if(counter){
        return transparency/counter;
      }
      else{
        return 0;
      }


  }
  resizeImage(request){
     var image = new Image();
     image.crossOrigin="Anonymous";
     var that=this;
    image.onload = function (imageEvent) {
          var canvas = document.createElement('canvas');
          canvas.width = request.destWidth;
          canvas.height = request.destHeight;
          canvas.getContext('2d').drawImage(image, request.sourceX, request.sourceY,
            request.sourceWidth, request.sourceHeight,request.destX,request.destY,request.destWidth, request.destHeight);
          var dataUrl = canvas.toDataURL('image/'+request.imageType);
          var resizedImage = that.dataURLToBlob(dataUrl);
          request.onComplete(resizedImage);
      }
      image.src = request.imageURL+"?timestamp="+(new Date()).getTime();
  }
  dataURLToBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];
        return new Blob([raw], {type: contentType});
    }

    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);
    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {type: contentType});
  }
  getS3ImageURL(image){
    return image.s3BaseURL+"/"+image.filename;
  }

  calculateFitImageWidth(resolution){
      var width=mobileImageWidth;
      var height=mobileImageHeight;
      var windowMedia=window.matchMedia(`(min-width: 700px)`);
      if(windowMedia.matches){
            width=normalImageWidth;
            height=normalImageHeight;
      }
      if(resolution &&  resolution.width && resolution.height){
          if(resolution.width<=width){
                width=resolution.width;
                height=resolution.height;
          }
           else{
                  width=resolution.width/4;
                  height=resolution.height/4;
                  //height=resolution.height*width/resolution.width;
           }
      }
      return {width, height};
  }

}
