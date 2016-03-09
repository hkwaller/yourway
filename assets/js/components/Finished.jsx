import React, { PropTypes, Component } from 'react'

class Finished extends Component {
  render () {
    return (
      <div className="finished-container">
        <div className="finished-info">
          <div className="finished-text">
            <p>Så hyggelig at du er interessert i å skreddersy en
            tur med vennene dine!  Desverre er dette kun en
            beta versjon av tjenesten vi ønsker å tilby.</p>

            <p>Dersom du ønsker å bli med oss på tur når
            tjenesten er klar for lansering kan du legge igjen
            mailadressen din under så gir vi deg beskjed! </p>

          <strong>Ha en fin dag videre :)</strong>
          </div>
          <div className="finished-send">
            <input type="text" placeholder="Skriv inn din email.." />
            <button className="share-button finished-btn">Hold meg oppdatert!</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Finished;
