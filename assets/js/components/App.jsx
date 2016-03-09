import React, { PropTypes, Component } from 'react';
import Card from './Card.jsx';

import turer from '../../lib/turer.json';
import aktiviteter from '../../lib/aktiviteter.json';
import overnatting from '../../lib/overnatting.json';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTours: [],
      selectedActivities: [],
      selectedOvernatting: [],
      turer: turer,
      aktiviteter: aktiviteter,
      overnatting: overnatting,
      pris: 0
    }
  }
  clickHandler = (e) => {

    this.state.turer.forEach((tur, index) => {
      if (tur.bilde === e.target.classList[1]) {
        if (this.state.turer[index].selected) {
          this.state.turer[index].selected = false;
          this.setState({
            selectedTours: this.state.selectedTours.splice(1, 1),
            pris: this.state.pris - tur.pris
          });
          return;
        } else {
          this.state.turer[index].selected = true;
          this.setState({
            selectedTours: this.state.selectedTours.concat([tur]),
            pris: this.state.pris + tur.pris
          });
        }
      }
    })

  }

  activityClick = (e) => {
    this.state.aktiviteter.forEach((aktivitet, index) => {
      if (aktivitet.bilde === e.target.classList[1]) {
        if (this.state.aktiviteter[index].selected) {
          this.state.aktiviteter[index].selected = false;
          this.setState({
            selectedActivities: this.state.selectedActivities.splice(1, 1),
            pris: this.state.pris - aktivitet.pris
          });
          return;
        } else {
          this.state.aktiviteter[index].selected = true;
          this.setState({
            selectedActivities: this.state.selectedActivities.concat([aktivitet]),
            pris: this.state.pris + aktivitet.pris
          });
        }
      }
    })
  }

  overnattingClick = (e) => {
    this.state.overnatting.forEach((overnatting, index) => {
      if (overnatting.bilde === e.target.classList[1]) {
        if (this.state.overnatting[index].selected) {
          this.state.overnatting[index].selected = false;
          this.setState({
            selectedOvernatting: this.state.selectedOvernatting.splice(1, 1),
            pris: this.state.pris - overnatting.pris
          });
          return;
        } else {
          this.state.overnatting[index].selected = true;
          this.setState({
            selectedOvernatting: this.state.selectedOvernatting.concat([overnatting]),
            pris: this.state.pris + overnatting.pris
          });
        }
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

  renderSleepOptions() {
    return this.state.overnatting.map(overnatting => {
      return <Card key={overnatting.navn} objekt={overnatting} clickHandler={this.overnattingClick} />
    })
  }

  render() {
    return (
      <div className="app">
        <div className="left">
          <div className="row-heading">
            <h2>Geografi</h2>
          </div>
          <div className="card-row">
            {::this.renderTours()}
          </div>
          {this.state.selectedTours.length > 0 ? <div><div className="row-heading"><h2>Aktiviteter</h2></div><div className="card-row">{::this.renderActivities()}</div></div> : null}
          {this.state.selectedActivities.length > 0 ? <div><div className="row-heading"><h2>Overnatting</h2></div><div className="card-row">{::this.renderSleepOptions()}</div></div> : null}
        </div>
        <div className="right">
          <h3>Informasjon</h3>
          <ul className="hero">
            <li><img src="img/green.png" />Krever ingen forkunnskaper</li>
            <li><img src="img/orange.png" />Moderat</li>
            <li><img src="img/red.png" />Krevende</li>
          </ul>
          <h3>Pris</h3>
          <div className="price-row">
            <div>{this.state.pris}</div>
          </div>
          <h3>Valgt</h3>
          <ul className="selected-things">
            {this.state.selectedTours.length === 0 ? 'Ingen valg gjort enda' : null}
            {this.state.selectedTours.map(tur => {
              return <li key={tur.navn}>{tur.navn} - {tur.pris} kr</li>
            })}

            {this.state.selectedActivities.map(aktivitet => {
              return <li key={aktivitet.navn}>{aktivitet.navn} - {aktivitet.pris} kr</li>
            })}

            {this.state.selectedOvernatting.map(overnatting => {
              return <li key={overnatting.navn}>{overnatting.navn} - {overnatting.pris} kr</li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default App;
