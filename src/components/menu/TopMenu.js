import React, {Component} from 'react'
import {textValues} from  "../../configs";
import {
  Link

} from 'react-router-dom'

import './styles/TopMenu.css';

export  default class TopMenu extends Component {
  constructor(props){
      super(props);
      this.state={menuPressed:false};
  }

  menuPressed(){
      console.log("pressed");
      this.setState(Object.assign({},this.state,{menuPressed:!this.state.menuPressed}));
  }
  render() {
    var responsiveMenuClass="topnav";
    if(this.state.menuPressed){
       responsiveMenuClass="topnav responsive";
    }
    var homeClass="notSelected";
    var qrprintingClass="notSelected";
    var contactUsClass="notSelected";
    var documentationClass="notSelected";
    var pricingClass="notSelected";
    if(this.props.selected==="home"){
          homeClass="selected";
    }
    else if(this.props.selected==="qrprinting"){
          qrprintingClass="selected";
    }
    else if(this.props.selected==="documentation"){
          documentationClass="selected";
    }
    else if(this.props.selected==="pricing"){
            pricingClass="selected";
    }



    return (
               <div className={responsiveMenuClass} id="myTopnav">
                    <Link to={textValues.topmenu.home.link} className={homeClass}>
                          {textValues.topmenu.home.linkText}
                    </Link>

                    <a className="icon" onClick={this.menuPressed.bind(this)}>&#9776;</a>
               </div>
            );
  }
}
