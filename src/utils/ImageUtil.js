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

}
