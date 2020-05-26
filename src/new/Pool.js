// import React, { useEffect, useReducer } from 'react';
import React, { useEffect, useReducer } from 'react';
import '../tailwind.generated.css';
import { IconContext } from "react-icons";
import { AiFillCloseCircle } from "react-icons/ai";

import { Row, Column, Button, NavLink, Plaque, Loading, trace } from './Utils';
import ExplorerDetails from './ExplorerDetails';
import { createTask } from '../calls/task';

// - Model/Update

const PoolController = (props) => {
  const initialModel = {
    mode: 'picker', // 'error | loading | picker | explorer'
    // mode: 'explorer', // 'error | loading | picker | explorer'
    protocols: [
      'Graz',
      'A-BCI',
      'MindRace',
      'BCI Competition'
    ],
    classifiers: [
      'CSP/LDA',
      'LSTM',
      'GRNN'
    ],
    protocol: -1, // selected protocol index
    classifier: -1, // selected classifier index
    user: '',
    explorerMode: 'tasks', // 'tasks | results'
  }

  const reducer = (model, msg) => {
    switch (msg.type) {
      case 'CHANGE_TO_ERROR_MODE':
        return { ...model, mode: 'error', protocol: -1, classifier: -1 };
      case 'CHANGE_TO_LOADING_MODE':
        return { ...model, mode: 'loading' };
      case 'CHANGE_TO_PICKER_MODE':
        return { ...model, mode: 'picker', protocol: -1, classifier: -1 };
      case 'CHANGE_TO_EXPLORER_MODE':
        return { ...model, mode: 'explorer', ...msg.payload };
      // with middleware
      case 'FETCH_USERNAME_FROM_LOCATION':
        return { ...model, user: msg.payload };
      case 'EXPLORE_COMBINATION':
        return { ...model, profiles: msg.payload, newUsername: '', mode: 'explorer' };
      case 'SELECT_CLASSIFIER':
        return { ...model, classifier: msg.payload.classifier };
      case 'SELECT_PROTOCOL':
        return { ...model, protocol: msg.payload.protocol };
      default:
        return model
    }
  }

  const [model, update] = useReducer(reducer, initialModel);

  // useEffect(() => {
  //   fetchUsers() // FETCH USER FROM LINK
  //     .fork(console.log, profiles => update({ type: "FETCH_USERS", payload: profiles }))
  // }, []);

  useEffect(() => {
    const { user } = props.location.state
    update({ type: "FETCH_USERNAME_FROM_LOCATION", payload: user })
  }, [props.location.state]);

  const middlewareUpdate = update => action => {
    switch (trace(action.type)) {
      case 'SELECT_PROTOCOL':
        if (action.payload.isComboReady) {
          update({ type: 'CHANGE_TO_EXPLORER_MODE', payload: { protocol: action.payload.protocol } })
        } else
          update(action)
        break
      case 'SELECT_CLASSIFIER':
        if (action.payload.isComboReady) {
          update({ type: 'CHANGE_TO_EXPLORER_MODE', payload: { classifier: action.payload.classifier } })
        } else
          update(action)
        break
      case 'ADD_TASK':
        update({ type: 'CHANGE_TO_LOADING_MODE' })
        createTask(action.payload)
          .then(_ => update({ type: 'CHANGE_TO_EXPLORER_MODE' }))
          .catch(_ => update({ type: 'CHANGE_TO_ERROR_MODE' }))
        break
      default:
        update(action)
    }
  }

  return <Pool {...{ model, update: middlewareUpdate(update) }} />
}

// -- View

const Header = ({ model, update }) => (
  <Row className="flex-none center-y w-full h-c-81">
    <Row>
      <Plaque className="bg-red-600">Modo Mock</Plaque>
    </Row>
    <h1 className="flex-1 text-gray-600 text-center text-xl mx-2">Aplicación de Interfaz Cerebro Computadora (BCI) para interacción asistida en Videojuego</h1>
    <NavLink to="/home" state={{ user: model.user }}>
      <Button>Back</Button>
    </NavLink>
  </Row>);

const Picker = ({ children }) => (
  <Column className="center-x justify-start w-64 bg-gray-300 h-full mx-3">
    {children}
  </Column>)

const ComboPicker = ({ model, update }) =>
  <Row className="justify-end bg-gray-300 w-full py-3 px-3 my-3 fade-in">
    <h1 className="flex-1 mt-3 font-bold text-gray-600 text-2xl">{model.user}</h1>
    <Picker>
      <h1 className="text-center font-bold text-gray-600 text-2xl my-3">Datasets</h1>
      {model.protocols
        .map((x, i) => <Button key={i}
          className={"w-64 my-1 " + (model.protocol === i ? "bg-gray-700" : "")}
          onClick={() => update({
            type: 'SELECT_PROTOCOL', payload: {
              protocol: i,
              isComboReady: model.classifier === -1 ? false : true
            }
          })}>
          {x}
        </Button>)}
    </Picker>
    <Picker>
      <h1 className="text-center font-bold text-gray-600 text-2xl my-3">Algoritmos</h1>
      {model.classifiers
        .map((x, i) => <Button key={i}
          className={"w-64 my-1 " + (model.classifier === i ? "bg-gray-700" : "")}
          onClick={() => update({
            type: 'SELECT_CLASSIFIER', payload: {
              classifier: i,
              isComboReady: model.protocol === -1 ? false : true
            }
          })}>
          {x}
        </Button>)}
    </Picker>
  </Row>

const Explorer = ({ model, update }) =>
  <Column className="center-x w-full overflow-hidden min-h-full fade-in">
    <Row className="justify-end bg-gray-300 w-full py-3 px-3 my-3">
      <Row className="justify-start flex-1 center-y">
        <h1 className="mt-3 mr-5 font-bold text-gray-600 text-2xl">{model.user}</h1>
        <Button onClick={() => update({
          type: 'ADD_TASK', payload: {
            user: model.user,
            protocol: model.protocols[model.protocol],
            classifier: model.classifiers[model.classifier]
          }
        })}>
          Add Fake Task (Dev Only)
      </Button>
      </Row>
      <Column className="center-x justify-start w-64 bg-gray-300 h-full mx-3">
        <Plaque className="w-64 my-1 bg-gray-700 cursor-default">{model.protocols[model.protocol]}</Plaque>
      </Column>
      <Column className="center-x justify-start w-64 bg-gray-300 h-full mx-3">
        <Plaque className="w-64 my-1 bg-gray-700 cursor-default">{model.classifiers[model.classifier]}</Plaque>
      </Column>
      <Column className="center-x center-y cursor-pointer">
        <IconContext.Provider value={{ color: "gray", className: "global-class-name", size: "2em" }}>
          <AiFillCloseCircle onClick={() => update({ type: 'CHANGE_TO_PICKER_MODE' })} />
        </IconContext.Provider>
      </Column>
    </Row>
    <ExplorerDetails parentModel={model} />
  </Column>

const Pool = ({ model, update }) => (
  <Column className="center-x / overflow-hidden w-full h-full px-10 shadow-inner fade-in">
    <Header  {...{ model, update }} />
    {(() => {
      switch (model.mode) {
        case 'picker':
          return <ComboPicker {...{ model, update }} />
        case 'explorer':
          return <Explorer {...{ model, update }} />
        case 'loading':
          return <Loading />
        case 'error':
          return (<div className="text-black">Algo salió mal, por favor refresque la página</div>)
        default:
          return (<div className="text-black">Estado inválido</div>)
      }
    })()}
  </Column>)

export default PoolController;