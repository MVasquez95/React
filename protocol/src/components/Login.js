import React, {Component} from 'react';
import '../App.css';

class Login extends Component {
    handleInput() {
        console.log('writing...');
    }
    render() {
        return (
            <div className = "card">
                <form className="card-body">
                    <div className="form-group">
                        <input
                        type = "text"
                        name = "nombre"
                        onChange={this.handleInput}
                        className = "form-control"
                        placeholder = "Nombre"
                        />
                     
                    </div>
                </form>
            </div>
        )
     }
}

export default Login;