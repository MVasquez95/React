import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom';
import {users} from '../users.json';

class Detail extends Component {
    constructor() {
        super();
        this.state = {
            users
        };
    }
    render() {
        const users = this.state.users.map((user,i) => {
            return(
                <table className = "blueTable">
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
                            <th scope="row">{i}</th>
                            <td>{user.id}</td>
                            <td>{user.state}</td>
                            <td>{user.protocol}</td>
                        </tr>
                    </tbody>
                </table>
            )
        })
        return (
            <div>
                {users}
                    <Link to="/home">
                        <button className = "btn btn-primary">
                            Regresar
                        </button>
                    </Link>
            </div>
        )
     }
}

export default Detail;