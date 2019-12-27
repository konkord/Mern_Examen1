import React, { Component } from 'react';
import axios from 'axios';


export default class Mock extends Component{
    constructor(props){
        super(props)

        this.onUsersNumberChange = this.onUsersNumberChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            userNumber : 0
        }
    }

    componentDidMount(){
        console.log('state' + this.state.userNumber)
        axios.get("http://localhost:5000/users/")
            .then(res => {
                this.setState({
                    userNumber : res.data.length
                })

                
            })
            .catch((err) => {
                console.log(err)
            })
    }

    onUsersNumberChange(e)
    {
        this.setState({
            userNumber: e.target.value,
            btnDisables : false
          })
    }

    onSubmit(e)
    {
        e.preventDefault();
        const numbreUserToadd  = 100 - this.state.userNumber

        if(numbreUserToadd > 0){

            
           axios.get("https://randomuser.me/api/?results="+numbreUserToadd)
                .then(res => {

                    res.data.results.map( currentuser => {
                        const user={
                        username : currentuser.login.username,
                        gendre : currentuser.gender,
                        news : true,
                        dob : currentuser.dob.date,
                        email : currentuser.email,
                        photo : currentuser.picture.medium
                        }
                        console.log(user)
                        
                        axios.post("http://localhost:5000/users/add1", user)
                            .then(res => {
                                console.log(res.data)
                            })
                            .catch((err) => {
                                console.log(err)
                        })
                    })
    
            })

                
        }
        //window.location = '/';
    }

    render(){
        return(
            <div className="container">
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <label>Users Number: </label>
                    <div>
                    <input 
                        type="text" 
                        className="form-control"
                        onChange = {this.onUsersNumberChange}
                        value={this.state.userNumber}
                        disabled
                        />
                    </div>
                    </div>

                    <div className="form-group">
                    <input type="submit" value="Add users" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
} 