import React, {Component} from 'react'


import {textValues,images} from  "../configs";



export  default class CreateImageForm extends Component {

  render() {
    return (
               <div class="container">
                       <div class="row">
                           <div class="col-sm-6">
                              <label for="contractNumber">Contract Number:</label>
                              <input type="text" class="form-control" id="contractNumber" placeholder="Contract number" name="contractNumber"/>
                            </div>
                            <div class="col-sm-6">
                              <label for="episodeNumber">Episde Number:</label>
                            <input type="text" class="form-control" id="episodeNumber" placeholder="Episode Number" name="episodeNumber"/>
                          </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-12">
                           <label for="title">Title:</label>
                           <input type="text" class="form-control" id="title" placeholder="Title" name="title"/>
                         </div>

                      </div>
                      <div class="row">
                          <div class="col-sm-6">
                             <label for="productionYear">Production Year:</label>
                             <input type="text" class="form-control" id="productionYear" placeholder="Production Year" name="productionYear"/>
                           </div>
                           <div class="col-sm-6">
                             <label for="productionMonth">Production Month:</label>
                             <input type="text" class="form-control" id="productionMonth" placeholder="Production Month" name="productionMonth"/>
                         </div>
                     </div>


              </div>
            );
  }
}
