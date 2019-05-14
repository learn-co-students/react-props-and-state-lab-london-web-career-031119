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

  onChangeType = newType => {
    this.setState({
      filters: Object.assign({}, this.state.filters, {
        type: newType
      })
    });
  };

  onAdoptPet = id => {
    const pets = this.state.pets.map(item => {
      if (item.id === id) {
        return { ...item, isAdopted: true };
      }
    });
    this.setState({ pets });
  };

  onFindPetsClick = e => {
    switch (this.state.filters.type) {
      case "all":
        this.handleRequest("/api/pets");
        break;
      case "cat":
        this.handleRequest("/api/pets?type=cat");
        break;
      case "dog":
        this.handleRequest("/api/pets?type=dog");
        break;
      case "micropig":
        this.handleRequest("/api/pets?type=micropig");
        break;
      default:
        return;
    }
  };

  handleRequest = url => {
    fetch(url)
      .then(resp => resp.json())
      .then(res => this.setState({ pets: res }));
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
                onFindPetsClick={this.onFindPetsClick}
                onChangeType={this.onChangeType}
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
