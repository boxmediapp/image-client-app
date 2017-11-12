import React, {Component} from 'react'
import {styles} from "./styles";
import {config} from "../../configs"
import {imageUtil} from "../../utils";
export default class ModalDisplayImage extends Component {
  constructor(props){
    super(props);
    this.state={showImage:false}
  }
  setShowImage(showImage){
    this.setState(Object.assign({}, this.state,{showImage}));
  }
  render(){
      var fitImageWidth=imageUtil.calculateFitImageWidth(this.props);
      if((!this.props.imageURL)||  this.props.width<=fitImageWidth.width){
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
                           }}  className="btn btn-primary btn-normal">Back</button>
                    </div>
                  </div>
                  </div>
            );
        }
        else{
          return (
            <div style={styles.showOriginSizeButtonContainer}>
            <button type="button" className="btn btn-primary btn-normal" onClick={(evt) => {
                     this.setShowImage(true);
                 }}>View {this.props.width} x {this.props.height}</button>
            </div>
          );
        }


  }

}
