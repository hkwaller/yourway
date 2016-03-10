import React, { PropTypes, Component } from 'react'
import Firebase from 'firebase';
import { browserHistory } from 'react-router';



class Finished extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uuid: ""
    }
  }
  buttonClicked() {
    var myFirebaseRef = new Firebase("https://yourway.firebaseio.com/");
    myFirebaseRef.child(this.state.uuid).update({
      email: this.refs.email.value
    });
    browserHistory.push(`/takk`)
  }
  componentWillMount() {
    let u = "";
    if (window.localStorage.getItem("uuid")) {
      u = window.localStorage.getItem("uuid");
      this.setState({
        uuid: u
      });
    }
  }

  render () {
    return (
      <div className="finished-container">
        <div className="finished-info">
          <div className="finished-text">
            <p>Så hyggelig at du er interessert i å skreddersy en
            tur med vennene dine!  Dessverre er dette kun en
            beta versjon av tjenesten vi ønsker å tilby.</p>

            <p>Dersom du ønsker å bli med oss på tur når
            tjenesten er klar for lansering kan du legge igjen
            mailadressen din under så gir vi deg beskjed!
            </p>

            <p>
              Ønsker du å dra på en skreddesydd tur nå kan du kontakte oss på <a href="mailto:info@yourway.no">info@yourway.no</a>
            </p>

          <strong>Ha en fin dag videre!</strong>
          </div>
          <div className="finished-send">
            <input type="email" placeholder="Skriv inn din email.." ref="email" required />
            <a href="/takk" className="share-button finished-btn" onClick={::this.buttonClicked}>Hold meg oppdatert!</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Finished;
