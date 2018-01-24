import React, {Component} from 'react'

import {localImages,config} from "../../configs";
import {textValues} from "../configs";
import TopMenu from "./TopMenu";
import {styles} from "./styles";
import {appdata} from "../../store";
export  default class AppHeader extends Component {
  constructor(props){
      super(props);
      this.state={mql:styles.mql};
      this.mediaQueryChanged=this.mediaQueryChanged.bind(this);
  }
  componentWillMount(){
    styles.mql.addListener(this.mediaQueryChanged);
  }
  componentWillUnmount() {
    styles.mql.removeListener(this.mediaQueryChanged);
  }
  mediaQueryChanged(){
    this.setState(Object.assign({}, this.state, {mql:styles.msql}));
  }

    render(){
      var userinfo=appdata.getUserInfo();

        return (
            <div style={styles.header()}>
                    <div style={styles.titleContainer()}>
                            <img src={localImages.logo} style={styles.logo}/>
                             <div style={styles.appTitleContainer}>
                                  <div style={styles.appTitle}>{textValues.title}</div>
                                  <div style={styles.appVersion}>v{config.version}</div>
                            </div>
                            <div style={styles.userinfo}>{userinfo.username}</div>  
                    </div>
                    <div></div>

                      <TopMenu selected={this.props.selected}/>



              </div>

        );

    }
    /*
    render(){
      return(
        <TopMenu selected={this.props.selected}/>
      );

    }
*/
}

AppHeader.styles=styles;
