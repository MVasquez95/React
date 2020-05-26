import React, { useReducer, useEffect } from 'react';
import '../tailwind.generated.css';

import { Column, Loading, Button, trace, Row, FormModal, capFirst, zipSchema, Form, DeleteButton } from './Utils';
import { fetchMovements, updateMovement, createMovement, deleteMovement } from '../calls/movement'

// References


// -- Model

const schema = {
  "name": {
    "type": "String",
    "default": "'movimiento'",
    "visible": true
  }
}

const entityModel = {
      name: 'movimiento',
  }

const MovementController = () => {
  const initialModel = {
    mode: 'loading',
    movements: [],
    formData: { ...entityModel },
    schema: { ...schema },
    // References
    
  }

  // -- Update  

  const reducer = (model, msg) => {
    switch (msg.type) {
      case 'ERROR_MODE':
        return { ...model, mode: 'error' };
      case 'LOADING_MODE':
        return { ...model, mode: 'loading' };
      case 'VIEW_MODE':
        return { ...model, mode: 'view', formData: { ...entityModel } };
      case 'CREATE_MODE':
        return { ...model, mode: 'create', formData: { ...entityModel } };
      case 'EDIT_MODE':
        return { ...model, mode: 'edit', formData: msg.payload };
      case 'CHANGE_FORM':
        return { ...model, formData: msg.payload };
      // with middleware
      case 'FETCH_MOVEMENTS':
        return { ...model, movements: msg.payload, mode: 'view', formData: { ...entityModel } };
      // References
      
      default:
        return model
    }
  }

  // https://gist.github.com/astoilkov/013c513e33fe95fa8846348038d8fe42
  const middlewareUpdate = update => action => {
    switch (trace(action.type)) {
      case 'CREATE_MOVEMENT':
        update({ type: 'LOADING_MODE' })
        createMovement(action.payload) // { schema }
          .then(res => trace(res))
          .then(_ => fetchMovements({}))
          .then(movements => update({ type: 'FETCH_MOVEMENTS', payload: movements }))
          .catch(_ => update({ type: 'ERROR_MODE' }))
        break
      case 'UPDATE_MOVEMENT':
        update({ type: 'LOADING_MODE' })
        updateMovement(action.payload["_id"], action.payload["data"])
          .then(_ => fetchMovements({}))
          .then(movements => update({ type: 'FETCH_MOVEMENTS', payload: movements }))
          .catch(_ => update({ type: 'ERROR_MODE' }))
        break
      case 'DELETE_MOVEMENT':
        update({ type: 'LOADING_MODE' })
        deleteMovement(action.payload) // { _id: "a221asd..." }
          .then(_ => fetchMovements({}))
          .then(movements => update({ type: 'FETCH_MOVEMENTS', payload: movements }))
          .catch(_ => update({ type: 'ERROR_MODE' }))
        break
      case 'FETCH_MOVEMENTS':
        update({ type: 'LOADING_MODE' })
        fetchMovements({})
          .then(movements => update({ type: 'FETCH_MOVEMENTS', payload: movements }))
          .catch(_ => update({ type: 'ERROR_MODE' }))
        break
      default:
        update(action)
    }
  }

  const [model, update] = useReducer(reducer, initialModel);

  useEffect(() => {
    fetchMovements({})
      .then(movements => update({ type: 'FETCH_MOVEMENTS', payload: movements }))
      // References
      
      .catch(_ => update({ type: 'ERROR_MODE' }))
  }, []);

  return <Movement {...{ model, update: middlewareUpdate(update) }} />
}

// -- View

const Table = ({ columns, children }) => <table className="w-full table-fixed shadow-2xl">
  <thead>
    <tr className="bg-gray-200 rounded-t-lg">
      {columns.map((c, i) =>
        <th key={i} className="px-4 py-2">
          {capFirst(c)}
        </th>)}
      <th className="w-16 px-4 py-2 bg-gray-400"></th>
    </tr>
  </thead>
  <tbody>
    {children}
  </tbody>
</table>

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

  return date.toLocaleDateString("en-US", options);
}

const View = ({ model, update }) => <Column className="flex-1 overflow-x-hidden overflow-y-auto w-full h-full p-10">
  <Row className="center-y w-full">
    <div className="flex-1"></div>
    <Button onClick={() => update({ type: 'CREATE_MODE' })} className="w-32 my-5">Nuevo +</Button>
  </Row>
  <Table columns={zipSchema(model.schema).filter(([_, metadata]) => metadata.visible === true).map(([p, _]) => p)}>
    {model.movements.map(movement =>
      <tr key={movement._id} className="bg-white hover:bg-gray-300 shadow-inner">
        {zipSchema(model.schema).filter(([_, metadata]) => metadata.visible === true).map(([p, metadata], i) => // use schema here
          <td key={i} className="border px-4 py-2 cursor-pointer "
            onClick={() => update({ type: 'EDIT_MODE', payload: movement })}>
            {metadata.ref ? movement[p].name : null}
            {metadata.type === 'String' ? (movement[p] ? movement[p].toString(): 'Not Found!') : null}
            {metadata.type === 'Date' ? formatDate(new Date(movement[p])) : null}
            {metadata.type === 'Number' ? movement[p].toString() : null}
          </td>)}
        <td className="px-4 py-2 bg-gray-400 hover:bg-gray-400">
          <DeleteButton onClick={() => update({ type: 'DELETE_MOVEMENT', payload: movement._id })} />
        </td>
      </tr>)}
  </Table>
</Column>

const Create = ({ model, update }) => <FormModal title="Crear Movement">
  <Button key="back" onClick={() => update({ type: 'VIEW_MODE' })}>Volver</Button>
  <Form key="form" {...{ model, update }} />
  <Button key="submit" onClick={() => update({ type: 'CREATE_MOVEMENT', payload: model.formData })}>Agregar</Button>
</FormModal>

const Update = ({ model, update }) => <Row className="w-full center-x">
  <FormModal title="Editar Movement">
    <Button key="back" onClick={() => update({ type: 'VIEW_MODE' })}>Volver</Button>
    <Form key="form" {...{ model, update }} />
    <Button key="submit" onClick={() => update({
      type: 'UPDATE_MOVEMENT', payload: {
        _id: model.formData._id,
        data: { ...model.formData }
      }
    })}>Actualizar</Button>
  </FormModal>
  {/* Aquí va el inventario del motero */}
</Row>

const Movement = ({ model, update }) => (
  <Column className="center-x center-y / overflow-x-hidden overflow-y-hidden w-full h-full shadow-inner fade-in">
    {(() => {
      switch (model.mode) {
        case 'view':
          return <View {...{ model, update }} />
        case 'create':
          return <Create {...{ model, update }} />
        case 'edit':
          return <Update {...{ model, update }} />
        case 'loading':
          return <Loading />
        case 'error':
          return (<div className="text-black">Algo salió mal, por favor refresque la página</div>)
        default:
          return (<div className="text-black">Estado inválido</div>)
      }
    })()}
  </Column>);

export default MovementController;