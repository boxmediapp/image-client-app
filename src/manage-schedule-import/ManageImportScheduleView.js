import React, {Component} from 'react'
import {api} from "../api";


import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'

import {textValues,config} from "../configs";
import {genericUtil} from "../utils";


import {AppHeader,ModalDialog} from "../components";

import "./styles/index.css";

import {styles} from "./styles";
export  default class ManageImportScheduleView extends Component {
    constructor(props){
      super(props);
      this.state={modalMessage:null, tasks:[], channels:[]};

    }
    componentWillMount(){
      this.startLoadTasks();
      this.startLoadChannels();
    }
    startLoadTasks(){
      api.getTasks(config.importScheduleType).then(tasks=>{
          this.setTasks(tasks);
      }).catch(error=>{
        this.setErrorMessage("failed to load the tasks:"+error);
      });
    }
    startLoadChannels(){
      api.getAllBoxChannels().then(channels=>{
          this.setChannels(channels);
      }).catch(error=>{
        this.setErrorMessage("failed to load the channels:"+error);
      });
    }
    setTasks(tasks){
      this.setState(Object.assign({},this.state,{tasks}));
    }
    setChannels(channels){
      this.setState(Object.assign({},this.state,{channels}));
    }

    onClearMessage(){
      this.setState(Object.assign({}, this.state,{modalMessage:null}));
    }
    removeTask(task){
        if(!task){
            return;
        }
        var tasks=this.state.tasks.filter(t=>t!==task);
        this.setState(Object.assign({},this.state,{tasks}));
        if(task.id){
            api.removeTask(task).then(result=>{
                this.startLoadTasks();
            }).catch(error=>{
              this.setErrorMessage("failed to remove the task:"+error);
              this.startLoadTasks();
            });
        }

    }
    createTask(request){
      if(!request.runOnTime){
        return;
      }
      if(!request.fromDayOffset){
        return;
      }
      if(!request.toDayOffset){
        return;
      }
      if(!request.channelId){
        return;
      }
      var tasks=this.state.tasks;
      var task={
        taskType:"REPEATED",
        runOnTime:request.runOnTime,
        importScheduleTask:{
                   fromDayOffset:request.fromDayOffset,
                   toDayOffset:request.toDayOffset,
                   channelId:request.channelId,
                   type:"Press",
                   info:"Episode",
                   importScheduleType:"IMPORT_BOX_EPISODE"
         }
      };
      tasks.push(task);
      this.setState(Object.assign({}, this.state,{tasks}));
      api.createTask(task).then(result=>{
          this.startLoadTasks();
      }).catch(error=>{
          this.setErrorMessage("failed to create the task:"+error);
          this.startLoadTasks();
      });
    }

    setErrorMessage(content){
       var modalMessage={
              title:"Error",
              content,
              onConfirm:this.onClearMessage.bind(this),
              confirmButton:"OK"
       }
       this.setState(Object.assign({}, this.state,{modalMessage}));
    }






    render(){

        return (
          <div>
            <AppHeader selected="home"/>

              <div style={AppHeader.styles.content}>
                  <ShowTaskListTable tasks={this.state.tasks} channels={this.state.channels} removeTask={this.removeTask.bind(this)}/>
                  <CreateNewScheduledImport createTask={this.createTask.bind(this)} channels={this.state.channels}/>
                  <ModalDialog message={this.state.modalMessage}/>
             </div>




          </div>
        );

    }

}
class ShowTaskListTable extends Component{
      render(){
          if(this.props.tasks && this.props.tasks.length>0){
              return(
                <table style={styles.tasksTable}>
                  <tr style={styles.tasksTableHeader}>
                     <th>Channel</th>
                     <th>Time</th>
                     <th>From</th>
                     <th>To</th>
                     <th></th>
                  </tr>
                  <ShowTasksRowData {...this.props}/>
                </table>
              );
          }
          else{
            return null;
          }
      }


}
class ShowTasksRowData extends Component{

