import React, {Component} from 'react'
import {api} from "../api";


import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'
import  "./styles/index.css";
import {textValues} from "../configs";
import {AppHeader} from "../components";


export  default class AdminView extends Component {
    constructor(props){
      super(props);
      this.state={nunberOfImages:0,numberOfImageSets:0,numberOfEpisodesMissingImages:0,
                 numberOfImageWaitingApproved:0,numberOfImageApproved:0};
      this.loadSummaries();
    }
    loadSummaries(){
      api.getSummaries().then(summaries=>{
        var {nunberOfImages,numberOfImageSets,numberOfEpisodesMissingImages,
                   numberOfImageWaitingApproved,numberOfImageApproved}=summaries;
        this.setState(Object.assign({},this.state,{nunberOfImages,numberOfImageSets,numberOfEpisodesMissingImages,
                   numberOfImageWaitingApproved,numberOfImageApproved}));
      });
    }

    invalidateAllClientImage(){
      var command={
                          command:"invalidate-client-image-cdn-cache",
                          filename:""
                  };
      api.sendCommand(command);
    }

    render(){

        return (
          <div>
            <AppHeader selected="home"/>

              <div style={AppHeader.styles.content}>

                  <div className="dataContainer">
                             <button onClick={evt=>this.invalidateAllClientImage()} className="btn btn-primary btn-normal">Clear CDN Cache</button>
                  </div>
             </div>




          </div>
        );

    }

}
