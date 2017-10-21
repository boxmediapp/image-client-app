const ActionNames ={
  SET_EPISODE_LIST: "SET_EPISODE_LIST",
  UPDATE_A_EPISODE:"UPDATE_A_EPISODE"
}

const initialState={
     episodes:[],
     imageStatus:"",
     search:""
}

export const episodeList={
      reducer:function (state=initialState, action){
              switch(action.type){
              case ActionNames.SET_EPISODE_LIST:
                            return Object.assign({},state,{episodes:action.episodes,imageStatus:action.imageStatus,search:action.search});
              case ActionNames.UPDATE_A_EPISODE:
                                          var foundInd=-1;
                                          state.episodes.forEach((ep,ind)=>{
                                            if(ep.id==action.episode.id){
                                                foundInd=ind;
                                            }
                                          });
                                          if(foundInd>=0){
                                              var newEpisodes=[...state.episodes.slice(0,foundInd),action.episode,...state.episodes.slice(foundInd+1)];
                                              return Object.assign({},state,{episodes:newEpisodes});
                                          }
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
                },
                updateEpisode:function(episode){
                    return {
                          type: ActionNames.UPDATE_A_EPISODE,
                          episode
                      };
                },

      }
   };
