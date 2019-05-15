import React from "react";

class Pet extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="content">
          <a className="header">
            {this.props.pet.gender === "male" ? "♂" : "♀"} {this.props.pet.name}
          </a>
          <div className="meta">
            <span className="date">{this.props.pet.type}</span>
          </div>
          <div className="description">
            <p>Age: {this.props.pet.age}</p>
            <p>Weight: {this.props.pet.weight}kg</p>
          </div>
        </div>
        <div className="extra content">
          {this.props.pet.isAdopted === true ? (
            <button className="ui disabled button">Already adopted</button>
          ) : (
            <button
              className="ui primary button"
              onClick={() => this.props.onAdoptPet(this.props.pet.id)}
            >
              Adopt pet
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Pet;
//this.props.onAdoptPet (comes with Pet id)
//this.props.pet (It should show the pet's name, type, age and weight. Based on the pet's gender, the component also needs to contain either a male (♂) or female (♀) symbol.)
//this.props.isAdopted (true or false?)
