export const styles={

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
