import React, {Component} from 'react'



import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'
import  "./styles/index.css";
import {textValues} from "../configs";
import {BigButton} from "../../components";
import {AppHeader} from "../menu";


export  default class Home extends Component {


    render(){

        return (
          <div>
            <AppHeader selected="home"/>

              <div style={AppHeader.styles.content}>

                  <div className="dataContainer">

                      <BigButton label={textValues.imageSearch.linkText}
                                content={textValues.imageSearch.actionText}
                                link={textValues.imageSearch.link}/>





                  </div>
             </div>




          </div>
        );

    }

}
