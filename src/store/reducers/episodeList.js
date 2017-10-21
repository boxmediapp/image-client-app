const ActionNames ={
  SET_EPISODE_LIST: "SET_EPISODE_LIST"
}

const initialState={
     episodes:"",
     imageStatus:"",
     search:""
}

export const episodeList={
      reducer:function (state=initialState, action){
              switch(action.type){
              case ActionNames.SET_EPISODE_LIST:
                            return Object.assign({},state,{episodes:action.episodes,imageStatus:action.imageStatus,search:action.search});
            }
            return state;
        },
       actions:{
                setEpisodes:function(request){
                    return {
                          type: ActionNames.SET_EPISODE_LIST,
                          episodes:request.episodes,
                          imageStatus:request.imageStatus,
                          search:request.search
                      };
                }
      }
   };
