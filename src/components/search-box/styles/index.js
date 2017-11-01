import {localImages} from "../../../configs";

export const styles={
  search:{
    width: 200,
    boxSizing: "border-box",
    border: "2px solid #ccc",
    borderRadius: 4,
    fontSize: 16,
    backgroundColor: "white",
    backgroundImage: "url('"+localImages.search+"')",
    backgroundPosition: "10px 10px",
    backgroundRepeat: "no-repeat",
    padding: "6px 25px 6px 30px",
    WebkitTransform: "width 0.4s ease-in-out",
    transition: "width 0.4s ease-in-out"
  }

};