  render(){
          return this.props.tasks.map(task=>this.renderTask(task));
        }
  renderTask(task){
    var channelText=task.importScheduleTask.channelId;
    if(this.props.channels){
        var matchedChannel=this.props.channels.filter(channel=>channel.channelId===task.importScheduleTask.channelId);
        if(matchedChannel && matchedChannel.length>0){
          channelText=matchedChannel[0].channelName+" ("+channelText+")";

        }
    }
    return(
            <tr style={styles.taskRecord}>
                <td style={styles.taskField}>{channelText}</td>
                <td style={styles.taskField}>{task.runOnTime}</td>
                <td style={styles.taskField}>{task.importScheduleTask.fromDayOffset}</td>
                <td style={styles.taskField}>{task.importScheduleTask.toDayOffset}</td>
                <td style={styles.taskField}>
                   <button onClick={evt=>this.props.removeTask(task)} className="btn btn-primary btn-normal">Remove</button>
                </td>
            </tr>
          );
  }



}


class CreateNewScheduledImport extends Component{
  constructor(props){
    super(props);
    var timeFromNow=genericUtil.timeValueFromNow(60);


    this.state={runOnTime:timeFromNow,fromDayOffset:1,toDayOffset:2, channelId:"1865244993"};
  }
  setFromDayOffset(fromDayOffset){
    this.setState(Object.assign({},this.state,{fromDayOffset}));
  }
  setToDayOffset(toDayOffset){
    this.setState(Object.assign({},this.state,{toDayOffset}));
  }
  setChannelId(channelId){
    this.setState(Object.assign({},this.state,{channelId}));
  }
  setRunOnTime(runOnTime){
    this.setState(Object.assign({},this.state,{runOnTime}));
  }
  createTask(){
      var data={
        runOnTime:this.state.runOnTime,
        fromDayOffset:this.state.fromDayOffset,
        toDayOffset:this.state.toDayOffset,
        channelId:this.state.channelId
      };
      this.props.createTask(data);

  }


  render(){

      return(
        <div className="container">
               <h1>Create tasks</h1>
               <div className="row">
                    <div className="col-sm-4 formFieldWithLabel">
                      <label htmlFor="fromDayOffset">From (days):</label>
                      <input type="text" className="form-control" id="fromDayOffset"
                      placeholder="fromDayOffset" name="fromDayOffset" value={this.state.fromDayOffset}
                      onChange={evt=>{this.setFromDayOffset(evt.target.value)}}/>
                    </div>
                    <div className="col-sm-4 formFieldWithLabel">
                      <label htmlFor="toDayOffset">To (days):</label>
                      <input type="text" className="form-control" id="toDayOffset" placeholder="toDayOffset"
                      name="toDayOffset" value={this.state.toDayOffset}
                      onChange={evt=>{this.setToDayOffset(evt.target.value)}}/>
                    </div>
              </div>
              <div className="row">
                  <div className="col-sm-4 formFieldWithLabel">
                   <label htmlFor="channelId">Channel:</label>
                      <select className="form-control" id="channelId" name="channelId"
                        value={this.state.channelId} onChange={evt=>{this.setChannelId(evt.target.value)}}>
                              <RenderChannelOptions channels={this.props.channels}/>
                      </select>



                  </div>
             </div>

                <div className="row">
                    <div className="col-sm-4 formFieldWithLabel">
                       <label htmlFor="runOnTime">Execute on:</label>
                       <input type="text" className="form-control" id="runOnTime" placeholder="Execution Time" name="runOnTime" value={this.state.runOnTime}
                       onChange={evt=>{this.setRunOnTime(evt.target.value)}}/>
                     </div>
                     <div className="col-sm-4 formFieldWithLabel">

                           <button onClick={evt=>this.createTask()} className="btn btn-primary btn-normal">Create Scheduled Task</button>
                    </div>

               </div>


              <ModalDialog message={this.state.modalMessage}/>
       </div>
      );
  }


}


class RenderChannelOptions extends Component{
  renderChannelOption(channel){
      return (
        <option value={channel.channelId} key={channel.channelId}>{channel.channelName}</option>
      );
  }
   render(){
      return this.props.channels.map(this.renderChannelOption.bind(this));
    }

}
