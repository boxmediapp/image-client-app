import {episodeList} from "./reducers/episodeList";
export default class EpisodeStoreData{
      constructor(store){
        this.store=store;
      }
      setEpisodeStore(episodeStore){
          this.store.dispatch(episodeList.actions.setEpisodes(episodeStore));
      }
      nextPageEpisodes(episodeStore){
          this.store.dispatch(episodeList.actions.nextPageEpisodes(episodeStore));
      }
      getNextBatchState(){
        return this.store.getState().episodeList.nextBatchStart;
      }
      getEpisodeStore(){
        return this.store.getState().episodeList;
      }
      isEpisodeListIdentical(data1, data2){
          return data1.episodes===data2.episodes && data1.queryparameters===data2.queryparameters;
      }
      isEpisodeIsIdentical(episode1, episode2){
         if(episode1 && episode2){
            if(episode1.title===episode2.title && episode1.programmeNumber === episode2.programmeNumber){
                  if(episode1.imageSets && episode2.imageSets){
                    return episode1.imageSets.length===episode2.imageSets.length;
                  }
                  else if(episode1.imageSets){
                    return false;
                  }
                  else if(episode2.imageSets){
                    return false;
                  }
                  else{
                      return true;
                  }
            }
            else{
              return false;
            }
         }
         else if(episode1){
           return false;
         }
         else if(episode2){
           return false;
         }
         else{
            return true;
         }


      }

      findEpisodeById(id){
        var episodelist=this.getEpisodeList();
        if(episodelist.episodes && episodelist.episodes.length>0){
            var matchedEpisodes=episodelist.episodes.filter(episode=>{
               return id==episode.id;
            });
            if(matchedEpisodes.length>0){
              return matchedEpisodes[0];
            }
        }
        else{
          return null;
        }
      }
      updateEpsiode(episode){
        if(!episode){
          return;
        }
        var foundEpisode=this.findEpisodeById(episode.id);
        if(foundEpisode){
          if(this.isEpisodeIsIdentical(foundEpisode,episode)){
            return;
          }
          else{
            this.store.dispatch(episodeList.actions.updateEpisode(episode));
          }

        }
        else{
          this.setEpisodeList({episodes:[episode],queryparameters:{}});
        }

      }
}
