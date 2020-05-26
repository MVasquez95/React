import React from 'react';
import { Link } from 'react-router-dom';
import '../tailwind.generated.css';

export const trace = x => {
  console.log(x)
  return x
}

export const NavLink = ({ children, to, className, state = {} }) => (
  <Link className={className}
    to={{
      pathname: to,
      state: {
        from: window.location.href,
        ...state
      }
    }}>
    {children}
  </Link>);

export const Row = ({ className = "", children }) => {
  const centerX = className.match(/center-x/g) ? " justify-center " : ""
  const centerY = className.match(/center-y/g) ? " items-center " : ""
  return (
    <div className={"flex " + centerX + centerY + className}>
      {children}
    </div>);
}

export const Column = ({ className = "", children }) => {
  const centerX = className.match(/center-x/g) ? " items-center " : ""
  const centerY = className.match(/center-y/g) ? " justify-center " : ""
  return (
    <div className={"flex flex-col " + centerX + centerY + className}>
      {children}
    </div>);
}

export const Button = ({ children, onClick, className, disabled = false }) => (
  <button disabled={disabled} onClick={onClick} className={"transition duration-500 ease-in-out bg-gray-500 text-white font-bold py-2 px-4 rounded / hover:bg-gray-700 transform hover:scale-105 " + className}>
    {children}
  </button>);

export const Tab = ({ children, onClick, className }) => (
  <button onClick={onClick} className={"transition duration-500 ease-in-out bg-gray-500 text-white font-bold py-2 px-4 rounded / hover:bg-gray-700 " + className}>
    {children}
  </button>);

// const bgColor = className.match(/bg-[a-z]*-[0-9][0-9]*/g)
export const Plaque = ({ children, className }) => (
  <button className={"text-white font-bold py-2 px-4 rounded " + className}>
    {children}
  </button>
);

export const Loading = () => (<div className="text-black">Loading...</div>)