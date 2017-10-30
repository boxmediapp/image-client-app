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

                    <a className="icon" onClick={this.menuPressed.bind(this)}>&#9776;</a>
               </div>
            );
  }
}
