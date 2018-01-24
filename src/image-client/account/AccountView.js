import React, {Component} from 'react'

import {genericUtil} from "../../utils";


import {api} from "../api";
import {textValues} from "../configs";
import {styles} from './styles';

import {AppHeader} from "../app-header";
import {BigButton} from "../../components";


export default class AccountView extends Component{
  render(){

      return (
        <div>
          <AppHeader selected="account"/>

            <div style={AppHeader.styles.content}>

                <div className="dataContainer">
                    <BigButton label={textValues.account.changePassword.linkText}
                              content={textValues.account.changePassword.actionText}
                              link={textValues.account.changePassword.link}/>

                </div>
           </div>




        </div>
      );

  }

}
