const ActionNames ={
  SET_EPISODE_LIST: "SET_EPISODE_LIST",
  UPDATE_A_EPISODE:"UPDATE_A_EPISODE",
  NEXT_PAGE_EPISODE:"NEXT_PAGE_EPISODE_LIST"
}

const initialState={
     episodes:[],
     queryparameters:{},
     nextBatchStart:-1
}

export const episodeList={
      reducer:function (state=initialState, action){
              switch(action.type){
              case ActionNames.SET_EPISODE_LIST:
                            var nextBatchStart=-1;

                                if(action.recordLimit && action.episodes && action.episodes.length>=action.recordLimit){
                                      nextBatchStart=action.recordLimit;
                                }
                            return Object.assign({},state,{episodes:action.episodes,queryparameters:action.queryparameters,nextBatchStart});
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
               case ActionNames.NEXT_PAGE_EPISODE:
                                var nextBatchStart=-1;
                                if(action.recordLimit && action.episodes && action.episodes.length>=action.recordLimit){
                                    nextBatchStart=state.nextBatchStart+action.recordLimit;
                                }
                                var episodes=state.episodes;
                                if(action.episodes && action.episodes.length>0){
                                      episodes=[...state.episodes,...action.episodes];
                                }
                                return Object.assign({},state,{episodes,nextBatchStart});
            }
            return state;
        },
       actions:{
                setEpisodes:function(request){
                    return {
                          type: ActionNames.SET_EPISODE_LIST,
                          episodes:request.episodes,
                          queryparameters:request.queryparameters,
                          recordLimit:request.recordLimit
                      };
                },
                updateEpisode:function(episode){
                    return {
                          type: ActionNames.UPDATE_A_EPISODE,
                          episode
                      };
                },
                nextPageEpisodes:function(request){
                  return {
                        type: ActionNames.NEXT_PAGE_EPISODE,
                        episodes:request.episodes,
                        recordLimit:request.recordLimit
                    };
                }

      }
   };
