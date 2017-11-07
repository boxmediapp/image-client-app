import React, {Component} from 'react'
import {textValues} from  "../../configs";
import {genericUtil} from "../../utils";
import {
  Link

} from 'react-router-dom'


import {appdata} from "../../store";
import {styles} from "./styles";
export  default class TopMenu extends Component {
  constructor(props){
      super(props);
      this.state={menuPressed:false, mql:styles.mql};
  }
  componentWillMount(){
    this.mediaQueryChanged=this.mediaQueryChanged.bind(this);
    styles.mql.addListener(this.mediaQueryChanged);
  }
  componentWillUnmount() {
    styles.mql.removeListener(this.mediaQueryChanged);
  }
  mediaQueryChanged(){
    this.setState(Object.assign({}, this.state, {mql:styles.msql}));
  }


  menuPressed(){
      this.setState(Object.assign({},this.state,{menuPressed:!this.state.menuPressed}));
  }


  render() {


    return (
               <div style={styles.topnav}>
                    <MobileMenuIcon menuPressed={this.menuPressed.bind(this)}/>
                    <ListMenuItems {...this.props} menuPressed={this.state.menuPressed}/>



               </div>
            );


    }


}

class MobileMenuIcon extends Component{
  render(){
      if(styles.mql.matches){
        return null;
      }
      else{
          return (
              <a className="icon" onClick={this.props.menuPressed}>&#9776;</a>
          );
      }
  }
}
class ListMenuItems extends Component{

  render(){
     if(styles.mql.matches || this.props.menuPressed){
       return(
           <div style={styles.menuItems(!styles.mql.matches)}>

             <MenuItem {...this.props} displayItem="home" selected={this.props.selected}/>
             <MenuItem  {...this.props} displayItem="episodeList" selected={this.props.selected}/>
             <MenuItem  {...this.props} displayItem="imagesets" selected={this.props.selected}/>
             <MenuItem  {...this.props} displayItem="clients" selected={this.props.selected}/>
             <LogoutMenuItem/>



           </div>
           );
     }
     else{
       return null;
     }


  }
}

class MenuItem extends Component{
  constructor(props){
    super(props);
    this.state={hover:false}
  }
  onHover(){
    this.setState({hover: true})
  }
  offHover(){
    this.setState({hover: false})
  }
  render(){
    var link=textValues[this.props.displayItem].link;
    if(!link){
      link="/";
    }
    var linkText=textValues[this.props.displayItem].linkText;    
      return(
        <Link to={link} style={styles.menuItem(this.props.selected===this.props.displayItem, this.state.hover)}
          onMouseEnter={this.onHover.bind(this)} onMouseLeave={this.offHover.bind(this)}>
              {linkText}
        </Link>
      );

  }
}


class LogoutMenuItem extends Component{
  constructor(props){
    super(props);
    this.state={hover:false}
  }
  logout(){

    genericUtil.saveCred("","");
    appdata.setCredentials(null,null);
  }
  onHover(){
    this.setState({hover: true})
  }
  offHover(){
    this.setState({hover: false})
  }
  render(){
    var linkText=textValues.logout.linkText;
    return(
        <a href="#" style={styles.menuItem(false, this.state.hover)}
          onMouseEnter={this.onHover.bind(this)} onMouseLeave={this.offHover.bind(this)}  onClick={(evt) => {
                   this.logout();
               }}>
              {linkText}
        </a>
      );
  }
}
