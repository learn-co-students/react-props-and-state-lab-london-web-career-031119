import React from 'react'

class Filters extends React.Component {
  render() {
    return (
      <div className="ui form">
        <h3>Animal type</h3>
        <div className="field">
        //SELECT WILL USE handleFilter ON CHANGE, RETURN INFORMATION UPWARDS
        //AFTER THE EVENT IS CHANGED(event) WILL PASS IT TO handleFilter BUT ONLY THE (EVENT.TARGET.VALUE)
          <select name="type" id="type" onChange={event => this.props.handleFilter(event.target.value)}>
            <option value="all">All</option>
            <option value="cat">Cats</option>
            <option value="dog">Dogs</option>
            <option value="micropig">Micropigs</option>
          </select>
        </div>

        <div className="field">
        //ONCE FILTER IS SET WE WANT TO TRIGGER THE handlePets FUNCTION. REMEMBER TO PASS THE RESULT
        //UPWARDS USING THE EVENT NAME ON ELEMENT handlePets={this.handlePets}/>
          <button className="ui secondary button" onClick={this.props.handleClick}>Find pets</button>
        </div>
      </div>
    )
  }
}

export default Filters
