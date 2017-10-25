
export const styles={

  dropzone:function(imgwidth, imgheight){
    var width=533;
    var height=300;
    if(imgwidth && imgheight){
           if(imgheight<=height){
             width=imgwidth;
             height=imgheight;
           }
           else{
                 width=imgwidth*height/imgheight;
           }
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
    alignItems: "flex-end"
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
    marginTop: 50
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
