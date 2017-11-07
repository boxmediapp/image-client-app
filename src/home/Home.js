import React, {Component} from 'react'
import {api} from "../api";


import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'
import  "./styles/index.css";
import {textValues} from "../configs";
import {AppHeader} from "../components";


export  default class Home extends Component {
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

    render(){
        return (
          <div>
            <AppHeader selected="home"/>

              <div style={AppHeader.styles.content}>
                  <div className="dataContainer">
                      <div className="datarow">
                          <div className="datalabel">
                             Number of images:
                           </div>
                           <div className="dataValue">{this.state.nunberOfImages}</div>
                      </div>


                      <div className="datarow">
                          <div className="datalabel">
                             Number of image sets:
                           </div>
                           <div className="dataValue">{this.state.numberOfImageSets}</div>
                      </div>


                      <div className="datarow">
                          <div className="datalabel">
                             Episodes missing images:
                           </div>
                           <div className="dataValue">{this.state.numberOfEpisodesMissingImages}</div>
                      </div>

                      <div className="datarow">
                          <div className="datalabel">
                             Images waiting approved:
                           </div>
                           <div className="dataValue">{this.state.numberOfImageWaitingApproved}</div>
                      </div>

                      <div className="datarow">
                          <div className="datalabel">
                             Images approved:
                           </div>
                           <div className="dataValue">{this.state.numberOfImageApproved}</div>
                      </div>


                  </div>
             </div>




          </div>
        );

    }

}
