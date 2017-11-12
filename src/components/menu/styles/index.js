

export const styles={
  header: function(){

    var ret= {
        position:"fixed",
        width:"100%",
        height:80,
        display:"flex",
        flexDirection: "row",
        backgroundColor: "#e2277c",
        zIndex:10

    };
    if(!styles.mql.matches){
      ret.width="100vw";
    }
    return ret;
  },
  titleContainer:{
    display:"flex",
    flexDirection: "row"
  },
  mql:window.matchMedia(`(min-width: 700px)`),
  topnav: {
    overflow: "hidden",
    marginRight:30,
    marginTop:50,
    width:"100%",
    display:"flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",


  },
  menuItem:function(isSelected,hover){
    var ret= {
      float: "left",
      display: "block",
      textAlign: "center",
      padding: "8px 16px",
      textDecoration: "none",
      fontSize: 17,
      marginBottom: 10,
      border: "1px solid #AA4444",
      backgroundColor: "#e2277c",
      color:"white",
      whiteSpace:"nowrap"
    };

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
  appTitle:{
    fontFamily: "'Roboto', sans-serif",
    textTransform: "uppercase",
    fontWeight: 500,
    fontSize: 28,
    color: "#FFFFFF",
    whiteSpace: "nowrap",
    position:"absolute",
    top: 10,
    left: 200
  },
  menuItems:function(){
    const isMobile=!styles.mql.matches;
    if(isMobile){
        return{
            position:"absolute",
            top:80,
            display:"flex",
            flexDirection:"column",
            backgroundColor:"white",
            border:"1px solid #07C"
        };

    }
    else{
      return {

      };
    }


  },

  content:{
    position:"absolute",
    marginTop:90,
    width:"100%",
    padding:20


  },
  mobileMenu:{
     position:"abolute",
     left:10,


  }

};
