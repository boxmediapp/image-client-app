import React, {Component} from 'react'
import {api} from "../api";


import {
  Link
} from 'react-router-dom'


import {textValues,config} from "../configs";
import {AppHeader} from "../components";
import {styles} from "./styles";
import  "./styles/index.css";

import {genericUtil} from "../utils";
import DisplayUserList from "./DisplayUserList";
import DisplayUserDetails from "./DisplayUserDetails";

export  default class ManageUsersView extends Component {
    constructor(props){
      super(props);
      this.state={users:[], selectedUser:null};
    }
    componentWillMount(){
      this.loadUsers();

    }

    loadUsers(){
      api.getUsers().then(users =>{
             this.setUsers(users);
       });
    }
    setUsers(users){
      this.setState(Object.assign({}, this.state,{users}));
    }
    setSelectedUser(selectedUser){
      this.setState(Object.assign({}, this.state,{selectedUser}));
    }
    onChangePassword(user){
        console.log("password has been changed");
    }
    onBackToList(){
      this.setSelectedUser(null);
    }
    onChageUserRole(user){
      if(user && user.username && user.roles){
            var users=this.state.users.map(u=>{
                if(u.username===user.username){
                    u.roles=user.roles;
                    return u;
                }
                else{
                  return u;
                }
            });
        }
    }




    onDeleteUser(user){
      if(!user){
        return;
      }
      if(!user.username){
        return;
      }
       var users=this.state.users.filter(u=>u.username!==user.usernane);

       this.setState(Object.assign({}, this.state,{users, selectedUser:null}));
       api.deleteUser(user.username).then(respose=>{
             this.loadUsers();
       });

    }

    render(){


          return (
            <div>
              <AppHeader selected="admin"/>
                <div style={AppHeader.styles.content}>
                        <DisplayUserDetails user={this.state.selectedUser} onChageUserRole={this.onChageUserRole.bind(this)}
                          onChangePassword={this.onChangePassword.bind(this)} onDeleteUser={this.onDeleteUser.bind(this)}
                          onBackToList={this.onBackToList.bind(this)}/>
                        <DisplayUserList user={this.state.selectedUser} users={this.state.users}
                          onSelectUser={this.setSelectedUser.bind(this)}/>
               </div>






            </div>
          );



    }

}
