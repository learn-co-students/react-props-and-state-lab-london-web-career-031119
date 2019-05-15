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

  onChangeType = event => {
    this.setState( { ...this.state, filters: { type: event.target.value } } );
  }

  onFindPetsClick = () => {
    let result;
    switch (this.state.filters.type) {
      case 'all':
        result = '';
        break;
      case 'cat':
        result = '?type=cat';
        break;
      case 'dog':
        result = '?type=dog';
        break;
      case 'micropig':
        result = '?type=micropig';
        break;
      default:
        result = '';
    }

    const Url = '/api/pets' + result;
    fetch(Url)
      .then(resp => resp.json())
      .then(resp => this.setState( { ...this.state, pets: resp } ))
  }

  onAdoptPet = petId => {
    const updatedPets = this.state.pets.map(pet => pet.id !== petId ? pet : {...pet, isAdopted: true})
    this.setState( { ...this.state, pets: updatedPets } )
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick} />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
