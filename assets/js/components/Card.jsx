import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

const Card = ({objekt, clickHandler}) => {

  const { navn, beskrivelse, pris, bilde, selected } = objekt;

  const cardClassNames = classNames('card', bilde, { 'selected': selected });

  return (
    <div className={cardClassNames} onClick={clickHandler}>
      <div className="card-name">{navn}</div>
      <div className="card-details">
        <div className="card-price">{pris} kr</div>
        <div className="card-description">{beskrivelse}</div>
      </div>
    </div>
  )
}

export default Card;
