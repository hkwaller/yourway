import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';

const Card = ({objekt, clickHandler}) => {

  const { navn, beskrivelse, pris, bilde, selected, vanskelighetsgrad } = objekt;

  const cardClassNames = classNames('card', bilde, { 'selected': selected });
  const difficultyClassNames = classNames('card-difficulty', vanskelighetsgrad)

  return (
    <div className={cardClassNames} onClick={clickHandler}>
      <div className={difficultyClassNames}></div>
      <div className="card-name">{navn}</div>
      <div className="card-details">
        {pris ? <div className="card-price">fra {pris} kr</div> : null}
      </div>
    </div>
  )
}

export default Card;
