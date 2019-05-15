import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  handleFilter = type => {
    this.setState({
      filters: { ...this.state.filters, type: type }
    });
  };

  updatePetsOnState = pets => {
    this.setState({ pets: pets });
  };

  fetchPets = () => {
    let query = this.state.filters.type;
    if (query !== "all") {
      return fetch("/api/pets?type=" + query)
        .then(resp => resp.json())
        .then(this.updatePetsOnState);
    }
    return fetch("/api/pets")
      .then(resp => resp.json())
      .then(this.updatePetsOnState);
  };

  adoptPet = id => {
    const newPets = this.state.pets.map(pet =>
      pet.id === id ? { ...pet, isAdopted: !pet.isAdopted } : pet
    );
    this.setState({ pets: newPets });
  };

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
                onChangeType={type => this.handleFilter(type)}
                onFindPetsClick={this.fetchPets}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={id => this.adoptPet(id)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
