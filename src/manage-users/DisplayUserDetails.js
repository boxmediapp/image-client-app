import React, {Component} from 'react';
import {styles} from "./styles";
import {api} from "../api";
import {ModalDialog} from "../components";

export default class DisplayUserDetails extends Component {

  constructor(props){
      super(props);
      this.state={dialog:null, roleOptions:[]};
  }
  componentWillMount(){

    this.loadUserRoles();
  }
  setDialog(dialog){
    this.setState(Object.assign({}, this.state,{dialog}));
  }
  loadUserRoles(){
      api.loadUserRoles().then(userroles=>{
            var roleOptions=userroles.map(ur=>{
                return {
                  label:ur.rolename,
                  value:ur.rolename
                }
            });

            this.setState(Object.assign({},this.state,{roleOptions}));
      });
  }
  onDisplayChangedPasswordDialog(user){
    this.user=user;
    this.setDialog("password");
  }
  onDisplayChangeRoleDialog(user){
    this.user=user;
    this.setDialog("role");
  }
  onChangePassword(user){

    this.setDialog(null);
    if(user && user.username && user.password){
        this.props.onChangePassword(user);
        api.updateUser({username:user.username, password:user.password});
    }

  }

  onChangeRoles(user){
    console.log("role:"+JSON.stringify(user));
    this.setDialog(null);
    if(user && user.username && user.roles){
        this.props.onChageUserRole(user);
        api.updateUser({username:user.username, roles:user.roles});
    }

  }
  onDeleteUser(user){
    this.user=user;
    this.setDialog("delete-user");

  }
  onConfirmDeleteUser(){
      this.setDialog(null);
      this.props.onDeleteUser(this.props.user);

  }
  onCancel(){
    this.setDialog(null);
  }

  render(){
    if(!this.props.user){
      return null;
    }
    var user=this.props.user;
    return(

        <div style={styles.contentContainer}>
        <div style={styles.leftColumn}>
            <a className="btn btn-primary btn-normal mediaButton"
              onClick={ evt=> this.props.onBackToList()}>Back</a>

        </div>

           <div style={styles.userDetailsContainer}>
               <div style={styles.title}>User Detail</div>
               <div style={styles.detailsRow}>
                   <div style={styles.detailsLabel}>First Name:</div>
                   <div style={styles.detailsValue}>{user.firstName}</div>
               </div>

               <div style={styles.detailsRow}>
                   <div style={styles.detailsLabel}>Last Name:</div>
                   <div style={styles.detailsValue}>{user.lastName}</div>
               </div>


               <div style={styles.detailsRow}>
                   <div style={styles.detailsLabel}>Username:</div>
                   <div style={styles.detailsValue}>{user.username}</div>
               </div>


               <div style={styles.detailsRow}>
                   <div style={styles.detailsLabel}>Role:</div>
                   <div style={styles.detailsValue}>{user.roles}</div>
                   <div style={styles.controlButton}>
                        <a className="btn btn-primary btn-normal mediaButton"
                        onClick={ evt=> this.onDisplayChangeRoleDialog(this.props.user)}>Change Role</a>
                  </div>
               </div>

               <div style={styles.detailsRow}>
                   <div style={styles.detailsLabel}>Email:</div>
                   <div style={styles.detailsValue}>{user.email}</div>
               </div>

               <div style={styles.detailsRow}>
                   <div style={styles.detailsLabel}>Password:</div>
                   <div style={styles.detailsValue}>{user.password}</div>
                   <div style={styles.controlButton}>
                        <a className="btn btn-primary btn-normal mediaButton" onClick={
                            evt=> this.onDisplayChangedPasswordDialog(this.props.user)
                          }>Change Password</a>
                    </div>

               </div>

               <div style={styles.detailsRow}>
                   <div style={styles.detailsLabel}>Company:</div>
                   <div style={styles.detailsValue}>{user.company}</div>
               </div>

               <a className="btn btn-primary btn-normal mediaButton" onClick={
                  evt=> this.onDeleteUser(this.props.user)
                }>Delete
              </a>



           </div>
           <ChangePasswordDialog dialogtype={this.state.dialog}
           onChangePassword={this.onChangePassword.bind(this)}
           onCancel={this.onCancel.bind(this)} user={this.user}/>

           <ChangeRoleDialog dialogtype={this.state.dialog}
           onChangeRoles={this.onChangeRoles.bind(this)}
           onCancel={this.onCancel.bind(this)} user={this.user} roleOptions={this.state.roleOptions}/>
           <DeleteUserDialog user={this.user} dialogtype={this.state.dialog} onConfirmDeleteUser={this.onConfirmDeleteUser.bind(this)}
           onCancel={this.onCancel.bind(this)}/>

       </div>


    );
  }

}



class ChangePasswordDialog extends Component{

     render(){
       if(this.props.dialogtype==="password"){
          var message={
            title:"Change Password",
            onConfirm:this.props.onChangePassword,
            onCancel:this.props.onCancel,
            inputs:[
                   {name:"username",  label:"Username:", readOnly:true, value:this.props.user.username},
                   {name:"password",  label:"Password:"}],
                   confirmButton:"Change",
                   cancelButton:"Cancel"
         }
        return(<ModalDialog message={message}/>);
    }
    else{
      return  null;
    }
  }
}


class ChangeRoleDialog extends Component{


     render(){



    if(this.props.dialogtype==="role"){
         var message={
           title:"Change Role",
           onConfirm:this.props.onChangeRoles,
           onCancel:this.props.onCancel,
           inputs:[
                   {name:"username",  label:"Username:", readOnly:true, value:this.props.user.username},
                   {name:"roles",  label:"Roles:", value:this.props.user.roles, options:this.props.roleOptions}
                 ],
            confirmButton:"Change",
            cancelButton:"Cancel"

         }
        return(<ModalDialog message={message}/>);
    }
    else{
      return  null;
    }
  }
}



class DeleteUserDialog extends Component{

     render(){
       if(this.props.dialogtype==="delete-user"){
          var message={
            title:"Confirm Deletion",
            content:"Are you sure you would like to delete this user?",
            onConfirm:this.props.onConfirmDeleteUser,
            onCancel:this.props.onCancel,
            inputs:[
                   {name:"username",  label:"Username:", readOnly:true, value:this.props.user.username},
                   {name:"firstName",  label:"First Name:", readOnly:true,value:this.props.user.firstName},
                   {name:"lastName",  label:"LastName Name:", readOnly:true,value:this.props.user.lastName}],
                   confirmButton:"Delete",
                   cancelButton:"Cancel"
         }
        return(<ModalDialog message={message}/>);
    }
    else{
      return  null;
    }
  }
}
