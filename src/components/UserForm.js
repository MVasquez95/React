import React, {Component} from 'react';

class UserForm extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            state: '',
            protocol: 'graz',
            timestamps: []
        };
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInput(e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
        console.log(this.state);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.onAddUser(this.state);
        this.setState({
            id: '',
            state: '0',
            protocol: 'graz',
            timestamps: []
        });
    }

    render() {
        return(
            <div className = "card">
                <form className = "card-body" onSubmit={this.handleSubmit}>
                    <div className = "form-group">
                        <input
                        type = "text"
                        name = "id"
                        onChange={this.handleInput}
                        className = "form-control"
                        placeholder = "Nombre"
                        />
                    </div>
                    <div className = "form-group">
                        <select
                        name = "protocol"
                        className = "form-control"
                        onChange={this.handleInput}
                        >
                            <option>Graz Protocol</option>
                            <option>Propio</option>
                        </select>
                    </div>
                    <button type = "submit" className ="btn btn-primary">
                        Agregar
                    </button>
                </form>
            </div>
        )
    }
}

export default UserForm;