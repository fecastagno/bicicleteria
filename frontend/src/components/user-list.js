import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = props => (
    <tr>
        <td>{props.user.usuario}</td>
        <td>{props.user.clave}</td>
        <td>{props.user.rol}</td>
        <td>
            <Link to={"/edit-user/"+props.user._id}>Edit</Link>
        </td>
        <td>
            <Link to={"/delete-user/"+props.user._id} className="text-danger">Delete</Link>
        </td>
    </tr>
)

export default class UserList extends Component {

	constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4001/users/')
        .then(response => {
            this.setState({ users: response.data });
        })
        .catch(function (error){
            console.log(error);
        })
    }

    userList() {
        return this.state.users.map((currentUser, i) =>{
            return <User user={currentUser} key={i} />;
        })
    }

    render() {
        return (
            <div>
                <h3>Lista de usuarios</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Clave</th>
                            <th>Rol</th>
                            <th>Action</th>
                            <th>Action 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.userList() }
                    </tbody>
                </table>
                <a href="/create-user" type="button" className="btn btn-primary">Crear Usuario</a>
            </div>
        )
    }
}