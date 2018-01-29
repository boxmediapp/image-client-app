import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import {textValues} from  "./configs";

import {EpisodeView,ContractEpisodeNumberView} from "./assign-image-view";
import {NewEpisodesView} from "./new-episodes";
import {ListScheduleEpisodesView} from "./list-schedule-episodes";


import {Home} from "./home";
import {ManageCacheView} from "./manage-cache";
import {ManageImportScheduleView} from "./manage-schedule-import";

import {ListImageSetView} from "./list-image-sets";
import {ListAssignedEpisodesView} from "./list-assigned-episodes";
import {ModalDialog} from "./components";
import {AdminView} from "./admin";
import {ManageUsersView} from "./manage-users";
import {AccountView} from "./account";
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

                  <Route path={textValues.manageCache.link} component={ManageCacheView}/>
                  <Route path={textValues.manageSchduleImport.link} component={ManageImportScheduleView}/>
                  <Route path={textValues.listScheduleEpisodes.link} component={ListScheduleEpisodesView}/>
                  <Route path={textValues.admin.link} component={AdminView}/>
                  <Route path={textValues.manageUser.link} component={ManageUsersView}/>
                  <Route path={textValues.account.link} component={AccountView}/>



              </div>

            </Router>
      )
  }
}
