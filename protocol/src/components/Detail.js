import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import { users } from '../users.json';

class Detail extends Component {
    constructor() {
        super();
        this.state = {
            users
        };
    }
    render() {
        console.log(this.state.users[0]);
        return (
            <div>
                <table className="blueTable">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">id</th>
                            <th scope="col">state</th>
                            <th scope="col">protocol</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">{1}</th>
                            <td>{this.state.users[0].id}</td>
                            <td>{this.state.users[0].state}</td>
                            <td>{this.state.users[0].protocol}</td>
                        </tr>
                    </tbody>
                </table>
                <Link to="/home">
                    <button className="btn btn-primary">
                        Regresar
                </button>
                </Link>
            </div>
        )
    }
}

export default Detail;