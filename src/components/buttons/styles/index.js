import {localImages,textValues} from "../../../configs";

var iconWidth=100;
var iConHeight=100;

export const styles={
  bigIConContainer:{
    width:iconWidth,
    height:iConHeight
  },
  bigIcon:{
      width:iconWidth,
      height:iConHeight,
      borderRadius: iconWidth/2,
      WebkitBorderRadius: iConHeight/2,
      mozBorderRadius: iConHeight/2,
      border:"1px solid red",
      backgroundColor:"#42CCB5",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      color: "white",
      fontFamily: "'Roboto', sans-serif",
       background: 'url("'+localImages.button+'") no-repeat scroll 0 0 transparent',
  },
  title:{
      fontSize:20
  },
  content:{



  }
};
