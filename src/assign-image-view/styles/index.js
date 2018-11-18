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
  },
  imageButtonsContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent: "flex-start",
    alignItems: "flex-end",

  },
  backdropStyle:{
    position: 'fixed',
     top: 0,
     bottom: 0,
     left: 0,
     right: 0,
     backgroundColor: 'rgba(0,0,0,0.3)',
     display:"flex",
     flexDirection:"column",
     justifyContent:"center",
     alignItems:"center",
     zIndex:100,

  },
  dialogwindow:{
    backgroundColor: '#fff',
    borderRadius: 15,
    width: "50%",
    height: "50%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    boxShadow: "10px 10px 5px #888888"
  },

  dialogTitle:{
    fontFamily: "'Roboto', sans-serif",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: 20,
    color: "#FFFFFF",
    backgroundColor:"#1a0dab",
    paddingLeft:10
  },
  footer:{
      display: "flex",
      flexDirection:"row",
      justifyContent:"center",
      paddingTop:10,
      paddingBottom:10,
      paddingLeft:20,
      paddingRight:20,
  },
  buttonContainer:{
    display:"flex",
    flexDirection:"row",
    marginLeft:10,
    marginRight:10

  },
  dialogContent:{
    flex:1,
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    alignItems:"center",
    margin:10

  },
  tableContent:{
      margin:10,
      display:"flex",
      flexDirection:"column",
      justifyContent:"start",
      alignItems:"center",

      width:"100%"
  },

  imageSetDialogwindow:{
    backgroundColor: '#fff',
    borderRadius: 15,
    width: "90%",
    height: "90%",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between",
    boxShadow: "10px 10px 5px #888888"
  },
  imageSetDialogContent:{
    flex:1,
    display:"flex",
    flexDirection:"column",
    justifyContent:"start",
    alignItems:"center",
    margin:10,
    overflow:"scroll"
  },
  dialogTable:{
      marginTop:50,
      borderCollapse: "collapse",
      width: "100%"
  },
  dialogTableHeader:{
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: 8
  },
  dialogTableDataCell:{
    border: "1px solid #dddddd",
    textAlign: "left",
    padding: 8,
  },
  existingImageCell:{
    border: "5px solid #ff0000",
    textAlign: "left",
    padding: 8,

  },
  emptyImageCell:{
    border: "5px solid #0000ff",
    textAlign: "left",
    padding: 8,

  },

  imagethumbnailContainer:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"start"
  },

  imageDialogSetContainer:{
      width: 100,

  },


};
