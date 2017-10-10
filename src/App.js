import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


import {Home} from "./home";




import {textValues,images} from  "./configs";



export default class App extends Component{
  render(){

    return (

            <Router>

              <div className="topContainer">

                  <Route  path="/" exact component={Home}/>


                  </div>


            </Router>

      )
    }
}
