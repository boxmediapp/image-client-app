
export const styles={

    imageSetContainer:{
        margin:50,
        backgroundColor:"#CCDDEE"


    },
    newImageSetContainer:{
      margin:50,
      backgroundColor:"#CCDDEE"
    },
    previewImageContainer: {
      display:"flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      marginLeft: 50,
      marginTop: 50
    },
    image:function(imgwidth, imgheight){
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
    imageProperty:{
          width:533,
          height:250,
          display:"flex",
          flexDirection:"column",
          justifyContent:"flex-start",
          alignItems:"flex-start"

    }
    


};
