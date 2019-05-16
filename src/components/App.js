import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }
    //DECLARE THE CHANGE FILTER FUNCTION

  changeFilter = (type) => {
    this.setState({filters : { type }})
  }
  //NOW WE NEED TO CALL THE FETCH FUNCTION UPON COLLECTING THE FILTER
  //DECLARING A FILTER FOR FURTHER USE
  //WE NEED TO CONNECT TO SERVER, WE DECLARE THAT IF FILTER IS ALL, FETCH ALL, IF NOT, FETCH
  //WITH FILTER. UPON RESPONSE, PARSE IT AND PASS THE ARRAY OF PETS TO STATE.PETS[]
  applyFilter = () => {
    const filter = this.state.filters.type
    const url = filter === 'all'
    ? '/api/pets'
    : `/api/pets?type=${filter}`
    fetch(url)
      .then(resp=>resp.json())
        .then(pets=>this.setState({ pets }))
  }

  //WE NEED TO HAVE THE ID OF THE PET TO ADOPT
  //CALLING MAP ON CURRENT PET ARRAY, WE CAN ITERATE ON EACH PET AND STATING THAT IF PET.ID
  //IS STRICTLY EQUAL TO OUR ID, THEN WE WANT EITHER THE SAME COPY{...} OF pet AND IF ITS THERE
  adoptThisPet = id => {
    const pets = this.state.pets.map(pet => pet.id === id ? {...pet, isAdopted: true} : pet)
    this.setState({ pets })
  }

  render(){
    window.getPets = this.getPets
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
            //SEND THE FUCTION DOWN TO FILTERS, TELLING THAT THIS WILL TRIGGER _changeFilter
            //handleFilter IS JUST A CONVENTION, CAN NAME IT WHATSOEVER
              <Filters handleFilter={this.changeFilter} handleClick={this.applyFilter}/>
            </div>
            <div className="twelve wide column">
            //ONCE WE TRIGGER THE RESEARCH AND FETCH THE DB. WE ARE ACTUALLY ABLE TO DISPLAY
            //PETS TRHOUGH PetBrowser BY PASSING this.state.pets
            //ALSO PASSING DOWN handleAdoption TO PetBrowserFIRST
              <PetBrowser pets={this.state.pets} handleAdoption={this.adoptThisPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
