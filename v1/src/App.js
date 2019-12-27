import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import "react-icons"


import Navbar from "./Components/navbar.component"
import UsersList from "./Components/usersList.component"
import Mock from "./Components/mock.component"
import EditeUser from "./Components/editeuser.component"
/*import Createmovie from "./Components/createmovie.component"
import Editemovie from "./Components/editemovie.component"*/

import { BrowserRouter as Router, Route} from "react-router-dom";

function App() {
  return (
    <Router>
        <div className="container">
          <Navbar />
          <Route path="/" exact component = {UsersList}></Route>
          <Route path="/mock" component = {Mock}></Route>
          <Route path="/editUser/:id" component={EditeUser}/>
        </div>
    </Router>
    
  );
}

export default App;
