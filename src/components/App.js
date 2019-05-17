import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {

  state = {
    pets: [],
    filters: 'all'
  }

  onChangeType = (type) => {
    this.setState({ filters: type });
  }

  adoptPet = (id) => {
    const petsCopy = this.state.pets.slice()
    petsCopy.find(pet => pet.id === id).isAdopted = true
    this.setState({ pets: petsCopy });
  }


  get url() {
    const { filters } = this.state
    if (filters !== 'all') {
      return `/api/pets?type=${filters}`
    } else return '/api/pets'
  }

  onFindPetsClick = () => {
    fetch(this.url).then(r => r.json()).then(pets => this.setState({ pets }))
  }

  render() {
    const { onFindPetsClick, onChangeType, adoptPet } = this
    const { pets } = this.state
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onFindPetsClick={onFindPetsClick} onChangeType={onChangeType} />
            </div>
            <div className="twelve wide column">
              <PetBrowser adoptPet={adoptPet} pets={pets} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
