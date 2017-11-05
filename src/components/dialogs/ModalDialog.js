import React, {Component} from 'react'
import {styles} from "./styles";
export default class ModalDialog extends Component {

  render(){
      if(this.props.message){
            return(
                      <div style={styles.backdropStyle}>
                        <div style={styles.dialogwindow}>
                            <div style={styles.title}>{this.props.message.title}</div>
                            <div style={styles.content}>
                                  {this.props.message.content}
                            </div>

                            <div style={styles.footer}>
                              <button onClick={this.props.message.onConfirm} className="btn btn-primary btn-normal">{this.props.message.confirmButton}</button>
                            </div>
                        </div>
                  </div>
            );
        }
        else{
          return null;
        }


  }

}
