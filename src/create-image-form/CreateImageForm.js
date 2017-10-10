import React, {Component} from 'react'


import {textValues,images} from  "../configs";



export  default class CreateImageForm extends Component {

  render() {
    return (
               <div className="container">
                       <div className="row">
                           <div className="col-sm-6">
                              <label htmlFor="contractNumber">Contract Number:</label>
                              <input type="text" className="form-control" id="contractNumber" placeholder="Contract number" name="contractNumber"/>
                            </div>
                            <div className="col-sm-6">
                              <label htmlFor="episodeNumber">Episde Number:</label>
                            <input type="text" className="form-control" id="episodeNumber" placeholder="Episode Number" name="episodeNumber"/>
                          </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                           <label htmlFor="title">Title:</label>
                           <input type="text" className="form-control" id="title" placeholder="Title" name="title"/>
                         </div>

                      </div>
                      <div className="row">
                          <div className="col-sm-6">
                             <label htmlFor="productionYear">Production Year:</label>
                             <input type="text" className="form-control" id="productionYear" placeholder="Production Year" name="productionYear"/>
                           </div>
                           <div className="col-sm-6">
                             <label htmlFor="productionMonth">Production Month:</label>
                             <input type="text" className="form-control" id="productionMonth" placeholder="Production Month" name="productionMonth"/>
                         </div>
                     </div>


              </div>
            );
  }
}
