import React, { useEffect, useReducer } from 'react';
import { IconContext } from "react-icons";
import { AiFillDelete } from "react-icons/ai";
import '../tailwind.generated.css';

import { Row, Column, Tab, trace, Loading } from './Utils';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
import { fetchTasks, deleteTask } from './../calls/task'

var { lstm } = require('../results/lstm.js');
var template = { __html: lstm };

// - Model/Update

const ExplorerDetailsController = ({ parentModel }) => {
  const initialModel = {
    mode: 'loading', // 'tasks | results'
    protocol: parentModel.protocols[parentModel.protocol],
    classifier: parentModel.classifiers[parentModel.classifier],
    tasks: [[]
    ],
    results: {
    },
    user: parentModel.user,
  }

  const reducer = (model, msg) => {
    switch (msg.type) {
      case 'CHANGE_TO_TASKS':
        return { ...model, mode: 'tasks' };
      case 'CHANGE_TO_RESULTS':
        return { ...model, mode: 'results' };
      case 'CHANGE_TO_LOADING':
        return { ...model, mode: 'loading' };
      case 'FETCH_TASKS':
        return { ...model, mode: 'tasks', tasks: msg.payload };
      case 'FETCH_DATA':
        return { ...model, mode: 'tasks', tasks: msg.payload };
      default:
        return model
    }
  }

  useEffect(() => {
    fetchTasks({ user: initialModel.user, protocol: initialModel.protocol, classifier: initialModel.classifier })
      .then(tasks => update({ type: "FETCH_TASKS", payload: tasks }))
      .catch(console.log)
  }, [initialModel.user, initialModel.protocol, initialModel.classifier]);

  const middlewareUpdate = update => action => {
    switch (trace(action.type)) {
      case 'DELETE_TASK':
        update({ type: 'CHANGE_TO_LOADING' })
        deleteTask(action.payload)
          .then(_ => fetchTasks({ user: initialModel.user, protocol: initialModel.protocol, classifier: initialModel.classifier }))
          .then(tasks => update({ type: "FETCH_TASKS", payload: tasks }))
          .catch(console.log)
        break
      default:
        update(action)
    }
  }

  const [model, update] = useReducer(reducer, initialModel);

  return <ExplorerDetails {...{ model, update: middlewareUpdate(update) }} />
}

// -- View

const Tasks = ({ model, update }) => {
  const data = [...Array(250).keys()]
    .map(x => Math.cos(x))
    .map((dataPoint, index) => ({ name: index + 1, uv: dataPoint }));

  const renderLineChart = data => (
    <LineChart width={800} height={250} data={data}>
      <Line type="monotone" dataKey="uv" stroke="#8884d8" dot={false} />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  );

  return <Column className="overflow-y-auto w-full center-x bg-gray-400">
    <p className="text-black flex-none font-bold">LISTA DE TAREAS</p>
    {model.tasks.map((t, i) => <Column key={i} className="center-x">
      <Row className="center-x">
        {renderLineChart(data)}
        <Column className="center-x justify-start cursor-pointer">
          <IconContext.Provider value={{ color: "gray", className: "global-class-name", size: "2em" }}>
            <AiFillDelete onClick={() => update({ type: 'DELETE_TASK', payload: t["_id"] })} />
          </IconContext.Provider>
        </Column>
      </Row>
      <p key={i} className="text-black flex-none h-c-25 my-1">{JSON.stringify(t)}</p>
    </Column>)}
  </Column>
}

const Results = ({ model, update }) => (
  <Column className="overflow-y-auto w-full bg-gray-400">
    <div dangerouslySetInnerHTML={template} />
    <Row className="flex-none bg-gray-500 font-bold h-c-324 m-3 p-10"> Métricas </Row>
    <Row className="flex-none bg-gray-500 font-bold h-c-324 m-3 p-10"> Otras anotaciones </Row>
  </Column>)

const Tabs = ({ model, update }) => (
  <Row className="bg-gray-300 w-full">
    <Tab className={"flex-1 " + (model.mode === 'tasks' ? "bg-gray-700" : "")}
      onClick={() => model.mode !== 'tasks' ? update({ type: 'CHANGE_TO_TASKS' }) : null}>Tareas</Tab>
    <Tab className={"flex-1 " + (model.mode === 'results' ? "bg-gray-700" : "")}
      onClick={() => model.mode !== 'results' ? update({ type: 'CHANGE_TO_RESULTS' }) : null}>Resultados</Tab>
  </Row >)

const ExplorerDetails = ({ model, update }) => (
  <Column className="center-x / overflow-hidden w-full h-full">
    {model.mode !== 'loading' ? <Tabs {...{ model, update }} /> : <></>}
    {(() => {
      switch (model.mode) {
        case 'tasks':
          return <Tasks {...{ model, update }} />
        case 'results':
          return <Results {...{ model, update }} />
        case 'loading':
          return <Column className="flex-1 center-x center-y w-full pb-56"><Loading /></Column>
        default:
          return (<div className="text-black">Estado inválido</div>)
      }
    })()}
  </Column>)

export default ExplorerDetailsController;