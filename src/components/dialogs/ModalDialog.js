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
                              <DisplayButton onClick={this.props.message.onConfirm} buttonText={this.props.message.confirmButton}/>
                              <DisplayButton onClick={this.props.message.onCancel} buttonText={this.props.message.cancelButton}/>
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

class DisplayButton extends Component{

render(){
if(this.props.onClick){
  return(
    <div style={styles.buttonContainer}>
       <button onClick={this.props.onClick} className="btn btn-primary btn-normal">{this.props.buttonText}</button>
    </div>
  );
}
else{
  return null;
}


}


}
