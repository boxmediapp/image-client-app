import React, {Component} from 'react'
import {styles} from "./styles";
export default class ModalDialog extends Component {
  constructor(props){
      super(props);

      if(this.props.message && this.props.message.inputs && this.props.message.inputs.length>0){
          var inputs={};
          this.props.message.inputs.forEach(input=>{
            if(input.value){
              inputs[input.name]=input.value;
            }
            else{
              inputs[input.name]="";
            }

          });
          this.state={inputs};
      }


  }
  onConfirm(){
    if(this.props.message.inputs && this.props.message.inputs.length>0){
          this.props.message.onConfirm(this.state.inputs);
    }
    else{
          this.props.message.onConfirm();
    }

  }
  onCancel(){
    this.props.message.onCancel();
  }
  onInputChanged(input){
      var inputs=Object.assign({}, this.state.inputs,input);
      this.setState(Object.assign({}, this.state,{inputs}));
  }
  render(){
      if(this.props.message){
            var currentInputs=null;
            if(this.state && this.state.inputs){
              currentInputs=this.state.inputs;
            }

            return(
                      <div style={styles.backdropStyle}>
                        <div style={styles.dialogwindow}>
                            <div style={styles.title}>{this.props.message.title}</div>
                            <div style={styles.content}>
                                  {this.props.message.content}
                                  <DisplayInputs {...this.props} onInputChanged={this.onInputChanged.bind(this)} currentInputs={currentInputs}/>
                            </div>

                            <div style={styles.footer}>
                              <DisplayButton onClick={this.onConfirm.bind(this)} buttonText={this.props.message.confirmButton}/>
                              <DisplayButton onClick={this.onCancel.bind(this)} buttonText={this.props.message.cancelButton}/>
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
        if(this.props.onClick && this.props.buttonText){
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

class DisplayInputs extends Component{
  renderOption(option,index){
    return(
        <option value={option.value} key={index}>{option.label}</option>
    );
  }
  renderInputField(input, index){
      var onInputChanged=this.props.onInputChanged;
      var value=this.props.currentInputs[input.name];

      if(input.readOnly){
        return( <div style={styles.inputContainer} key={input.name}>
                    <div style={styles.inputLabel}>{input.label}</div>
                    <input type="text" key={input.name} value={value} readOnly></input>
                </div>
        );
      }
      else if(input.options){
                return(<div style={styles.inputContainer} key={input.name}>
                    <div style={styles.inputLabel}>{input.label}</div>
                    <select  key={input.name} value={value} onChange={evt=>{
                          var newinput={};
                          newinput[input.name]=evt.target.value;
                          onInputChanged(newinput);
                      }}>
                          {input.options.map(this.renderOption)}
                    </select>
                </div>);
      }
      else{
              return( <div style={styles.inputContainer} key={input.name}>
                    <div style={styles.inputLabel}>{input.label}</div>
                    <input type="text" key={input.name} value={value} onChange={evt=>{
                          var newinput={};
                          newinput[input.name]=evt.target.value;
                          onInputChanged(newinput);
                      }}></input>
                </div>
              );
      }

  }
  render(){
        if(!this.props.message.inputs){
            return null;
        }
        if(!this.props.message.inputs.length){
          return null;
        }
        return (
          <div style={styles.inputsContainer}>
                  {this.props.message.inputs.map(this.renderInputField.bind(this))}
          </div>
        );




  }

}
