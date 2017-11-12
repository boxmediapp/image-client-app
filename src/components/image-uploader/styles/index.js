import {config} from "../../../configs"
import {imageUtil} from "../../../utils"
export const styles={
  mql:window.matchMedia(`(min-width: 700px)`),
  dropzone:function(width, height){
    var fitResolution=imageUtil.calculateFitImageWidth({width,height});
    return {
      width: fitResolution.width,
      height: fitResolution.height,
      borderWidth: 2,
      borderColor: 'rgb(102, 102, 0)',
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
    marginRight:10,
    marginTop:10
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
