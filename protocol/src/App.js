import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App" style={{
      textAlign: 'center',
      position: 'absolute', left: '50%', top: '40%',
      transform: 'translate(-50%, -50%)'
    }}>
      <div className="padded">
        <h1>APLICACIÓN WEB</h1>
        <br/>
        <button type="button" class="btn btn-primary">
          EMPEZAR ENTRENAMIENTO
        </button>
        <br/>
        <button type="button" class="btn btn-primary">
          CAMBIAR USUARIO
        </button>
      </div>
    </div>
  );
}

export default App;
