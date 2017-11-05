
export const styles={
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
     alignItems:"center"
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
  title:{
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
  content:{
    textAlign:"center",
    fontSize: 16,
  },
  footer:{
      display: "flex",
      flexDirection:"row",
      justifyContent:"center",
      paddingBottom:10
  },
  imageBackdropStyle:{
    position: 'absolute',
     top: 0,
     left: 0,

     backgroundColor: 'rgba(0,0,0,1)',
     padding: 50,
     zIndex:30050,
  },
  imageModalStyle:{
    backgroundColor: '#fff',
    top:50,
    margin: '0 auto',
    padding: 30,
    border:"1px solid black",
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between"
  },
  modalImage:function(width, height){
    return{
      width:width,
      height:height
    }
  },
  imageTitle:{
    textAlign:"center",
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 500,
    fontSize: 20,
    color: "#FFFFFF",
  }


};
