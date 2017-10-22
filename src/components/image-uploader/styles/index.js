
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

  progressBar: function(width){
    return{
        position:"relative",
        maxWidth: "100%",
        top: -150,
        left: 0,
        border:"1px solid black",
        width:width,
        height:30,
        backgroundColor:"rgba(255,255,255,0.2)  "
      };
 },
progressBarProgress: function(width){
   return{
       maxWidth: "100%",
       border:"1px solid black",
       width:width,
       height:30,
       backgroundColor:"rgba(255,255,255,0.8)  "
     };
}




};
