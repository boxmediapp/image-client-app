import React, {Component} from 'react'
import {styles} from "./styles";
export default class ModalDialog extends Component {

  render(){
      if(this.props.message){
            return(
                      <div className="backdrop" style={styles.backdropStyle}>
                        <div className="modal" style={styles.modalStyle}>
                    {this.props.message}

                    <div className="footer">
                      <button onClick={this.props.onClearMessage} className="btn btn-primary btn-normal">Ok</button>
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
