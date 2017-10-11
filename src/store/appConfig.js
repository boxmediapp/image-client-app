const ActionNames ={
  SET_APP_CONFIG: "SET_APP_CONFIG"
}

const initialState={
     appconfig:""
}

export const appConfig={
      reducer:function (state=initialState, action){
              switch(action.type){
              case ActionNames.SET_APP_CONFIG:
                            return Object.assign({},state,{appconfig:action.appconfig});
            }
            return state;
        },
       actions:{
                appconfig:function(appconfig){
                    return {
                        type: ActionNames.SET_APP_CONFIG,
                        appconfig
                      };
                }
      }
   };
