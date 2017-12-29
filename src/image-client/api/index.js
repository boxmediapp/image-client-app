import {ServiceAPI} from "../../api";
import {appdata} from "../../store";
import {config} from "../configs";
const api=new ServiceAPI(config, appdata);
export {api};
