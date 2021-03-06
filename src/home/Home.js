import React, {Component} from 'react'
import {api} from "../api";


import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'
import  "./styles/index.css";
import {textValues} from "../configs";
import {AppHeader,BigButton} from "../components";


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
                    <BigButton label={textValues.listScheduleEpisodes.linkText}
                             content={textValues.listScheduleEpisodes.actionText}
                             link={textValues.listScheduleEpisodes.link}/>

                      <BigButton label={textValues.newepisodes.linkText}
                               content={textValues.newepisodes.actionText}
                               link={textValues.newepisodes.link}/>

                      <BigButton label={textValues.assignedEpisodes.linkText}
                                content={textValues.assignedEpisodes.actionText}
                                link={textValues.assignedEpisodes.link}/>


                              <BigButton label={textValues.admin.linkText}
                                          content={textValues.admin.actionText}
                                          link={textValues.admin.link}/>





                  </div>
             </div>




          </div>
        );

    }

}
