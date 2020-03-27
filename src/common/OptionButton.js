import React from 'react';
import { Link } from 'react-router-dom';
import './Button.scss'

const optionLink = { textDecoration: 'none', color: 'black' }

const OptionButton = (props) => (
  <Link to={props.route} style={optionLink}>
    <div className="option-button">{props.text}</div>
  </Link>
)

export default OptionButton;