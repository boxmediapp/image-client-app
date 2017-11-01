import React,{Component} from "react";


import configStore  from "./configStore";



import EpisodeStoreData from "./EpisodeStoreData";
import AppSettingsStore from "./AppSettingsStore";

const store=configStore();

const episodedata=new EpisodeStoreData(store);
const appdata=new AppSettingsStore(store);

export {appdata,episodedata,store};
