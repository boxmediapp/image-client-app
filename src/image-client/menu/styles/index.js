export const styles={
  header: function(){

    var ret= {
        position:"fixed",
        width:"100%",
        height:80,
        display:"flex",
        flexDirection: "row",
        backgroundColor: "#F5047A",
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
      marginLeft:40
    };
    if(styles.mql.matches){
        ret.marginLeft=1;
    }
    return ret;
  },
  mql:window.matchMedia(`(min-width: 700px)`),
  topnav: {
    overflow: "hidden",
    marginRight:30,
    marginTop:50,
    width:"100%",
    display:"flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",


  },

  appTitleContainer:{
    marginLeft:10,
    paddingTop:5


  },
  appTitle:{
    fontFamily: "GiorgioSans-Regular",
    fontSize: 25,
    fontWeight:400,
    color: "#FFFFFF",
    whiteSpace: "nowrap",
    boxSizing: "inherit"
  },
  appVersion:{
    fontFamily: "GiorgioSans-Regular",
    fontSize: 12,
    color: "#FFFFFF",
    marginLeft:10

  },
  mobileMenu:{
     position:"absolute",
     left:0,
     top:0
  },
  mobileMenuIcon:{
    fontWeight: 'normal',
    fontSize:40,
    color: "white",
    fontStyle: 'normal',
  },
  mobileMenuOverlay:{
    position:"absolute",
      left:0,
      top:0,
      width:"100%",
      height:window.innerHeight,
      backgroundColor:"rgba(8,88,88, 0.5)",
      zIndex:0


  },
  menuItems:function(){
    const isMobile=!styles.mql.matches;
    if(isMobile){
        return{
          position:"absolute",
          display:"flex",
          flexDirection:"column",
          left:0,
          top:0,
          backgroundColor:"white",
          boxShadow: "10px 10px 5px #888888",
          zIndex:1000,
        };

    }
    else{
      return{
          position:"absolute",
          display:"flex",
          flexDirection:"row",
          right:0,
          top:39
      };
    }


  },
  menuItem:function(isSelected,hover){
    const isDesktop=styles.mql.matches;
    var ret= {
      float: "left",
      display: "block",
      textAlign: "center",
      padding: "8px 16px",
      textDecoration: "none",
      fontSize: 17,
      marginBottom: 0,
      fontFamily:"Gobold Thin",
      color:"white",
      whiteSpace:"nowrap"
    };
    if(isDesktop){
        ret.borderTopRightRadius=10;
        ret.borderTopLeftRadius=10;
        ret.marginBottom=10;
        ret.color="#FFFFFF";
    }
    else{
        ret.color="#5C5A5B";
        ret.textAlign="left";
    }
    if(isSelected){
      ret.color="#5C5A5B";
      ret.backgroundColor="white";
    }
    else if(hover){
      ret.backgroundColor="#BFBFBF";
      ret.color="#5C5A5B";
    }




    return ret;
  },
  content:{
    position:"absolute",
    marginTop:90,
    width:"100%",
    padding:20


  },

  logo:{
    maxWidth:80,
    marginLeft:10,
    marginBottom:4
  }

};
