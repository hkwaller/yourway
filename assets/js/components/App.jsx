import React, { PropTypes, Component } from 'react';
import Card from './Card.jsx';
import Thumbnail from './Thumbnail';

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
      pris: 0,
      travellers: 0
    }
  }
  clickHandler = (e) => {

    this.state.turer.forEach((tur, index) => {
      if (tur.bilde === e.target.classList[1]) {
        if (this.state.turer[index].selected) {
          this.state.turer[index].selected = false;
          this.setState({
            selectedTours: this.state.selectedTours.splice(1, 1),
          });
          return;
        } else {
          this.state.turer[index].selected = true;
          this.setState({
            selectedTours: this.state.selectedTours.concat([tur]),
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

  activityCrossClicked = (e) => {
    let n = e.target.getAttribute('name');
    this.state.selectedActivities.map((a, index) => {
      if (a.navn === n) {
        let list = this.state.selectedActivities.splice(1, index);
        this.state.selectedActivities[index].selected = false;
        this.setState({
          selectedActivities: list,
          pris: this.state.pris - a.pris
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

  renderSleepOptions() {
    return this.state.overnatting.map(overnatting => {
      return <Card key={overnatting.navn} objekt={overnatting} clickHandler={this.overnattingClick} />
    })
  }

  editTravellers(type) {

    if (type === "add") {
      this.setState({
        travellers: this.state.travellers + 1
      });
    } else {
      if (this.state.travellers - 1 === -1) return;

      this.setState({
        travellers: this.state.travellers - 1
      });
    }
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
          <div className="row-heading">
            <h2>Aktiviteter</h2>
            <ul className="hero">
              <li><img src="img/green.png" />Krever ingen forkunnskaper</li>
              <li><img src="img/orange.png" />Moderat</li>
              <li><img src="img/red.png" />Krevende</li>
            </ul>
          </div>
          <div className="card-row">{::this.renderActivities()}</div>
          <div className="row-heading">
            <h2>Overnatting</h2>
          </div>
          <div className="card-row">{::this.renderSleepOptions()}</div>
        </div>
        <div className="right">
          <h3>Reisende</h3>
          <div className="travellers">
            <i className="ion-minus" onClick={() => this.editTravellers("")}></i>
            <div>
              <i className="ion-person"></i>
              {this.state.travellers}
            </div>
            <i className="ion-plus" onClick={() => this.editTravellers("add")}></i>
          </div>
          <h3>Pris</h3>
          <div className="price-row">
            <div>{this.state.pris}</div>
          </div>
          <h3 style={{textAlign: 'left'}}>Din skreddersøm</h3>
          <ul className="selected-things">
            {this.state.selectedTours.length !== 0 ||
             this.state.selectedActivities.length !== 0 ||
             this.state.selectedOvernatting.length !== 0 ? null : 'Ingen valg gjort enda'}

            {this.state.selectedTours.map(tur => {
              return <li key={tur.navn}><Thumbnail objekt={tur} /></li>
            })}

            {this.state.selectedActivities.map(aktivitet => {
              return <li key={aktivitet.navn}><Thumbnail objekt={aktivitet} clicked={::this.activityCrossClicked} /></li>
            })}

            {this.state.selectedOvernatting.map(overnatting => {
              return <li key={overnatting.navn}><Thumbnail objekt={overnatting} /></li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default App;
