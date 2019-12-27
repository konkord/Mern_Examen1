import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"

const User = props => (
  <tr itemScope="row">
    <td>{props.user.username}</td>
    <td>{props.user.gendre}</td>
    <td>{props.user.dob}</td>
    <td>{props.user.email}</td>
    <td><img src={props.user.photo}/></td>
    <td>
      <button type="button" className="btn btn-primary"><Link to={"/editUser/"+props.user._id}>Edit</Link></button>
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
    this.onChangeLimit = this.onChangeLimit.bind(this)
    this.onChangePage = this.onChangePage.bind(this)
    this.getData = this.getData.bind(this)
    this.Option = this.Option.bind(this)
    this.sortDate = this.sortDate.bind(this)
    this.sortGendre = this.sortGendre.bind(this)
    this.onChangeSearch = this.onChangeSearch.bind(this)

    this.state = {
      users : [],
      page : 1,
      limit : 10,
      totalPages : 0,
      search : '',
      gendre : 1,
      dob : 1,
    }

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

  onChangeLimit(e){
    this.setState({
      limit : e.target.value
    })

    this.getData(e.target.value)
  }

  componentDidMount(){
      this.getData();
  }

  getData(limit,page,search,gendre,dob){

    const p = page || this.state.page
    const l = limit || this.state.limit
    const s = search || this.state.search
    const g = gendre || this.state.gendre
    const d = dob || this.state.dob
    
    axios.get("http://localhost:5000/users/"+p+"/"+l+"?search="+s+"&gendre="+g+"&dob"+d)
        .then(res =>{
            this.setState({
                users : res.data.docs ,
                totalPages : res.data.totalPages
            })
        })
        .catch((err) =>{
            console.log(err)
        })
  }

  onChangePage(e){
    this.setState({
      page : e.target.value
    })

    this.getData(null,e.target.value)
  }
  sortGendre(e){
    this.setState({
      gendre : this.state.gendre*-1
    })

    this.getData(null,null,null,this.state.gendre*-1)
  }

  sortDate(e){
    this.setState({
      dob : this.state.dob*-1
    })

    this.getData(null,null,null,null,this.state.dob*-1)
  }
  movieList(){
     
      return this.state.users.map(currentuser => {
          return <User user={currentuser} deleteUser={this.deleteUser} key={currentuser._id} />;
      })
  }

  onChangeSearch(e){

    console.log('Search' + e.target.value)
    if(e.target.value == "")
    {
      this.getData(null,null,"")
    }else{
       this.getData(null,null,e.target.value)
    }
   
  }

  Option()
  {
    let arr = []
    for (let index = 1; index <= this.state.totalPages; index++) {
      arr.push(index)
    }
    console.log('Array :' + arr)
    return arr.map(e => {
    return <option key = {e} value={e} >{e}</option>;
  })
  }
  render() {
    return (
      <div>
        <h3>Users List</h3>

        <div className="container">
            <div className="form-group">
                <label>Entries: </label>
                  <div>
                     <select ref="userInput"
                        required
                        className="form-control"
                        value = {this.state.limit}
                        onChange = {this.onChangeLimit}
                     >
                       <option></option>
                       <option>10</option>
                       <option>20</option>
                       <option>30</option>
                     </select>
                  </div>
            </div>
            <div className="form-group">
                <label>Pages: </label>
                  <div>
                     <select ref="userInput"
                        required
                        className="form-control"
                        value = {this.state.page}
                        onChange = {this.onChangePage}
                     >
                      {this.Option()}
                     </select>
                  </div>
            </div>
            <div className="form-group">
                <label>search: </label>
                  <div>
                  <input  type="text"
                    required
                    className="form-control"
                    onChange={this.onChangeSearch}
                    />
                  </div>
            </div>
        </div>
        <table className="table">
          <thead className="thead-light table-sortable" >
            <tr>
              <th>Username</th>
              <th onClick={this.sortGendre}>Gendre</th>
              <th onClick={this.sortDate}>Date of birth</th>
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