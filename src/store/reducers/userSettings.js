const ActionNames ={
  SET_PASSSWORD: "SET_USER_NAME",
  SET_USER_NAME: "SET_PASSWORD"
}

const initialState={
     username:"",
     password:"",
}

export const userSettings={
      reducer:function (state=initialState, action){
              switch(action.type){
              case ActionNames.SET_PASSSWORD:
                            return Object.assign({},state,{password:action.password});
              case ActionNames.SET_USER_NAME:
                            return Object.assign({},state,{username:action.username});

            }
            return state;
        },
       actions:{
                password:function(password){
                    return {
                        type: ActionNames.SET_PASSSWORD,
                        password
                      };
                },
                username:function(username){
                    return {
                        type: ActionNames.SET_USER_NAME,
                        username
                      };
                }
      }
   };
