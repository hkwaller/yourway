import React, { PropTypes } from 'react';
import classNames from 'classnames';

const Thumbnail = ({objekt, clicked}) => {
  const classes = classNames('thumbnail-pic', objekt.bilde);

  return (
    <div className="thumbnail">
      <div className={classes} />
      <span>{objekt.navn}{objekt.pris ? `- ${objekt.pris} kr` : null}</span>
      <i onClick={clicked} className="icon ion-close" name={objekt.navn}></i>
    </div>
  )
}

export default Thumbnail;
