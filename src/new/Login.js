import React, { useReducer, useEffect } from 'react';
import { IconContext } from "react-icons";
import { AiOutlineUser } from "react-icons/ai";
import '../tailwind.generated.css';

import { Row, Column, Button, NavLink, Loading, trace } from './Utils';
import { fetchUsers, createUser, deleteUser } from './../calls/user'

const Input = ({ value, onChange }) => (<input className="text-gray-600" type="text" name="name" onChange={onChange} value={value} />)

// - Model/Update

const LoginController = () => {
  const initialModel = {
    mode: 'loading',
    profiles: [],
    newUser: ''
  }

  const reducer = (model, msg) => {
    switch (msg.type) {
      case 'CHANGE_TO_ERROR_MODE':
        return { ...model, mode: 'error', newUser: '' };
      case 'CHANGE_TO_LOADING_MODE':
        return { ...model, mode: 'loading', newUser: '' };
      case 'CHANGE_TO_PICKER_MODE':
        return { ...model, mode: 'picker', newUser: '' };
      case 'CHANGE_TO_ADDER_MODE':
        return { ...model, mode: 'adder' };
      case 'CHANGE_NEW_USERNAME':
        return { ...model, newUser: msg.payload };
      // with middleware
      case 'ADD_USER':
        return { ...model, profiles: msg.payload, mode: 'picker', newUser: '' };
      case 'DELETE_USER':
        return { ...model, profiles: msg.payload, mode: 'picker', newUser: '' };
      case 'FETCH_USERS':
        return { ...model, profiles: msg.payload, mode: 'picker', newUser: '' };
      default:
        return model
    }
  }

  // https://stackoverflow.com/questions/53146795/react-usereducer-async-data-fetch
  // https://gist.github.com/astoilkov/013c513e33fe95fa8846348038d8fe42
  const middlewareUpdate = update => action => {
    switch (trace(action.type)) {
      case 'ADD_USER':
        update({ type: 'CHANGE_TO_LOADING_MODE' })
        createUser({ name: action.payload })
          .then(_ => fetchUsers({}))
          .then(profiles => update({ ...action, payload: profiles }))
          .catch(_ => update({ type: 'CHANGE_TO_ERROR_MODE' }))
        break
      case 'DELETE_USER':
        update({ type: 'CHANGE_TO_LOADING_MODE' })
        fetchUsers({ name: action.payload}) // fetchAll is user coz individual fetching is yet implemented
          .then(users => users[0]) // since we are deleting there is always gonna be a 0, but this is dangerous
          .then(user => deleteUser(user["_id"]))
          .then(_ => fetchUsers({}))
          .then(profiles => update({ ...action, payload: profiles }))
          .catch(_ => update({ type: 'CHANGE_TO_ERROR_MODE' }))
        break
      case 'FETCH_USERS':
        update({ type: 'CHANGE_TO_LOADING_MODE' })
        fetchUsers({})
          .then(profiles => update({ ...action, payload: profiles }))
          .catch(_ => update({ type: 'CHANGE_TO_ERROR_MODE' }))
        break
      default:
        update(action)
    }
  }

  const [model, update] = useReducer(reducer, initialModel);

  useEffect(() => {
    fetchUsers({})
      .then(profiles => update({ type: "FETCH_USERS", payload: profiles }))
      .catch(_ => update({ type: 'CHANGE_TO_ERROR_MODE' }))
  }, []);

  return <Login {...{ model, update: middlewareUpdate(update) }} />
}

// -- View

const ProfileCard = ({ children }) => (
  <Column className="flex-none center-x justify-evenly mx-10 bg-gray-600 w-64 h-c-289">
    {children}
  </Column>)

const Frame = ({ title = "Title missing", button, children }) => (
  <Column className="center-x justify-evenly / overflow-x-hidden bg-gray-400 w-4/5 lg:w-2/4 h-c-400 rounded-md shadow-2xl fade-in">
    <Row className="w-full ">
      <Column className="center-x center-y flex-1 / ml-8">
        <h1 className="text-gray-600 text-center text-2xl">{title}</h1>
      </Column>
      <Column className="self-end / mr-8">
        {/* Go to Picker or Go to Adder */}
        {button}
      </Column>
    </Row>
    <Row className="center-y flex-none / overflow-x-auto overflow-y-hidden bg-gray-500 w-11/12 h-c-324 shadow-inner rounded-md">
      {/* Picker or Adder */}
      {children}
    </Row>
  </Column>)

const ProfileImage = () => (
  <div className="flex items-center justify-center rounded-full h-32 w-32 bg-gray-100">
    <IconContext.Provider value={{ color: "gray", className: "global-class-name", size: "5em" }}>
      <AiOutlineUser />
    </IconContext.Provider>
  </div>)

const ProfilePicker = ({ model, update }) => (
  <Frame button={<Button onClick={() => update({ type: 'CHANGE_TO_ADDER_MODE' })}>Crear usuario</Button>} title="Seleccione un usuario">
    {model.profiles.map((profile, i) =>
      (<ProfileCard key={i}>
        <ProfileImage />
        <NavLink to="/home" state={{ user: profile.name }}>
          <p className="text-white font-bold">Nombre: {profile.name}</p>
        </NavLink>
        <Button onClick={() => update({ type: 'DELETE_USER', payload: profile.name })}>Eliminar</Button>
      </ProfileCard>)
    )}
  </Frame>)

const ProfileAdder = ({ model, update }) => (
  <Frame button={<Button onClick={() => update({ type: 'CHANGE_TO_PICKER_MODE' })}>Elegir usuario</Button>} title="Escriba el nombre del nuevo usuario">
    <Column className="center-x / w-full">
      <ProfileCard>
        <ProfileImage />
        <Input value={model.newUser} onChange={(e) => update({ type: 'CHANGE_NEW_USERNAME', payload: e.target.value })} />
        <Button onClick={() => update({ type: 'ADD_USER', payload: model.newUser })}>Crear</Button>
      </ProfileCard>
    </Column>
  </Frame>)

const Login = ({ model, update }) => (
  <Column className="center-x center-y / overflow-x-hidden w-full h-full shadow-inner">
    {(() => {
      switch (model.mode) {
        case 'adder':
          return <ProfileAdder {...{ model, update }} />
        case 'picker':
          return <ProfilePicker {...{ model, update }} />
        case 'loading':
          return <Loading />
        case 'error':
          return (<div className="text-black">Algo salió mal, por favor refresque la página</div>)
        default:
          return (<div className="text-black">Estado inválido</div>)
      }
    })()}
  </Column>);

export default LoginController;