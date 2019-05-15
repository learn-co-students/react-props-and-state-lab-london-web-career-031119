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

  onChangeType = (event) => {this.setState({filters: {type: {...this.state.filters, type: event.target.value}}})}

  onFindPetsClick = () => {
    const type = this.state.filters.type
    
    if (type === 'cat'){
      fetch('/api/pets?type=cat')
            .then(resp => resp.json())
            .then(data => this.setState({pets: data}))
    } else if (type === 'dog'){
      fetch('/api/pets?type=dog')
            .then(resp => resp.json())
            .then(data => this.setState({pets: data}))
    } else if (type === 'micropig'){
      fetch('/api/pets?type=micropig')
            .then(resp => resp.json())
            .then(data => this.setState({pets: data}))
    } else fetch('/api/pets')
            .then(resp => resp.json())
            .then(data => this.setState({pets: data}))
  }

  onAdoptPet = (id) => {
      const pets = this.state.pets.map(pet => {
        return pet.id === id ? { ...pet, isAdopted: true} : pet
      })

      this.setState({pets})
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
              <Filters 
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
