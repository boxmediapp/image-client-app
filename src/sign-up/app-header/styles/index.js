export const styles={
  header: function(){

    var ret= {
        width:"100%",
        height:90,
        display:"flex",
        flexDirection: "row",
        backgroundColor: "#FFFFFF",
        zIndex:100
    };
    if(!styles.mql.matches){
      ret.width="100vw";
    }
    return ret;
  },
  titleContainer:function(){
    var ret={
      display:"flex",
      flexDirection: "row",
      marginLeft:40,
      justifyContent: "center",
      alignItems: "center",
    };
    if(styles.mql.matches){
        ret.marginLeft=1;
    }
    return ret;
  },
  mql:window.matchMedia(`(min-width: 700px)`),


  appTitleContainer:{
    marginLeft:5,
    paddingTop:5
  },
  appTitle:{
    fontFamily: "GiorgioSans-Regular",
    fontSize: 24,
    fontWeight:400,
    color: "#888888",
    whiteSpace: "nowrap",
    boxSizing: "inherit"
  },
  appVersion:{
    fontFamily: "GiorgioSans-Regular",
    fontSize: 12,
    color: "#FFFFFF",
    marginLeft:10

  },

  content:{
    width:"100%",
    backgroundColor:"#E6E6E6",
    padding:20,
    paddingBottom:100,
    paddingTop:50,
    minHeight:window.innerHeight-120,
  },

  logo:{
    marginLeft:20,
    marginTop:10,

  }

};
