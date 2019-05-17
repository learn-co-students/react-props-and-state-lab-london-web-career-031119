import React from 'react';
import Pet from './Pet'


const PetBrowser = ({ pets, adoptPet }) =>
  <div className="ui cards">{pets.map(pet =>
    <Pet key={pet.id} pet={pet} onAdoptPet={() => adoptPet(pet.id)} />
  )}</div>


export default PetBrowser;
