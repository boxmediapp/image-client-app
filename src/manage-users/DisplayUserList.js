import React, {Component} from 'react';
import {Table, Column, Cell} from "fixed-data-table-2";
import "fixed-data-table-2/dist/fixed-data-table.min.css";
import {styles} from "./styles";

export default class DisplayUserList extends Component{
  render(){
    if(this.props.user){
      return null;
    }
    return (
                      <Table
                   rowHeight={50}
                   headerHeight={50}
                   rowsCount={this.props.users.length}
                   width={1000}
                   height={800}>

               <Column
                 columnKey="username"
                 data={this.props.users}
                 header={<Cell>Username</Cell>}
                 cell={<LinkUserCell data={this.props.users} onSelectUser={this.props.onSelectUser}/>}
                 width={200}
                 />
                 <Column
                   columnKey="roles"
                   data={this.props.users}
                   header={<Cell>Roles</Cell>}
                   cell={<TextCell data={this.props.users}/>}
                   width={200}
                   />
                   <Column
                     columnKey="firstName"
                     data={this.props.users}
                     header={<Cell>First Name</Cell>}
                     cell={<TextCell data={this.props.users}/>}
                     width={200}
                     />
                     <Column
                       columnKey="lastName"
                       data={this.props.users}
                       header={<Cell>Last Name</Cell>}
                       cell={<TextCell data={this.props.users}/>}
                       width={200}
                       />
                       <Column
                         columnKey="company"
                         data={this.props.users}
                         header={<Cell>Company</Cell>}
                         cell={<TextCell data={this.props.users}/>}
                         width={200}
                         />

                          </Table>

    );
  }


}
class TextCell extends Component{

    render(){
      const {data,rowIndex, columnKey,...props} = this.props;
    return (
      <Cell {...props}>
{data[rowIndex][columnKey]}
      </Cell>
    );
    }
}


class LinkUserCell extends Component {
  render() {
    const {data, rowIndex, onSelectUser,columnKey, ...props} = this.props;
    return (
      <Cell {...props}>
            <a  style={styles.username} onClick={ evt=> onSelectUser(data[rowIndex])}>
              {data[rowIndex][columnKey]}
            </a>


      </Cell>
    );
  }
};
