import React, {Component} from 'react'
import {api} from "../api";


import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {
  Link
} from 'react-router-dom'

import {textValues} from "../configs";
import {AppHeader,ModalDialog} from "../components";


export  default class ManageCacheView extends Component {
    constructor(props){
      super(props);
      this.state={modalMessage:null};
    }

    onClearMessage(){
      this.setState(Object.assign({}, this.state,{modalMessage:null}));
    }
    setMessage(content){
       var modalMessage={
              title:"Information",
              content,
              onConfirm:this.onClearMessage.bind(this),
              confirmButton:"OK"
       }
       this.setState(Object.assign({}, this.state,{modalMessage}));
    }


    invalidateAllClientImage(){
      var command={
                          command:"invalidate-client-image-cdn-cache",
                          filename:""
                  };
      api.sendCommand(command);
      this.setMessage("CDN Cache is cleared");

    }

    render(){

        return (
          <div>
            <AppHeader selected="home"/>

              <div style={AppHeader.styles.content}>


                             <button onClick={evt=>this.invalidateAllClientImage()} className="btn btn-primary btn-normal">Clear CDN Cache</button>

                    <ModalDialog message={this.state.modalMessage}/>
             </div>




          </div>
        );

    }

}
