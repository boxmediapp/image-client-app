import React, {Component} from 'react';
import {Table, Column, Cell} from "fixed-data-table-2";
import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {api} from "../api";
import {textValues} from "../configs";
import {LoadingIcon} from "../components";
import {styles} from "./styles";
export default class CopyImageSetDialog extends Component{
  constructor(props){
      super(props);
      this.state={
          loading:true,
          episodes:[],
          errorMessage:null,
          progress:0
      };
  }
  componentWillMount(){
      this.startSearch(this.props);
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.imageSetToCopy!==this.props.imageSetToCopy){
            this.startSearch(nextProps);
      }
  }
  dismissDialog(){
      this.props.dismissDialog();
  }
  startCopyImageSet(){
      this.copyImageSet(this.props.imageSetToCopy.id,this.state.episodes);
  }
  copyImageSet(imagesetid, episodes){

      if((!episodes)|| (!episodes.length)){
            this.setState({loading:false, episodes:[],errorMessage:null,progress:0});
            this.props.dismissDialog();
            return;
      }
      else{
        this.setState({loading:false, episodes:this.state.episodes,errorMessage:null,progress:episodes.length});
      }

      var mediaCommand={
        command:"copy_image_set",
        imagesetId:imagesetid,
        episodeid:episodes[0].id
      };
      api.sendCommand(mediaCommand).then(result=>{
            episodes.splice(0,1);
            this.copyImageSet(imagesetid,episodes);
      }).catch(error=>{
          console.error(error);
          this.setState({loading:false, episodes:[],errorMessage:textValues.copyImageSet.error.copyError+error,progress:0});
      });

  }

  startSearch(props){
    if(!props.imageSetToCopy){

          return;
    }


    this.setState({loading:true, errorMessage:null, progress:0, episodes:[]})
    api.findNewEpisodes({contractNumber:props.imageSetToCopy.contractNumber}).then(episodes =>{
      if(episodes && episodes.length>0){
          episodes=episodes.filter(episode=>episode.programmeNumber!==props.imageSetToCopy.programmeNumber);
      }
      if(!episodes){
        episodes=[];
      }
      this.setState({loading:false, episodes,errorMessage:null,progress:0});
   }).catch(error=>{
        console.error(error);
        this.setState({loading:false, errorMessage:textValues.copyImageSet.error.loadFailed+error,episodes:[],progress:0});
   });

  }


  renderErrorMessage(title, message){
      return(
        <div style={styles.dialogwindow}>
            <div style={styles.dialogTitle}>{title}</div>
            <div style={styles.dialogContent}>
                      <div className="message">{message}</div>
            </div>
            <div style={styles.footer}>
                  <div style={styles.buttonContainer}>
                     <button  onClick={this.dismissDialog.bind(this)} className="btn btn-primary btn-normal">OK</button>
                  </div>
            </div>
        </div>
        );
  }
  renderLoading(title, message){
    return(
    <div style={styles.dialogwindow}>
            <div style={styles.dialogTitle}>{title}</div>
            <div style={styles.dialogContent}>

                        <div className="message">{message}</div>
                        <LoadingIcon loading={true}/>

            </div>
            <div style={styles.footer}>
                  <div style={styles.buttonContainer}>
                     <button  onClick={this.dismissDialog.bind(this)} className="btn btn-primary btn-normal">Cancel</button>
                  </div>
            </div>
    </div>
  );
  }
renderEpisodeList(){
    return(
      <div style={styles.dialogwindow}>
          <div style={styles.dialogTitle}>{textValues.copyImageSet.title}</div>
          <div style={styles.dialogContent}>
                   <div style={styles.tableContent}>
                   <div>{textValues.copyImageSet.content}</div>
                        <ListEpisodes episodes={this.state.episodes}/>
                    </div>
                        </div>
                        <div style={styles.footer}>
                                  <div style={styles.buttonContainer}>
                                     <button  onClick={this.startCopyImageSet.bind(this)} className="btn btn-primary btn-normal">{textValues.copyImageSet.buttonName}</button>
                                  </div>
                                  <div style={styles.buttonContainer}>
                                     <button  onClick={this.props.dismissDialog} className="btn btn-primary btn-normal">Cancel</button>
                                  </div>


                        </div>
                  </div>
                );

}

 renderContent(){
    if(this.state.errorMessage){
              return this.renderErrorMessage(textValues.copyImageSet.error.title, this.state.errorMessage);
    }
    else if(this.state.progress){
          return this.renderLoading(textValues.copyImageSet.progress.title,textValues.copyImageSet.progress.content+this.state.progress);
    }
    else if(this.state.loading){
          return this.renderLoading(textValues.copyImageSet.loading.title,textValues.copyImageSet.loading.content);
    }
    else if(!this.state.episodes.length){
        return this.renderErrorMessage(textValues.copyImageSet.noEpisodes.title, textValues.copyImageSet.noEpisodes.content);
    }
    else{
        return this.renderEpisodeList();
    }
 }
  render(){
      if(this.props.imageSetToCopy){
            return(
                      <div style={styles.backdropStyle}>
                            {this.renderContent()}
                      </div>
            );
        }
        else{
          return null;
        }
  }

}

class ListEpisodes extends Component{
    render(){
      var data={episodes:this.props.episodes};
      return(
                    <Table
                      rowHeight={50}
                      headerHeight={50}
                      rowsCount={data.episodes.length}
                      width={400}
                      height={200}>

                              <Column
                                columnKey="contractNumber"
                                header={<Cell>Contract</Cell>}
                                cell={<TextCell data={data}/>}
                                fixed={true}
                                width={100}
                                />
                               <Column
                                    columnKey="episodeNumber"
                                    header={<Cell>Episode</Cell>}
                                    cell={<TextCell data={data}/>}
                                    fixed={true}
                                    width={100}
                                    />



                                       <Column
                                                columnKey="title"
                                                header={<Cell>Title</Cell>}
                                                cell={<TextCell data={data}/>}
                                                width={500}
                                                fixed={true}
                                               />
                                      </Table>
                  );
    }
}
class TextCell extends Component {
  render() {
    const {data,rowIndex,columnKey} = this.props;
    return (
      <Cell {...this.props}>
            {data.episodes[rowIndex][columnKey]}
      </Cell>
    );

   }
 }
