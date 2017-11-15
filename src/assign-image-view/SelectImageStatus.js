import React, {Component} from 'react'

export default class SelectImageStatus extends Component{
      constructor(props){
        super(props);
        this.state={imageStatus:this.props.imageStatus};
      }
      handleOptionChange(changeEvent){
        this.setState({
          imageStatus: changeEvent.target.value
        });
        this.props.updateImageStatus(changeEvent.target.value);
      }

    render(){
        return(
         <div>
          <div className="radio">
                <label>
                  <input type="radio" value="WAITING_APPROVE" checked={this.state.imageStatus === 'WAITING_APPROVE'}
                  onChange={this.handleOptionChange.bind(this)}  />
                Awaiting Approval
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="APPROVED" checked={this.state.imageStatus === 'APPROVED'}
                  onChange={this.handleOptionChange.bind(this)}  />
                  Approved
                </label>
              </div>

          </div>
        );


    }
}
