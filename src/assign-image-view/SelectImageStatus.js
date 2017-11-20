import React, {Component} from 'react'

export default class SelectImageStatus extends Component{
    
      handleOptionChange(changeEvent){        
        this.props.updateImageStatus(changeEvent.target.value);
      }

    render(){
        return(
         <div>
          <div className="radio">
                <label>
                  <input type="radio" value="WAITING_APPROVE" checked={this.props.imageStatus === 'WAITING_APPROVE'}
                  onChange={this.handleOptionChange.bind(this)}  />
                Awaiting Approval
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" value="APPROVED" checked={this.props.imageStatus === 'APPROVED'}
                  onChange={this.handleOptionChange.bind(this)}  />
                  Approved
                </label>
              </div>

          </div>
        );


    }
}
