

export const styles={
   mql:window.matchMedia(`(min-width: 800px)`),
   imageSetContainer:{
        margin:50,
        backgroundColor:"#CCDDEE",
        border:"1px solid black",
        boxShadow: "10px 10px 5px #888888"
    },
    newImageSetContainer:{
      margin:50,
      backgroundColor:"#CCDDEE",
      border:"1px solid black",
      paddingBottom:20,
      boxShadow: "10px 10px 5px #888888"
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

    },
    imageRightProperty:{
      paddingLeft:20,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop:20
    },


    imageRecord:function(){
      var st={
      backgroundColor: "#EEEEEE",
      marginBottom: 30,
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      display:"flex",
      flexDirection:"column",
      border:"1px solid #888888",      
      boxShadow: "5px 5px 2px #888888"

      };
      if(this.mql.matches){
          st.flexDirection="row"
      }
      return st;
  }




};
