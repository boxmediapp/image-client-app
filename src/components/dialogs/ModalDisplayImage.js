import React, {Component} from 'react'
import {styles} from "./styles";
import {config} from "../../configs"
export default class ModalDisplayImage extends Component {
  constructor(props){
    super(props);
    this.state={showImage:false}
  }
  setShowImage(showImage){
    this.setState(Object.assign({}, this.state,{showImage}));
  }
  render(){
      if(this.props.width<=config.normalImageWidth && this.props.height<=config.normalImageHeight){
          return null;
      }

      if(this.state.showImage){
            return(
                      <div  style={styles.imageBackdropStyle}>
                        <div style={styles.imageTitle}>Originl Size Image</div>
                        <div style={styles.imageModalStyle}>
                          <img src={this.props.imageURL} style={styles.modalImage(this.props.width, this.props.height)}/>

                    <div className="footer">
                      <button onClick={(evt) => {
                               this.setShowImage(false);
                           }} >Hide</button>
                    </div>
                  </div>
                  </div>
            );
        }
        else{
          return (
            <div>
            <button type="button" className="btn btn-primary btn-normal" onClick={(evt) => {
                     this.setShowImage(true);
                 }}>Original Size</button>
            </div>
          );
        }


  }

}
