import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import {textValues} from  "./configs";

import {EpisodeView,ContractEpisodeNumberView} from "./assign-image-view";
import {NewEpisodesView} from "./new-episodes";
import {ListScheduleEpisodesView} from "./list-schedule-episodes";

import {ClientImagesView} from "./clients-view";
import {Home} from "./home";
import {ManageCacheView,ScheduleImportView} from "./admin";

import {ListImageSetView} from "./list-image-sets";
import {ListAssignedEpisodesView} from "./list-assigned-episodes";
import {ModalDialog} from "./components";

export default class RenderImageApp extends Component{

  render(){
    return (
            <Router>
              <div className="topContainer">
                  <Route  path={textValues.home.link} exact component={Home}/>
                  <Route  path={textValues.newepisodes.link}  component={NewEpisodesView}/>
                  <Route path={textValues.assignImageByEpisode.link} component={EpisodeView}/>
                  <Route path={textValues.imagesets.link} component={ListImageSetView}/>
                  <Route path={textValues.assignedEpisodes.link} component={ListAssignedEpisodesView}/>

                  <Route path={textValues.assignImageByContractAndEpidodeNumber.link} component={ContractEpisodeNumberView}/>
                  <Route path={textValues.clientsView.link} component={ClientImagesView}/>
                  <Route path={textValues.cacheMamnagement.link} component={ManageCacheView}/>
                  <Route path={textValues.scheduleImport.link} component={ScheduleImportView}/>
                  <Route path={textValues.listScheduleEpisodes.link} component={ListScheduleEpisodesView}/>
                  
              </div>

            </Router>
      )
  }
}
