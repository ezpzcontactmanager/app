import React, { Component } from 'react';import ContactList from '../components/ContactList';
import NavigationBar from '../components/NavigationBar';
import Add from '../components/Add';
import SplitPane, { Pane } from 'react-split-pane';
import axios from 'axios';
import { Form, Container, FormGroup, Label, Alert, Input, Button, Fade, ButtonGroup, Jumbotron, Badge, UncontrolledAlert } from 'reactstrap';

var id = ''
var username = ''

class MainPage extends Component 
{
    constructor(props){
        super(props);

        this.state = {
            userToken: '',
            id: ''
        };

        this.setState({userToken: this.props.token});
    }

    async componentDidMount(){

        var token = this.props.token;

        await axios.get("http://localhost:5000/me", {headers: {Authorization: token}})
                    .then(res => this.setState({id: res.data._id, username: res.data.username}))
                    .catch(error => console.log(error));

        console.log("Token is ", token);
        console.log("ID is ", this.state.id);
    }

    render()
    {
        if (!this.state.id)
        {
            return null;
        }
        
        return(
            <div id='MainPageDiv'>
                <NavigationBar token={this.state.userToken}></NavigationBar>
                <SplitPane
                style={{marginBottom:20 + "px"}}
                split="vertical"
                minSize={50}
                defaultSize={parseInt(localStorage.getItem('splitPos'), 10)}
                onChange={size => localStorage.setItem('splitPos', size)}
                >
                <ContactList initialSize="85%" id={this.state.id}></ContactList>
                <Add token={this.state.userToken}></Add>
                </SplitPane> 
            </div>
        )
    }
}

export default MainPage;