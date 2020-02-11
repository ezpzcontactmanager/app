import React, { Component } from 'react';
import LoginCredentials from "./components/LoginCredentials";
import SignUp from "./components/SignUp";
import './App.css';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import MainPage from './pages/MainPage';

class App extends Component{

  constructor(props){
    super(props);
    this.state={userToken: ''}
    
    this.tokenCollector = this.tokenCollector.bind(this);
  }

  tokenCollector(token){

     this.setState({ userToken: token });
  }

  render(){

    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path="/" render={props=><LoginCredentials callback={this.tokenCollector}></LoginCredentials>}/>  
            <Route exact path="/signup" component={SignUp}/>
            <Route exact path ="/mainpage" render={props=><MainPage token={this.state.userToken} {...props}></MainPage>}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;