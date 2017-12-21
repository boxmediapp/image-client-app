const ActionNames ={
  SET_USER_INFO: "SET_USER_INFO"
}

const initialState={
     userinfo:null
}

export const userSettings={
      reducer:function (state=initialState, action){
              switch(action.type){
              case ActionNames.SET_USER_INFO:
                            return Object.assign({},state,{userinfo:action.userinfo});
            }
            return state;
        },
       actions:{
                setUserinfo:function(userinfo){
                    return {
                        type: ActionNames.SET_USER_INFO,
                        userinfo
                      };
                }
      }
   };
