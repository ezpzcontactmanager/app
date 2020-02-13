import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Button, Nav, Navbar, Form, Fade} from 'react-bootstrap'
import { confirmAlert } from 'react-confirm-alert'; // Import

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
        id: '',
        logout: false
      };

      this.setState({userToken: this.props.token});

      this.getUser = this.getUser.bind(this);
      this.performLogout = this.performLogout.bind(this);
    }

    getUser = async event =>{

    }

    async componentDidMount(){
        
      console.log("Username in Nav is ", this.props.username);

      this.setState({username: this.props.username});

    }

    performLogout = () => {
          confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure you want to logout?',
            buttons: [
              {
                label: 'Yes',
                // this can be made async (onClick: async () => {})
                onClick: async() => {
                  this.setState({logout: true});
                  window.location.href = ("https://ezpzcontactmanager.herokuapp.com/")
                  
                }
              },
              {
                label: 'No',
                onClick: () => 
                {
                    this.setState({logout: false});
                    console.log("do nothing")
                }
              }
            ]
          })
  }

    render(){

      const ConditionalLink = ({ children, to, condition }) => (condition && to)
            ? <Link to={to}>{children}</Link> : <>{children}</>;

      return(
        <Fade in = {true}>
            <div id='navitgationBar'>
              <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="#home">EZ-PZ Contact Manager</Navbar.Brand>
                
                    <Nav className="mr-auto">
                    </Nav>
                
                <Form inline>
                
                  <Navbar.Text>
                    Signed in as: <a>{this.state.username}</a>
                  </Navbar.Text>
                  {/* <Link to = '/'> */}
                  <ConditionalLink
                    children={<Button style={{marginLeft: 20 + 'px'}} variant="outline-primary" onClick={this.performLogout}>Log Out</Button>}
                    to='/'
                    condition={this.state.logout}
                  ></ConditionalLink>
                    
                  {/* </Link> */}
                </Form>
              </Navbar>
              <br/>
            </div>
            </Fade>
      );
    }
}

export default NavigationBar