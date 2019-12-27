import React, { Component } from 'react';
import axios from 'axios';


export default class CreateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangetitle = this.onChangetitle.bind(this)
    this.onChangeYear = this.onChangeYear.bind(this)
    this.onChangeDirector = this.onChangeDirector.bind(this)
    this.onChangeType = this.onChangeType.bind(this)
    this.onSubmit = this.onSubmit.bind(this)

    this.state = {
      title : '',
      year : 0,
      director : '',
      type : ''
    }
  }

  

  onChangetitle(e) {
    this.setState({
      title: e.target.value
    })
  }

  onChangeYear(e) {
    this.setState({
      year: e.target.value
    })
  }

  onChangeDirector(e) {
    this.setState({
      director: e.target.value
    })
  }

  onChangeType(e) {
    this.setState({
      type: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const movie = {
      title: this.state.title,
      year: this.state.year,
      director: this.state.director,
      type: this.state.type
    }

    console.log(movie);

    axios.post('http://localhost:5000/movieDetails/add', movie)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Movie</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Type : </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.type}
              onChange={this.onChangeType}>
              <option></option>
              <option>movie</option>
              <option>Serie</option>
              <option>Documentary</option>
          </select>
        </div>
        <div className="form-group"> 
          <label>Title : </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangetitle}
              />
        </div>
        <div className="form-group">
          <label>Year : </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.year}
              onChange={this.onChangeYear}
              />
        </div>
        <div className="form-group">
          <label>Director : </label>
          <div>
          <input 
              type="text" 
              className="form-control"
              value={this.state.director}
              onChange={this.onChangeDirector}
              />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Movie" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}