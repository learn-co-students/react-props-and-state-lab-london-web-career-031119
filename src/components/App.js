import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  onFindPetsClick = () => {
    const type = this.state.filters.type
    const url = type === 'all'
    ? 'http://localhost:3000/pets'
    : `http://localhost:3000/pets?type=${type}`

    
    fetch(url)
      .then(resp => resp.json())
      .then( data => this.setState({ pets: data }))
      
  }

  onAdoptPet = (id) => {
    const newPets = this.state.pets.slice()
    const selectedPet = newPets.find(pet => pet.id === id) 
    selectedPet.isAdopted = true 
    this.setState({
      pets: newPets
    })

  }
  render() {
    const { onChangeType, onFindPetsClick, onAdoptPet} = this
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={onChangeType} 
                      onFindPetsClick={onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets}
                          onAdoptPet={onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
