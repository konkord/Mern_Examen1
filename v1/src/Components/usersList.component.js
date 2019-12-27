import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"

const User = props => (
  <tr itemScope="row">
    <td>{props.user.username}</td>
    <td>{props.user.gendre}</td>
    <td>{props.user.dob.substring(0,10)}</td>
    <td>{props.user.news}</td>
    <td>{props.user.email}</td>
    <td>{props.user.photo}</td>
    <td>
      <button type="button" className="btn btn-primary"><Link to={"/editUser/"+props.user._id}>edit</Link></button>
    </td>
    <td>
    <button type="button" className="btn btn-danger"><a href="#" onClick={() => { props.deleteUser(props.user._id) }}>delete</a></button>
    </td>
  </tr>
)

export default class MoviesList extends Component {
  constructor(props) {
    super(props);


    this.deleteUser = this.deleteUser.bind(this)

    this.state = {users : []}

  }


  deleteUser(id)
  {
        axios.delete("http://localhost:5000/users/"+id)
            .then(res => {
                this.setState({
                    users : this.state.users.filter(user => user._id !== id)
                })
            })
            .catch((err) => console.log(err))
  }

  componentDidMount(){
      axios.get("http://localhost:5000/users/")
        .then(res =>{
            this.setState({
                users : res.data
            })
        })
        .catch((err) =>{
            console.log(err)
        })
  }

  movieList(){
     
      return this.state.users.map(currentuser => {
          return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id} />;
      })
  }

  
  render() {
    return (
      <div>
        <h3>Users List</h3>

        
        <table className="table">
          <thead className="thead-light table-sortable" >
            <tr>
              <th>Username</th>
              <th>Gendre</th>
              <th>Date of birth</th>
              <th>News</th>
              <th>Email</th>
              <th>Image</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
              { this.movieList() }
          </tbody>
        </table>
      </div>
    )
  }
}