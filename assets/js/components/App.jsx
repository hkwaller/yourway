import React, { PropTypes, Component } from 'react';
import Card from './Card.jsx';

import turer from '../../lib/turer.json';
import aktiviteter from '../../lib/aktiviteter.json';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTours: [],
      turer: turer,
      aktiviteter: aktiviteter,
      pris: 0
    }
  }
  clickHandler = (e) => {

    this.state.turer.forEach((tur, index) => {
      if (tur.bilde === e.target.classList[1]) {
        this.state.turer[index].selected = true;
        this.setState({
          selectedTours: this.state.selectedTours.concat([tur]),
          pris: this.state.pris + tur.pris
        });
      }
    })

  }

  activityClick = (e) => {
    this.state.aktiviteter.forEach((aktivitet, index) => {
      if (aktivitet.bilde === e.target.classList[1]) {
        this.state.aktiviteter[index].selected = true;

        this.setState({
          pris: this.state.pris + aktivitet.pris
        });
      }
    })
  }

  renderTours() {
    return this.state.turer.map(tur => {
      return <Card key={tur.navn} objekt={tur} clickHandler={this.clickHandler} />
    })
  }

  renderActivities() {
    return this.state.aktiviteter.map(aktivitet => {
      return <Card key={aktivitet.navn} objekt={aktivitet} clickHandler={this.activityClick} />
    })
  }

  render() {
    return (
      <div>
        <div className="card-row">
          {::this.renderTours()}
        </div>
        {this.state.selectedTours.length > 0 ? <div className="card-row">{::this.renderActivities()}</div> : null}
        <div className="price-row">
          {this.state.pris}
        </div>
      </div>
    )
  }
}

export default App;
