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

  onChangeType = event => {
    this.setState({
      filters: {
        ...this.state.filters,
        type: event.target.value
      }
    });
  };

  onFindPetsClick = () => {
    fetch(
      this.state.filters.type === "all"
        ? "/api/pets"
        : `/api/pets?type=${this.state.filters.type}`
    )
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          pets: data
        });
      });
  };

  onAdoptPet = id => {
    // const found = this.state.pets.filter(pet => pet.id === id);

    // if (found[0]) {
    //   found[0].isAdopted = true;
    // }

    const newPet = this.state.pets.map(pet =>
      pet.id === id ? { ...pet, isAdopted: true } : pet
    );

    this.setState({
      pets: newPet
    });
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
                onChangeType={this.onChangeType}
                onFindPetsClick={this.onFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser pets={this.state.pets} onAdoptPet={this.onAdoptPet} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
