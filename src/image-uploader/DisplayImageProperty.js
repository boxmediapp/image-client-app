import React, {Component} from 'react';
import  {styles} from  "./styles";

export default class DisplayImageProperty extends Component {
   render(){
     const {width,height}=this.props.data;
     if(width && height){
       return(
          <div  style={styles.imagePropContainer}>
                {width} x {height}
          </div>
       );
     }
     else{
        return null;
     }

   }

}
