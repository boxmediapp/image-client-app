import {episodeList} from "./reducers/episodeList";
export default class EpisodeStoreData{
      constructor(store){
        this.store=store;
      }
      setEpisodeList(listdata){
          this.store.dispatch(episodeList.actions.setEpisodes(listdata));
      }
      getEpisodeList(){
        return {episodes:this.store.getState().episodeList.episodes, imageStatus:this.store.getState().episodeList.imageStatus,search:this.store.getState().episodeList.search};
      }
      isEpisodeListIdentical(data1, data2){
          return data1.episodes===data2.episodes && data1.imageStatus===data2.imageStatus && data1.search===data2.search;
      }
      isEpisodeIsIdentical(episode1, episode2){
         if(episode1 && episode2){
            return episode1.title===episode2.title && episode1.programmeNumber === episode2.programmeNumber && episode1.imageStatus === episode2.imageStatus;
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
          this.setEpisodeList({episodes:[episode],imageStatus:null,search:null});
        }

      }
}
