import React, { useReducer, useEffect } from 'react';
import '../tailwind.generated.css';
import { Row, Column, Button, NavLink, Plaque, trace } from './Utils';

// - Model/Update

const HomeController = (props) => {
  const initialModel = {
    user: ''
  }

  const reducer = (model, msg) => {
    switch (msg.type) {
      case 'FETCH_USERNAME_FROM_LOCATION':
        return { ...model, user: msg.payload };
      default:
        return model
    }
  }

  const [model, update] = useReducer(reducer, initialModel);

  useEffect(() => {
    const { user } = props.location.state
    update({ type: "FETCH_USERNAME_FROM_LOCATION", payload: user })
  }, [props.location.state]);

  const middlewareUpdate = update => action => {
    switch (trace(action.type)) {
      default:
        update(action)
    }
  }

  return <Home {...{ model, update: middlewareUpdate(update) }} />
}

// -- View

const Header = () => (
  <Row className={"center-y w-full h-c-81 "}>
    <Row className="ml-10 flex-1">
      <Plaque className="bg-red-600">Modo Mock</Plaque>
    </Row>
    <NavLink to="/" className="mr-10">
      <Button>Back</Button>
    </NavLink>
  </Row>);

const Options = ({ model, update }) => (
  <Column className="flex-1 justify-evenly">
    <NavLink to="/mind-race" className="w-full wobble"  state={{ user: model.user }}>
      <Button className="w-full">¡Nuevo! Mind Race</Button>
    </NavLink>
    <NavLink to="/pool" className="w-full wobble"  state={{ user: model.user }}>
      <Button className="w-full">¡Nuevo! Pool</Button>
    </NavLink>
    <NavLink to="/dashboard" className="w-full wobble"  state={{ user: model.user }}>
      <Button className="w-full">¡Nuevo! Dashboard</Button>
    </NavLink>
    <Button>Entrenamientos</Button>
    <Button>Feedbacks</Button>
  </Column >)

const Home = ({ model, update }) => (
  <Column className="center-x / bg-gray-200 w-screen h-screen shadow-inner fade-in">
    <Header />
    <Column className="flex-none text-gray-600 w-2/4 text-center text-4xl my-10">
      Aplicación de Interfaz Cerebro Computadora (BCI) para interacción asistida en Videojuego
      <p className="text-xl mt-3">Bienvenido: {model.user}</p>
    </Column>
    <Options {...{ model, update }}/>
    <Column className="flex-1" />
  </Column>)

export default HomeController;