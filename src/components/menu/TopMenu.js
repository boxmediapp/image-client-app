import React, {Component} from 'react'
import {textValues} from  "../../configs";
import {genericUtil} from "../../utils";
import {
  Link

} from 'react-router-dom'

import './styles/TopMenu.css';
import {appdata} from "../../store";

export  default class TopMenu extends Component {
  constructor(props){
      super(props);
      this.state={menuPressed:false};
  }

  menuPressed(){
      console.log("pressed");
      this.setState(Object.assign({},this.state,{menuPressed:!this.state.menuPressed}));
  }
  logout(){

    genericUtil.saveCred("","");
    appdata.setCredentials(null,null);
  }
  render() {
    var responsiveMenuClass="topnav";
    if(this.state.menuPressed){
       responsiveMenuClass="topnav responsive";
    }

    return (
               <div className={responsiveMenuClass} id="myTopnav">
                    <Link to={textValues.home.link} className={this.props.selected==="home"?"selected":"notSelected"}>
                          {textValues.home.linkText}
                    </Link>
                    <Link to={textValues.episode.list.link} className={this.props.selected==="episodelink"?"selected":"notSelected"}>
                          {textValues.episode.list.linkText}
                    </Link>
                    <Link to={textValues.imageSets.list.link} className={this.props.selected==="imagesets"?"selected":"notSelected"}>
                          {textValues.imageSets.list.linkText}
                    </Link>

                    <Link to={textValues.clients.link} className={this.props.selected==="clients"?"selected":"notSelected"}>
                          {textValues.clients.linkText}
                    </Link>


                    <Link to={textValues.logout.link} className="notSelected" onClick={(evt) => {
                             this.logout();
                         }}>
                          {textValues.logout.linkText}
                    </Link>

                    <a className="icon" onClick={this.menuPressed.bind(this)}>&#9776;</a>
               </div>
            );
  }
}
