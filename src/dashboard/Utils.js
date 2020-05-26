import React from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import { AiFillDelete } from "react-icons/ai";
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

export const Button = ({ children, onClick, className }) => (
  <button onClick={onClick} className={"transition duration-500 ease-in-out bg-gray-500 text-white font-bold py-2 px-4 rounded / hover:bg-gray-700 transform hover:scale-105 " + className}>
    {children}
  </button>);

export const Tab = ({ children, onClick, className }) => (
  <button onClick={onClick} className={"transition duration-500 ease-in-out bg-gray-500 text-white font-bold py-2 px-4 rounded / hover:bg-gray-700 " + className}>
    {children}
  </button>);

export const Plaque = ({ children, className }) => (
  <button className={"text-white font-bold py-2 px-4 rounded " + className}>
    {children}
  </button>
);

export const Loading = () => (<div className="text-black">Loading...</div>)

export const capFirst = s => s[0].toUpperCase() + s.slice(1);

//////////////////////////////////////////////////

export const Card = ({ children }) =>
  <Column className="center-x center-y flex-none rounded w-1/2 bg-white shadow-inner px-10 py-5 fade-in">
    {children}
  </Column>

export const FormModal = ({ title, children }) => <Card>
  <Row className="flex-none center-y w-full">
    <h1 className="flex-1 text-center font-bold">{title}</h1>
    {children.filter(comp => comp.key === 'back')}
  </Row>
  <div className="m-3 w-full border-t h-c-1 border-gray-500"></div>
  <Column className="flex-1 w-full">
    {children.filter(comp => comp.key === 'form')}
  </Column>
  <div className="m-3 w-full border-t h-c-1 border-gray-500"></div>
  <Row className="flex-none w-full center-y center-x">
    {children.filter(comp => comp.key === 'submit')}
  </Row>
</Card>

export const Input = ({ name = '', onChange, value = '' }) => {
  return <div className="m-3">
    <p className="mb-3">
      {capFirst(name)}
    </p>
    <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
      onChange={(e) => onChange(e.target.value)} value={value} />
  </div>
}

export const Select = ({ defaultValue, options = [], onChange }) => <div className="py-2"><div className="m-3">Selecciona una opcion</div>
  <select className="w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    value={defaultValue}
    onChange={(e) => {
      e.preventDefault()
      onChange(e.target.value)
    }}>
    {options.map((o, i) =>
      <option key={i} value={o._id}>
        {o.name.toUpperCase()}
        {/* {JSON.stringify(o)} */}
      </option>)}
  </select>
</div>

export const zipSchema = obj => Object.keys(obj).map(k => [k, obj[k]])

export const Form = ({ model, update }) => zipSchema(model.schema)
  .map(([property, metadata], i) => {
    if (property === '_id' || property === '__v')
      return null
    if (Array.isArray(metadata)) // Inventory of some sort
      return null
    if (metadata.type === 'Date' || metadata.type === 'Binary' || metadata.type === 'JSON') // not suported yet
      return null
    if (metadata.ref)
      return <Select key={i} defaultValue={model.formData[property]._id}
        options={model[`${metadata.ref.toLowerCase()}s`]} // References
        onChange={(value) => update({ type: 'CHANGE_FORM', payload: { ...model.formData, [property]: { "_id": value } } })} />
    return <Input key={i}
      name={property}
      value={model.formData[property]}
      onChange={(value) => update({ type: 'CHANGE_FORM', payload: { ...model.formData, [property]: value } })}
    />
  })

export const DeleteButton = ({ onClick }) => <button onClick={onClick}
  className="rounded-full w-10 h-10 flex items-center justify-center transition duration-500 ease-in-out bg-gray-500 text-white font-bold py-2 px-4 rounded / hover:bg-gray-700 transform hover:scale-105 ">
  <IconContext.Provider value={{ color: "white", className: "flex-none global-class-name", size: "1.5em" }}>
    <AiFillDelete />
  </IconContext.Provider>
</button>


