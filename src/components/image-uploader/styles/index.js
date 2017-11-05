import {config} from "../../../configs"
export const styles={

  dropzone:function(imgwidth, imgheight){
    var width=imgwidth;
    var height=imgheight;
    if(imgwidth>config.normalImageWidth){
      width=config.normalImageWidth;
      height=imgheight*width/imgwidth;
    }
    return {
      width: width,
      height: height,
      borderWidth: 2,
      borderColor: 'rgb(102, 102, 102)',
      borderStyle: 'dashed',
      borderRadius: 15,
      display:"flex",
      flexDirection:"column",
      justifyContent:"center"
    };
  },
  uploadButtonContainer:{
    display:"flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginRight:10
  },
  tagContainer:{
    display:"flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  previewImageContainer: {
    display:"flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: 50,
    marginTop: 50,

  },
  imageFooter:{
    display:"flex",
    flexDirection: "row",
  },
  previewText: {
      textAlign: "center"
  },
  dimensionContainer:{
    marginRight: 40,
    border:"1px soid blue"
  }









};
