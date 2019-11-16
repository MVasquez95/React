import React from 'react';
import { Link } from 'react-router-dom';
import './TopRightButton.css'
import { AiOutlineRollback } from "react-icons/ai";
import { FiUser, FiUsers } from "react-icons/fi";

const optionLink = { textDecoration: 'none', color: 'black' }

const BackHomeButton = (props) => (
  <Link to={props.route} style={optionLink}>
    <div className="top-righ-button" style={{ color: "white" }}>
      <FiUser size="2em" color="white" />-<AiOutlineRollback size="2em" color="coral" />-<FiUsers size="2em" color="white" />
    </div>
  </Link>
)

export default BackHomeButton;