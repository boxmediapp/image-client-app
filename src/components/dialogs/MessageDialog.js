import React, {Component} from 'react'
import {styles} from "./styles";
export default class MessageDialog extends Component {

  render(){
      if(this.props.message){
            return(
                      <div style={styles.messageDialogContainer}>
                          <div style={styles.content}>
                                  {this.props.message.content}
                          </div>
                      </div>
            );
        }
        else{
          return null;
        }


  }

}
