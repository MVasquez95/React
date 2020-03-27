import React from 'react';
import { Link } from 'react-router-dom';
import './Button.scss'
import { FaExchangeAlt } from "react-icons/fa";
import { FiUser, FiUsers } from "react-icons/fi";

const optionLink = { textDecoration: 'none', color: 'black' }

const ChangeProfileButton = (props) => (
  <Link to={props.route} style={optionLink}>
    <div className="top-righ-button">
      <FiUser size="2em" color="coral" />-<FaExchangeAlt size="2em" color="coral" />-<FiUsers size="2em" color="coral" />
    </div>
  </Link>
)

export default ChangeProfileButton;