
export const styles={
  backdropStyle:{
    position: 'fixed',
     top: 0,
     bottom: 0,
     left: 0,
     right: 0,
     backgroundColor: 'rgba(0,0,0,0.3)',
     padding: 50
  },
  modalStyle:{
    backgroundColor: '#fff',
    borderRadius: 5,
    top:50,
    width: "50%",
    height: "50%",
    margin: '0 auto',
    padding: 30,
    border:"1px solid black",
    zIndex:2050,
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-between"
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
