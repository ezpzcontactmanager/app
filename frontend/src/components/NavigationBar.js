import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button, Nav, Navbar, Form, Fade} from 'react-bootstrap'
import axios from 'axios';

var id = '';
var username = '';
var test = 'test';

class NavigationBar extends Component
{
    constructor(props){
      super(props);

      this.state ={
        userToken : '',
        usename: '',
        id: ''
      };

      this.setState({userToken: this.props.token});

      this.getUser = this.getUser.bind(this);
    }

    getUser = async event =>{

    }

    async componentDidMount(){
        
      console.log("Username in Nav is ", this.props.username);

      this.setState({username: this.props.username});

    }

    render(){

      return(
        <Fade in = {true}>
            <div id='navitgationBar'>
              <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#info">Info</Nav.Link>
                    </Nav>
                
                <Form inline>
                
                  <Navbar.Text>
                    Signed in as: <a>{this.state.username}</a>
                  </Navbar.Text>
                  <Link to = '/'>
                    <Button style={{marginLeft: 20 + 'px'}} variant="outline-primary">Log Out</Button>
                  </Link>
                </Form>
              </Navbar>
              <br/>
            </div>
            </Fade>
      );
    }
}

export default NavigationBar