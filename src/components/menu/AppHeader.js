import React, {Component} from 'react'

import {localImages,textValues} from "../../configs";
import TopMenu from "./TopMenu";
import {styles} from "./styles";
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

        return (
            <div style={styles.header}>
                    <div style={styles.titleContainer}>
                            <img src={localImages.logo} className="logo"/>
                    </div>

                      <TopMenu selected={this.props.selected}/>

                      <div style={styles.appTitle}>{textValues.title}</div>

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
