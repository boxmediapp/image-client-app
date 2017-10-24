import React, {Component} from 'react'
import {styles} from "./styles";
export default class RenderTagInput extends Component{

  render(){
        var {imageTags}=this.props;
        if(this.props.image || this.props.imagePreviewUrl){
          return (
            <div style={styles.tagContainer}>
               <label htmlFor="title">tag:</label>
               <input type="text" className="form-control" id="imageTags" placeholder="Required for upload" value={imageTags} name="tags" onChange={evt=>{this.props.setImageTags(evt.target.value)}}/>
               <DisplayUpdateTagsButton {...this.props}/>
            </div>
          );
        }
        else{
          return null;
        }


  }
}

class DisplayUpdateTagsButton extends Component {
      render(){
           if(this.props.image && this.props.image.tags !=this.props.imageTags){
             return (
               <button type="button" className="btn btn-primary btn-block" onClick={(evt) => {
                        this.props.updateTags();
                    }}>Update Tags</button>
             );
           }
           else{
             return null;
           }

      }

}
